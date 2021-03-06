(ns com.billpiel.guildsman.util
  (:require [clojure.walk :as walk]))

(def ^:dynamic *enclosing-form* nil)
(def ^:dynamic *macro-meta* nil)

(defn ->int
  [v]
  (try (cond (integer? v) v
             (string? v) (Integer/parseInt v)
             (float? v) (int v))
       (catch Exception e
         nil)))

(defn visit-post
  [f branch? children make-node root]
  (if (branch? root)
    (->> root
         children
         (map (partial visit-post f branch? children make-node))
         (make-node root)
         f)
    (f root)))

(defn visit-pre
  [f branch? children make-node root]
  (let [root' (f root)]
    (if (branch? root')
      (->> root'
           children
           (map (partial visit-pre f branch? children make-node))
           (make-node root')
           f)
      root')))

(defn ->vec
  [v]
  (cond (vector? v) v
        (sequential? v) (vec v)
        (map? v) [v]
        (coll? v) (vec v)
        :else [v]))

;; takes plan or Op
(defn mk-tf-id
  ([{:keys [scope id output-idx]}]
   (mk-tf-id scope id (or output-idx 0)))
  ([scope id output-idx]
   (let [scope' (or (some->> scope
                             not-empty
                             (map name)
                             (clojure.string/join "/")
                             (#(str % "/")))
                    "")
         id' (name id)
         output-idx' (if ((some-fn nil? zero?) output-idx)
                       ""
                       (str ":" output-idx))]
     (str scope' id' output-idx'))))

(defn parse-tf-id
  [tf-id]
  (let [[scoped-id idx-str] (clojure.string/split tf-id #":")
        by-slash (clojure.string/split scoped-id #"/")
        scope (vec (drop-last by-slash))
        id (last by-slash)]
    {:scoped-id scoped-id
     :scope (mapv keyword scope)
     :id (keyword id)
     :output-idx (or (->int idx-str) 0)}))

(defn- visit-plan**
  [cache-fn pre-fn merge-fn post-fn top-fn plan]
  (or (cache-fn plan)
      (let [pre (pre-fn plan)
            post (if (map? pre)
                   (cond-> pre
                     (-> pre :inputs not-empty)
                     (update :inputs top-fn)
                     (-> pre :ctrl-inputs not-empty)
                     (update :ctrl-inputs top-fn))
                   pre)]
        (-> plan
            (merge-fn post)
            post-fn))))

(defn- visit-plan*
  [f plan]
  (if (and (sequential? plan)
           (some map? (tree-seq sequential? identity plan)))
    (mapv f plan)
    (f plan)))

(defn visit-plan
  [cache-fn pre-fn merge-fn post-fn root]
  (let [cache-fn' (or cache-fn (constantly nil))
        pre-fn' (or pre-fn identity)
        merge-fn' (or merge-fn (fn [_ x] x))
        post-fn' (or post-fn identity)
        top-fn (partial visit-plan cache-fn' pre-fn' merge-fn' post-fn')
        f (partial visit-plan** cache-fn' pre-fn' merge-fn' post-fn' top-fn)]
    (if (sequential? root)
      (mapv (partial visit-plan* f)
            root)
      (visit-plan* f root))))

(defn pre-visit-plan
  [f root]
  (visit-plan nil f nil nil root))

(defn append-collections
  [v colls]
  (vary-meta v
             update
             ::collections
             #(into (or % [])
                    colls)))

(defn get-collections
  [v]
  (-> v meta ::collections))

(defn build-eagerly
  [v]
  (vary-meta v
             assoc
             ::build-eagerly?
             true))

(defn build-eagerly?
  [v]
  (-> v meta ::build-eagerly?))


(defn replace$
  [form]
  (let [$sym `$#
        form' (walk/prewalk-replace {'$ $sym}
                                    form)]
    (if (= form form')
      form
      `((fn [~$sym] ~form')))))

(defmacro $-
  [m & body]
  `(~m ~@(map replace$ body)))

(defn map-by-id
  [v]
  (->> v
       (filter :id)
       (map #(vector (:id %) %))
       (into {})
       (merge {:$ (last v)})))

(defn- wrap-bind-form
  [orig-form form]
  `(binding [*enclosing-form* ['~orig-form (str *ns*) ~(some-> orig-form meta :line)]]
     ~form))

(defn- id$->>**
  [prev-sym sym form]
  [sym (wrap-bind-form form (if prev-sym
                              (let [form' (walk/prewalk-replace {'$ prev-sym}
                                                                form)]
                                (if (= form form')
                                  (if (sequential? form)
                                    (concat form [prev-sym])
                                    (list form prev-sym))
                                  form'))
                              form))])

(defn- id$->>*
  [body]
  (let [sym-vec (-> body
                    count
                    (repeatedly gensym)
                    vec)
        let-vec (vec (mapcat id$->>**
                             (into [nil] sym-vec)
                             sym-vec
                             body))]
    `(let ~let-vec (map-by-id ~sym-vec))))

(defmacro id$->>
  [& body]
  (id$->>* body))

(defmacro for->map
  [bindings & body]
  `(into {}
         (for ~bindings
           ~@body)))

(defn fmap
  [f m]
  (into {}
        (for [[k v] m]
          [k (f v)])))

(defn regex?
  [v]
  (isa? (type v) java.util.regex.Pattern))


(defn StackTraceElement->map
  [^StackTraceElement o]
  {:class-name (.getClassName o)
   :file-name (.getFileName o)
   :method-name (.getMethodName o)
   :line-number (.getLineNumber o)})

(defn get-stack
  []
  (mapv StackTraceElement->map
        (.getStackTrace (Exception. "get-stack"))))

(defmacro with-op-meta
  [& body]
  `(let [r# (do ~@body)]
     (vary-meta r#
                merge
                {:stack (get-stack)
                 :plan r#
                 :form ut/*enclosing-form*})))

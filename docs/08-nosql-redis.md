[⬅ Volver al README principal](../README.md)

# 8. NoSQL y Redis

*Bases de datos no relacionales y el rol de Redis como cache, broker ligero y almacén de estructuras en memoria.*

## 8.1 SQL vs NoSQL

**Definición:** las bases de datos NoSQL no usan el modelo relacional de tablas fijas — priorizan flexibilidad de esquema y escalado horizontal sobre las garantías transaccionales fuertes de SQL.

| Tipo de NoSQL | Ejemplo | Modelo de datos |
|---|---|---|
| **Document** | MongoDB | Documentos JSON/BSON agrupados en *collections* |
| **Key-Value** | Redis, DynamoDB | Pares clave-valor, acceso O(1) |
| **Columnar** | Cassandra | Columnas en vez de filas, óptimo para escrituras masivas |
| **Graph** | Neo4j | Nodos y relaciones, óptimo para datos altamente conectados |

Ver [tabla comparativa completa](20-tablas-comparativas.md#20-tablas-comparativas) para cuándo elegir SQL sobre NoSQL.

**🔥🔥🔥🔥**

## 8.2 MongoDB — Documents y Collections

**Definición:** una *collection* agrupa *documents* (equivalente aproximado a tabla/fila en SQL), pero sin un esquema fijo obligatorio — cada documento puede tener campos distintos.

```javascript
// Documento en la collection "users"
{ _id: ObjectId("..."), name: "Ana", tags: ["admin", "beta"], address: { city: "Lima" } }
```

Los datos anidados (como `address`) evitan JOINs para relaciones simples, a cambio de duplicación si el mismo dato cambia en varios lugares.

**🔥🔥🔥**

## 8.3 Redis como Cache

**Definición:** Redis es una base de datos en memoria de estructuras clave-valor (strings, hashes, lists, sets, sorted sets), usada principalmente como cache frente a una base de datos relacional más lenta.

```javascript
const cached = await redis.get(`user:${id}`);
if (cached) return JSON.parse(cached);

const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
await redis.set(`user:${id}`, JSON.stringify(user), 'EX', 300); // TTL de 5 minutos
return user;
```

| Concepto | Qué es |
|---|---|
| **TTL** | Tiempo de vida de una clave antes de expirar automáticamente |
| **Cache Hit** | El dato pedido ya estaba en cache |
| **Cache Miss** | El dato no estaba en cache; hay que ir a la fuente original |
| **Cache Invalidation** | Eliminar/actualizar una entrada de cache cuando el dato de origen cambia — el problema más difícil de cachear correctamente |

**🔥🔥🔥🔥**

## 8.4 Redis Pub/Sub, Streams y Distributed Locks

- **Redis Pub/Sub:** canales de mensajería en memoria, sin persistencia — un mensaje publicado sin suscriptores activos se pierde.
- **Redis Streams:** estructura de log append-only con persistencia y *consumer groups*, similar en concepto a Kafka pero más liviano.
- **Distributed Lock:** usar `SET key value NX EX ttl` para que solo un proceso (de varios) ejecute una tarea crítica a la vez, con expiración automática para evitar locks "huérfanos" si el proceso muere.

**🔥🔥🔥**

---

---

[⬅ Volver al README principal](../README.md)

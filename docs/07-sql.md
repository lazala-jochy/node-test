[⬅ Volver al README principal](../README.md)

# 7. SQL y Bases de Datos Relacionales

*El lenguaje y las garantías que sostienen la persistencia transaccional de un sistema backend.*

## 7.1 SQL Fundamental

```sql
SELECT id, name FROM users WHERE active = true ORDER BY created_at DESC LIMIT 10 OFFSET 20;
INSERT INTO users (name, email) VALUES ('Ana', 'ana@mail.com');
UPDATE users SET active = false WHERE id = 5;
DELETE FROM users WHERE id = 5;
SELECT DISTINCT country FROM users;
SELECT user_id, COUNT(*) AS total FROM orders GROUP BY user_id HAVING COUNT(*) > 5;
```

**🔥🔥🔥🔥🔥**

## 7.2 Joins

```
INNER JOIN            LEFT JOIN              RIGHT JOIN             FULL OUTER JOIN
  A ∩ B                A + (A ∩ B)            B + (A ∩ B)            A ∪ B
 Solo coincidencias    Todo A + match de B    Todo B + match de A    Todo A y todo B
```

```sql
-- INNER JOIN: solo usuarios que SÍ tienen al menos una orden
SELECT u.name, o.id FROM users u INNER JOIN orders o ON o.user_id = u.id;
-- LEFT JOIN: todos los usuarios, con NULL en o.id si no tienen órdenes
SELECT u.name, o.id FROM users u LEFT JOIN orders o ON o.user_id = u.id;
```

```sql
-- ❌ filtrar sobre la tabla derecha en WHERE convierte el LEFT JOIN en un INNER JOIN
SELECT * FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE o.status = 'completed';
-- ✅ el filtro debe ir en el ON para conservar el comportamiento de LEFT JOIN
SELECT * FROM users u LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'completed';
```

**🔥🔥🔥🔥🔥**

## 7.3 Agregaciones: `WHERE` vs `HAVING`

| Función | Qué hace |
|---|---|
| `COUNT` | Cuenta filas |
| `SUM` | Suma valores |
| `AVG` | Promedio |
| `MIN` / `MAX` | Valor mínimo/máximo |

| Cláusula | Diferencia |
|---|---|
| `WHERE` | Filtra **filas individuales**, antes de agrupar — no usa funciones de agregación |
| `HAVING` | Filtra **grupos**, después de `GROUP BY` — sí usa `COUNT`, `SUM`, etc. |

```sql
SELECT user_id, COUNT(*) AS total FROM orders
WHERE status = 'completed'
GROUP BY user_id
HAVING COUNT(*) > 5;
```

**🔥🔥🔥🔥🔥**

## 7.4 Relaciones y Constraints

| Concepto | Qué es |
|---|---|
| **Primary key (PK)** | Identifica únicamente cada fila; no permite `NULL` |
| **Foreign key (FK)** | Referencia a la PK de otra tabla; mantiene integridad referencial |
| **UNIQUE** | No permite valores repetidos en esa columna |
| **NOT NULL** | La columna no puede quedar vacía |
| **CHECK** | Restringe los valores permitidos (ej. `CHECK (price > 0)`) |
| **One-to-one** | Un registro de A con exactamente un registro de B |
| **One-to-many** | Un registro de A con varios de B |
| **Many-to-many** | Requiere tabla intermedia (ej. `enrollments`) |

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,                          -- primary key
  email VARCHAR(255) UNIQUE NOT NULL,              -- unique + not null
  age INT CHECK (age >= 18)                        -- check
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),       -- foreign key: un user tiene muchas orders (one-to-many)
  total NUMERIC CHECK (total > 0)
);

-- many-to-many: students <-> courses, vía tabla intermedia
CREATE TABLE enrollments (
  student_id INT REFERENCES students(id),
  course_id INT REFERENCES courses(id),
  PRIMARY KEY (student_id, course_id)
);
```

**🔥🔥🔥🔥**

## 7.5 Índices

**Definición:** estructura de datos (típicamente B-tree) que acelera búsquedas, a costa de más espacio en disco y escrituras más lentas.

**Cuándo usar:** columnas frecuentes en `WHERE`, `JOIN`, `ORDER BY`, en tablas grandes.
**Cuándo perjudica:** tablas con muchas escrituras y pocas lecturas, o columnas de baja selectividad.
**Índices compuestos:** un índice sobre `(user_id, status)` acelera queries que filtran por ambas columnas, en ese orden.

```sql
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 42;
```

**🔥🔥🔥**

## 7.6 Transacciones y ACID

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT; -- o ROLLBACK si algo falla
```

| Propiedad ACID | Qué garantiza |
|---|---|
| **Atomicity** | La transacción ocurre completa o no ocurre |
| **Consistency** | La BD pasa de un estado válido a otro válido |
| **Isolation** | Transacciones concurrentes no interfieren entre sí |
| **Durability** | Una vez confirmada, persiste aunque el sistema falle justo después |

**🔥🔥🔥🔥🔥**

## 7.7 Concurrencia: Locking e Isolation Levels

| Concepto | Diferencia | Cuándo usar |
|---|---|---|
| **Optimistic locking** | No bloquea; usa columna `version`, falla y reintenta si cambió | Baja probabilidad de conflicto |
| **Pessimistic locking** | Bloquea la fila (`SELECT ... FOR UPDATE`) | Alta probabilidad de conflicto (balances financieros) |

```sql
-- Pessimistic: bloquea la fila hasta el COMMIT, otra transacción debe esperar
BEGIN;
SELECT * FROM accounts WHERE id = 1 FOR UPDATE;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
COMMIT;

-- Optimistic: no bloquea; falla si "version" cambió desde que se leyó, y el cliente reintenta
UPDATE accounts SET balance = balance - 100, version = version + 1
WHERE id = 1 AND version = 7;  -- 0 filas afectadas ⇒ alguien más la modificó primero, reintentar
```

**Isolation levels** (menor a mayor aislamiento): `Read Uncommitted` → `Read Committed` → `Repeatable Read` → `Serializable`.

**Deadlock:** dos transacciones se bloquean mutuamente esperando un lock que la otra tiene — el motor detecta y aborta una.

**🔥🔥🔥🔥**

## 7.8 Normalización

- **1NF:** valores atómicos, sin grupos repetidos.
- **2NF:** 1NF + sin dependencias parciales de la PK.
- **3NF:** 2NF + sin dependencias transitivas.
- **Denormalización:** duplicar datos deliberadamente para evitar `JOIN`s costosos en lecturas frecuentes.

```sql
-- ❌ sin normalizar: el nombre del producto se repite en cada fila, riesgo de inconsistencia
-- order_items(order_id, product_name, product_price, quantity)

-- ✅ normalizado (3NF): el dato del producto vive en un solo lugar
-- products(id, name, price)
-- order_items(order_id, product_id, quantity)

-- ✅ denormalización deliberada: guardar el total ya calculado en la orden
-- para no recalcularlo con un JOIN+SUM en cada lectura del listado de órdenes
-- orders(id, user_id, total)  ← total se actualiza al crear/editar order_items
```

**🔥🔥🔥**

## 7.9 N+1 Query Problem y Connection Pooling

**N+1:** ejecutar 1 query para obtener N registros, y luego 1 query adicional **por cada uno** para datos relacionados, en vez de un solo `JOIN`.

```javascript
// ❌ N+1
const users = await db.query('SELECT * FROM users');
for (const u of users) u.orders = await db.query('SELECT * FROM orders WHERE user_id = $1', [u.id]);

// ✅ un solo JOIN
const rows = await db.query('SELECT u.*, o.* FROM users u LEFT JOIN orders o ON o.user_id = u.id');
```

**Connection pooling:** reutilizar un conjunto de conexiones a la DB en vez de abrir/cerrar una por request.

**🔥🔥🔥🔥**

## 7.10 Database Migrations

**Definición:** cambios versionados y reproducibles al esquema de la base de datos, aplicados en orden (ej. con `knex`, `Prisma Migrate`, `TypeORM`), que permiten avanzar o revertir el esquema de forma controlada entre entornos.

```javascript
// 20240115_add_phone_to_users.js — cada migración define cómo avanzar (up) y cómo revertir (down)
exports.up = (knex) => knex.schema.alterTable('users', (t) => t.string('phone').nullable());
exports.down = (knex) => knex.schema.alterTable('users', (t) => t.dropColumn('phone'));
```

Sin migraciones, aplicar el mismo cambio de esquema en desarrollo, staging y producción depende de que alguien lo recuerde ejecutar manualmente en cada entorno — una fuente común de bugs por esquemas desincronizados.

## 7.11 Consultas de Referencia

<details>
<summary><b>Ver 9 queries clásicas de entrevista (duplicados, N-ésimo valor, anti-join, top N, paginación...)</b></summary>

```sql
-- Registros duplicados
SELECT email, COUNT(*) AS total FROM users GROUP BY email HAVING COUNT(*) > 1;

-- Segundo salario más alto
SELECT MAX(salary) AS second_highest FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);

-- Usuarios sin órdenes (anti-join)
SELECT u.* FROM users u LEFT JOIN orders o ON o.user_id = u.id WHERE o.id IS NULL;

-- Cantidad de órdenes por usuario
SELECT user_id, COUNT(*) AS total_orders FROM orders GROUP BY user_id;

-- Join de varias tablas
SELECT u.name, p.name AS product, oi.quantity
FROM orders o
JOIN users u ON u.id = o.user_id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p ON p.id = oi.product_id;

-- Registro más reciente por grupo
SELECT DISTINCT ON (user_id) * FROM orders ORDER BY user_id, created_at DESC;

-- Top N por grupo
SELECT product_id, SUM(quantity) AS total_sold FROM order_items GROUP BY product_id ORDER BY total_sold DESC LIMIT 3;

-- Paginación offset vs cursor
SELECT * FROM users ORDER BY id LIMIT 20 OFFSET 40;
SELECT * FROM users WHERE id > :lastSeenId ORDER BY id LIMIT 20;

-- Valores NULL (nunca usar = NULL)
SELECT * FROM users WHERE phone IS NULL;
```

</details>

**🔥🔥🔥🔥🔥**

---

---

[⬅ Volver al README principal](../README.md)

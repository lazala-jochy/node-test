[⬅ Volver al README principal](../README.md)

# 3. Node.js

*El runtime, su modelo de concurrencia y las herramientas operativas que lo rodean.*

## 3.1 Qué es Node.js — V8, libuv, Event-Driven, Non-Blocking I/O

**Definición:** Node.js es un runtime de JavaScript construido sobre el motor **V8** de Google, que permite ejecutar JS fuera del navegador. **libuv** es la librería en C++ que le da a Node su **Event Loop**, I/O no bloqueante, y un **thread pool** interno (4 hilos por defecto).

> 💡 **Si Node es single-threaded, ¿cómo maneja miles de conexiones simultáneas?** Node ejecuta tu código JavaScript en un solo hilo (el Event Loop), pero las operaciones de I/O (red, disco, DNS, parte de `crypto`/`zlib`) se delegan al sistema operativo o al thread pool de libuv, que trabaja en paralelo. Cuando una operación termina, su callback se encola de vuelta al Event Loop. Por eso Node puede manejar miles de conexiones concurrentes con un solo hilo de JS: casi todo el tiempo ese hilo está **esperando I/O**, no computando.

```javascript
// ✅ I/O-bound — no bloquea el Event Loop, otras requests se siguen atendiendo
app.get('/user/:id', async (req, res) => {
  const user = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
  res.json(user);
});

// ❌ CPU-bound síncrono — bloquea el Event Loop, TODAS las requests se congelan
app.get('/report', (req, res) => { res.json(generateHugeReportSync(data)); });
```

**🔥🔥🔥🔥🔥**

## 3.2 Single Thread, Thread Pool, Worker Threads, Cluster

| Concepto | Qué es |
|---|---|
| **CPU-bound** | Tarea limitada por cómputo (cálculos pesados) — bloquea el hilo si es síncrona |
| **I/O-bound** | Tarea limitada por esperar una respuesta externa — no bloquea, se delega |
| **Thread Pool** | Hilos internos de libuv (default 4) usados para FS, DNS, parte de `crypto` |
| **`cluster`** | Bifurca múltiples **procesos** Node (memoria separada) para usar varios núcleos |
| **`worker_threads`** | Crea hilos dentro del **mismo proceso**, pueden compartir memoria — ideal para CPU-bound |

Confundir "single-threaded" con "no puede manejar concurrencia" es el error conceptual más común: Node maneja concurrencia de I/O excelentemente, pero no paraleliza cómputo por sí solo.

```javascript
// worker_threads — delega un cálculo CPU-bound a OTRO hilo, sin bloquear el Event Loop principal
const { Worker } = require('worker_threads');
const worker = new Worker('./fibonacci-pesado.js', { workerData: { n: 40 } });
worker.on('message', (result) => console.log('Resultado:', result));
// el servidor HTTP sigue atendiendo otras requests mientras el worker calcula

// cluster — bifurca el proceso en N copias (una por núcleo de CPU) para repartir carga de requests
const cluster = require('cluster');
const os = require('os');
if (cluster.isPrimary) {
  os.cpus().forEach(() => cluster.fork()); // cada fork es un proceso Node independiente
} else {
  require('./server'); // cada proceso hijo levanta su propia instancia del servidor
}
```

**🔥🔥🔥🔥🔥**

## 3.3 Streams y Buffers

**Definición:** un `Buffer` almacena datos binarios crudos. Los *streams* procesan datos **por partes (chunks)** en vez de cargarlos completos en memoria.

| Tipo de stream | Qué hace |
|---|---|
| `Readable` | Fuente de datos (ej. leer un archivo) |
| `Writable` | Destino de datos (ej. escribir a un archivo o response HTTP) |
| `Duplex` | Ambos (ej. un socket TCP) |
| `Transform` | Duplex que modifica los datos al pasar (ej. compresión) |

**Backpressure:** cuando el destino (`Writable`) no procesa tan rápido como el `Readable` produce, el stream pausa automáticamente la lectura — evita saturar la memoria.

```javascript
// ✅ uso de memoria constante, sin importar el tamaño del archivo
fs.createReadStream('archivo-grande.csv').pipe(res);

// ❌ carga el archivo COMPLETO en memoria antes de enviarlo
res.send(fs.readFileSync('archivo-grande.csv'));
```

**🔥🔥🔥🔥**

## 3.4 File System, `process`, Variables de Entorno

```javascript
process.env.NODE_ENV;        // variables de entorno
process.argv;                 // argumentos de línea de comandos
process.pid;                  // PID del proceso
process.on('SIGTERM', () => { /* graceful shutdown */ });
```

**Environment variables:** configuración externa al código (credenciales, URLs, flags) — nunca hardcodear secretos en el código fuente.

**🔥🔥🔥🔥**

## 3.5 `package.json`, npm/pnpm, Semantic Versioning

`dependencies` = necesarias en producción. `devDependencies` = solo desarrollo (testing, linters, build tools).

**Semantic Versioning (`MAJOR.MINOR.PATCH`):**
- `^1.2.3` → acepta actualizaciones de `MINOR`/`PATCH` (hasta `<2.0.0`).
- `~1.2.3` → acepta solo actualizaciones de `PATCH` (hasta `<1.3.0`).

| | `npm install` | `npm ci` |
|---|---|---|
| Lee | `package.json` (puede actualizar lockfile) | Solo `package-lock.json` |
| `node_modules` previo | Lo actualiza incrementalmente | Lo borra primero, instala limpio |
| Uso recomendado | Desarrollo local | Pipelines de CI/CD |

```bash
npm install     # puede actualizar package-lock.json si una versión ya no encaja con el rango permitido
npm ci          # falla si package.json y package-lock.json no están sincronizados; nunca modifica el lockfile
```

**pnpm:** alternativa a npm que usa un store global con symlinks — instalaciones más rápidas y `node_modules` más liviano, evitando duplicar paquetes entre proyectos.

**🔥🔥🔥**

## 3.6 Manejo de Errores: Uncaught Exceptions y Unhandled Rejections

```javascript
process.on('uncaughtException', (err) => {
  console.error('Excepción no capturada:', err);
  process.exit(1); // el proceso queda en estado indefinido — debe reiniciarse
});

process.on('unhandledRejection', (reason) => {
  console.error('Promise rechazada sin catch:', reason);
});
```

La práctica recomendada ante un `uncaughtException` es loguear y salir (`process.exit(1)`), dejando que un orquestador (PM2, Kubernetes) reinicie el proceso — no intentar "seguir como si nada", porque el estado interno puede estar corrupto.

**🔥🔥🔥🔥**

## 3.7 Graceful Shutdown: `SIGTERM` y `SIGINT`

**Definición:** antes de terminar el proceso, cerrar conexiones activas (DB, HTTP) de forma ordenada, sin cortar requests en curso.

```javascript
process.on('SIGTERM', async () => {
  server.close(() => { db.disconnect(); process.exit(0); });
});
```

| Señal | Origen típico |
|---|---|
| `SIGTERM` | Orquestador pidiendo apagado ordenado (ej. Kubernetes antes de matar un pod) |
| `SIGINT` | `Ctrl+C` en terminal |

Kubernetes envía `SIGTERM` y espera un período de gracia antes de forzar `SIGKILL` — sin manejarlo, las requests en vuelo se cortan abruptamente en vez de completarse.

**🔥🔥🔥🔥**

## 3.8 Módulos Built-in de Node

Node incluye módulos nativos listos para usar sin instalar nada: `fs` (archivos), `http`/`https` (servidores/clientes HTTP), `path` (rutas multiplataforma), `os` (info del sistema), `crypto` (hashing/cifrado), `events` (`EventEmitter`), `stream`, `child_process` (lanzar procesos externos), `util`.

```javascript
const { EventEmitter } = require('events');
const bus = new EventEmitter();

bus.on('order:created', (order) => console.log('Notificar al almacén:', order.id));
bus.emit('order:created', { id: 42 }); // dispara el listener de forma síncrona

bus.emit('error', new Error('algo falló')); // ❌ sin listener para 'error', Node lanza la excepción y puede tumbar el proceso
```

`'error'` es un evento especial en `EventEmitter`: si se emite sin ningún listener registrado, Node lo trata como una excepción no capturada.

**🔥🔥🔥**

---

---

[⬅ Volver al README principal](../README.md)

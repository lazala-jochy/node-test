[⬅ Volver al README principal](../README.md)

# 15. Performance

*Dónde suelen aparecer los cuellos de botella en un backend Node.js, y cómo se mitigan.*

## 15.1 Latencia, Throughput y Bottlenecks

| Concepto | Qué mide |
|---|---|
| **Latency** | Tiempo que tarda una sola request en completarse |
| **Throughput** | Cantidad de requests procesadas por unidad de tiempo |
| **Response Time** | Tiempo total percibido por el cliente (incluye red) |
| **Bottleneck** | El componente más lento que limita el rendimiento general del sistema |

**Ejemplo:** un endpoint responde en 200ms por request (latencia) y el servidor soporta 50 requests/segundo en paralelo (throughput). Si una query a la base de datos sin índice tarda 150ms de esos 200ms, esa query es el *bottleneck* — optimizarla primero da más beneficio que optimizar cualquier otra parte del endpoint.

## 15.2 Causas Comunes de Degradación

```javascript
// ❌ bloquea el Event Loop durante la lectura — TODAS las requests concurrentes quedan congeladas
app.get('/report', (req, res) => res.json(fs.readFileSync('big.json')));
```

- **Memory leaks:** caches sin límite, timers no limpiados, listeners acumulados.
- **Blocking operations:** cálculos síncronos pesados en el hilo principal — usar `worker_threads` o dividir el trabajo.
- **N+1 queries:** ver [sección 7.9](07-sql.md#79-n1-query-problem-y-connection-pooling).
- **Falta de paginación:** nunca devolver datasets completos sin límite.

## 15.3 Mitigaciones

| Técnica | Qué resuelve |
|---|---|
| **Caching (Redis)** | Evita recalcular/reconsultar resultados costosos |
| **Database Indexing** | Acelera lecturas frecuentes a costa de escrituras más lentas |
| **Connection Pooling** | Evita el costo de abrir/cerrar conexiones por request |
| **Asynchronous Processing / Queues** | Mueve trabajo pesado fuera del request-response síncrono |
| **Compresión (gzip/brotli)** | Reduce el tamaño de las respuestas HTTP |

## 15.4 Testing de Performance

| Tipo | Qué evalúa |
|---|---|
| **Load Testing** | Comportamiento bajo la carga esperada en producción |
| **Stress Testing** | Punto de quiebre del sistema, más allá de la carga esperada |
| **CPU Profiling** | Identifica qué funciones consumen más tiempo de CPU |

**🔥🔥🔥🔥**

---

---

[⬅ Volver al README principal](../README.md)

[⬅ Volver al README principal](../README.md)

# 19. 🔥 Microservicios — Fundamentos clave

*Los temas de microservicios más preguntados en una entrevista backend, con enlace directo a su desarrollo completo.*

| Tema | Idea central | Sección |
|---|---|---|
| **Qué es un microservicio** | Servicio pequeño, independiente en deploy, escalado y base de datos | [10.1](10-microservicios.md#101-monolito-vs-microservicios) |
| **Monolito vs Microservicios** | Simplicidad y velocidad inicial vs independencia operativa a mayor complejidad | [10.1](10-microservicios.md#101-monolito-vs-microservicios) |
| **Cuándo usar / no usar microservicios** | Usarlos cuando el dominio y el equipo ya son grandes y estables; evitarlos en etapas tempranas | [10.1](10-microservicios.md#101-monolito-vs-microservicios) |
| **Cómo dividir un sistema** | Por bounded context de negocio, no por capa técnica | [10.2](10-microservicios.md#102-service-decomposition-y-bounded-context) |
| **Bounded Context** | Límite donde un modelo de dominio es válido y consistente | [9.3](09-arquitectura-backend.md#93-domain-driven-design-ddd-y-bounded-context) |
| **Comunicación síncrona vs asíncrona** | Respuesta inmediata (REST/gRPC) vs desacoplada (colas/eventos) | [10.4](10-microservicios.md#104-comunicación-entre-servicios) |
| **REST vs gRPC** | JSON/HTTP legible vs binario/HTTP2 de alto rendimiento | [10.4](10-microservicios.md#104-comunicación-entre-servicios) |
| **Qué es un Message Broker** | Intermediario que desacopla productores y consumidores de mensajes | [11.1](11-message-brokers.md#111-conceptos-fundamentales) |
| **Kafka vs RabbitMQ** | Log distribuido con múltiples consumer groups vs colas punto a punto | [11.5](11-message-brokers.md#115-rabbitmq-vs-kafka) |
| **Event-Driven Architecture** | Los servicios reaccionan a eventos en vez de ser invocados directamente | [10.4](10-microservicios.md#104-comunicación-entre-servicios) |
| **Eventual Consistency** | Los datos replicados convergen con el tiempo, no de inmediato | [10.5](10-microservicios.md#105-consistencia-y-saga-pattern) |
| **Transacciones distribuidas** | No existe un `COMMIT` global entre bases de datos separadas | [10.5](10-microservicios.md#105-consistencia-y-saga-pattern) |
| **Saga Pattern** | Transacciones locales encadenadas + compensaciones ante fallo | [10.5](10-microservicios.md#105-consistencia-y-saga-pattern) |
| **Choreography vs Orchestration** | Eventos descentralizados vs un coordinador central explícito | [10.5](10-microservicios.md#105-consistencia-y-saga-pattern) |
| **Circuit Breaker** | Deja de llamar a un servicio caído para evitar cascading failures | [10.6](10-microservicios.md#106-resiliencia) |
| **Retry con Exponential Backoff** | Reintentos con espera creciente, para no saturar un servicio degradado | [10.6](10-microservicios.md#106-resiliencia) |
| **Dead Letter Queue** | Aísla mensajes que fallan repetidamente sin bloquear la cola principal | [11.6](11-message-brokers.md#116-dead-letter-queue) |
| **Idempotencia** | Reprocesar el mismo mensaje no debe cambiar el resultado final | [10.8](10-microservicios.md#108-idempotencia-en-microservicios) |
| **Manejo de fallos entre servicios** | Timeout + retry + circuit breaker + bulkhead, combinados | [10.6](10-microservicios.md#106-resiliencia) |
| **Distributed Tracing** | Un correlation ID viaja con la request a través de todos los servicios | [14.3](14-observabilidad.md#143-distributed-tracing-y-correlation-id) |
| **API Gateway** | Punto de entrada único: ruteo, auth, rate limiting, agregación | [10.7](10-microservicios.md#107-service-discovery-api-gateway-y-configuración) |
| **Service Discovery** | Los servicios se encuentran dinámicamente en un entorno orquestado | [10.7](10-microservicios.md#107-service-discovery-api-gateway-y-configuración) |
| **Cómo escalar microservicios** | Horizontal por servicio, según su propia carga — ver [sección 4.8](04-backend-fundamentals.md#48-escalabilidad-disponibilidad-y-tolerancia-a-fallos) y [16](16-sistemas-distribuidos.md#16-sistemas-distribuidos) |

---

---

[⬅ Volver al README principal](../README.md)

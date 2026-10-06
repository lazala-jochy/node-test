[⬅ Volver al README principal](../README.md)

# 12. Docker y Deployment

*Empaquetado, orquestación y despliegue de servicios backend en contenedores.*

## 12.1 Docker — Conceptos Base

| Concepto | Qué es |
|---|---|
| **Dockerfile** | Receta de instrucciones para construir una imagen |
| **Docker Image** | Artefacto inmutable con el código + dependencias + runtime |
| **Docker Container** | Instancia en ejecución de una imagen |
| **Docker Compose** | Define y orquesta múltiples contenedores (app + DB + cache) en un solo archivo YAML |
| **Volumes** | Persisten datos fuera del ciclo de vida del contenedor |
| **Networks** | Permiten que contenedores se comuniquen entre sí por nombre de servicio |
| **Container Registry** | Repositorio de imágenes (Docker Hub, ECR, GCR) |

```dockerfile
# Multi-stage build: la imagen final no incluye devDependencies ni herramientas de build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
HEALTHCHECK --interval=30s CMD node healthcheck.js
CMD ["node", "dist/index.js"]
```

**Multi-stage builds** reducen el tamaño final de la imagen separando la etapa de compilación de la etapa de ejecución. **Health Checks** permiten que el orquestador detecte contenedores que arrancaron pero no están realmente operativos.

**🔥🔥🔥🔥**

## 12.2 Kubernetes

| Concepto | Qué es |
|---|---|
| **Pod** | Unidad mínima de despliegue; uno o más contenedores que comparten red/almacenamiento |
| **Deployment** | Declara cuántas réplicas de un Pod deben existir y gestiona actualizaciones |
| **Service** | Expone un conjunto de Pods bajo una IP/nombre estable, balanceando tráfico entre ellos |
| **ConfigMap** | Configuración no sensible, inyectada como variables de entorno o archivos |
| **Secret** | Igual que ConfigMap pero para datos sensibles (credenciales, tokens) |
| **Liveness Probe** | ¿El contenedor sigue vivo? Si falla, Kubernetes lo reinicia |
| **Readiness Probe** | ¿El contenedor está listo para recibir tráfico? Si falla, se le deja de enviar tráfico sin reiniciarlo |

## 12.3 CI/CD y Estrategias de Deployment

| Estrategia | Cómo funciona |
|---|---|
| **Rolling Deployment** | Reemplaza instancias viejas por nuevas gradualmente, sin downtime |
| **Blue-Green Deployment** | Despliega la versión nueva en paralelo ("green"), y cambia el tráfico de golpe cuando está validada |

**CI/CD:** automatiza build, tests y despliegue en cada cambio de código, reduciendo el riesgo de errores manuales y acelerando la entrega.

**🔥🔥🔥**

---

---

[⬅ Volver al README principal](../README.md)

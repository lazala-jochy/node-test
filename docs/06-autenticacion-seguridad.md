[⬅ Volver al README principal](../README.md)

# 6. Autenticación y Seguridad

*Identidad, permisos y las vulnerabilidades más comunes que se evalúan en una entrevista backend.*

## 6.1 Authentication vs Authorization

| Concepto | Diferencia |
|---|---|
| **Authentication (AuthN)** | ¿Quién eres? Verificar identidad (login) |
| **Authorization (AuthZ)** | ¿Qué puedes hacer? Verificar permisos/roles |

## 6.2 JWT (JSON Web Token)

**Definición:** estructura `header.payload.signature` codificada en Base64URL. **El payload NO está encriptado, solo firmado** — cualquiera puede decodificarlo y leerlo, por eso nunca debe contener datos sensibles.

- **Access token:** vida corta, se envía en cada request (`Authorization: Bearer <token>`).
- **Refresh token:** vida larga, se usa solo para obtener un nuevo access token sin pedir credenciales de nuevo.
- **Token rotation:** cada vez que se usa un refresh token, se emite uno nuevo y se invalida el anterior — limita el daño si uno es robado.

**🔥🔥🔥🔥🔥**

## 6.3 OAuth 2.0

**Definición:** protocolo de autorización delegada — permite que una app acceda a recursos de un usuario en otro servicio (ej. "Iniciar sesión con Google") sin manejar sus credenciales directamente, usando tokens de acceso emitidos por el proveedor.

## 6.4 Password Hashing — bcrypt / Argon2

**Definición:** nunca se almacenan contraseñas en texto plano. `bcrypt`/`Argon2` aplican un **salt** único por contraseña y son intencionalmente lentos, dificultando ataques de fuerza bruta — a diferencia de hashes rápidos (MD5/SHA-256).

```javascript
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash(password, 10); // 10 = salt rounds
const isValid = await bcrypt.compare(password, hash);
```

**Argon2** ganó la Password Hashing Competition (2015) y resiste mejor ataques con GPU que bcrypt, a costa de mayor complejidad de configuración (memoria/paralelismo).

## 6.5 RBAC — Roles y Permisos

**Role-Based Access Control:** los permisos se asignan a **roles** (`admin`, `editor`, `viewer`), y los usuarios heredan permisos según su rol en vez de asignarse individualmente.

```javascript
function requireRole(role) {
  return (req, res, next) => req.user.role === role ? next() : res.sendStatus(403);
}
app.delete('/users/:id', requireRole('admin'), deleteUser);
```

## 6.6 CORS, CSRF, XSS, SQL Injection, NoSQL Injection, SSRF

| Ataque/Mecanismo | Qué es | Mitigación |
|---|---|---|
| **CORS** | Mecanismo del navegador que restringe requests cross-origin | Configurar `Access-Control-Allow-Origin` correctamente, no `*` con credenciales |
| **CSRF** | Un sitio malicioso induce al navegador a enviar requests autenticadas (cookies) sin consentimiento | Tokens CSRF, cookies `SameSite=Strict/Lax` |
| **XSS** | Inyección de scripts maliciosos ejecutados en el navegador de otro usuario | Sanitizar/escapar input y output, `Content-Security-Policy` |
| **SQL Injection** | Inyectar SQL malicioso vía input no sanitizado | Queries parametrizadas / prepared statements, ORMs |
| **NoSQL Injection** | Inyectar operadores de query (ej. `{"$gt": ""}`) vía input no validado en MongoDB | Validar tipos estrictamente, no pasar `req.body` crudo a la query |
| **SSRF** | El servidor es inducido a hacer una request a una URL interna/maliciosa controlada por el atacante | Validar/whitelistear hosts destino |

**🔥🔥🔥🔥🔥**

## 6.7 Input Validation, Secrets Management, Security Headers

- **Input validation/sanitization:** siempre en el servidor, nunca confiar solo en el cliente.
- **Secrets management:** nunca hardcodear API keys/contraseñas; `process.env` + secrets manager (AWS Secrets Manager, Vault); nunca commitear `.env`.
- **Security headers:** `Strict-Transport-Security`, `X-Content-Type-Options`, `Content-Security-Policy` (ej. vía `helmet` en Express).
- **Rate limiting / brute force protection:** limitar intentos de login por IP/usuario (bloqueo temporal tras N intentos fallidos).

**🔥🔥🔥🔥🔥 (toda la sección 6)**

---

---

[⬅ Volver al README principal](../README.md)

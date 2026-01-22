# Testing Autenticación - Consultora TEN

## Servidor corriendo en: http://localhost:3000

### ✅ Endpoints disponibles:

#### 1. Registrar usuario
```bash
POST /auth/register
```

**Ejemplo:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "nombre": "Juan",
    "apellido": "Pérez",
    "rol": "usuario"
  }'
```

**Respuesta exitosa:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": "uuid",
    "email": "test@example.com",
    "nombre": "Juan",
    "apellido": "Pérez",
    "rol": "usuario"
  }
}
```

#### 2. Login
```bash
POST /auth/login
```

**Ejemplo:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@consultora.com",
    "password": "admin123"
  }'
```

**Respuesta exitosa:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": "uuid",
    "email": "admin@consultora.com",
    "nombre": "Admin",
    "apellido": "Sistema",
    "rol": "admin"
  }
}
```

#### 3. Ver perfil (requiere autenticación)
```bash
GET /auth/profile
```

**Ejemplo:**
```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer <TU_TOKEN_AQUI>"
```

**Respuesta exitosa:**
```json
{
  "id": "uuid",
  "email": "admin@consultora.com",
  "nombre": "Admin",
  "apellido": "Sistema",
  "rol": "admin",
  "activo": true,
  "createdAt": "2026-01-22T..."
}
```

---

## 🧪 Usuarios de Prueba Creados

### Usuario Admin
```json
{
  "email": "admin@consultora.com",
  "password": "admin123",
  "rol": "admin"
}
```

---

## 📊 Roles Disponibles

- `admin` - Administrador del sistema
- `consultor` - Consultor de la empresa
- `asistente` - Asistente administrativo
- `usuario` - Usuario básico

---

## 🔐 Usando el Token

Una vez que hagas login o registro, recibirás un `token`. Usa este token en el header `Authorization` de tus requests:

```bash
Authorization: Bearer <tu_token>
```

**Ejemplo completo:**
```bash
# 1. Login
TOKEN=$(curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@consultora.com","password":"admin123"}' \
  | jq -r '.token')

# 2. Usar el token para ver perfil
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer $TOKEN"
```

---

## ❌ Errores Comunes

### Email ya registrado
```json
{
  "message": "El email ya está registrado",
  "error": "Conflict",
  "statusCode": 409
}
```

### Credenciales inválidas
```json
{
  "message": "Credenciales inválidas",
  "error": "Unauthorized",
  "statusCode": 401
}
```

### Token inválido o expirado
```json
{
  "message": "Token inválido",
  "error": "Unauthorized",
  "statusCode": 401
}
```

### Validación de datos
```json
{
  "message": [
    "Email inválido",
    "La contraseña debe tener al menos 6 caracteres"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

---

## 🎯 Próximos Pasos

- ✅ Módulo Auth funcionando
- ⏭️ Crear módulo Personas
- ⏭️ Crear módulo Domicilios
- ⏭️ Implementar guards de roles
- ⏭️ Agregar refresh tokens

---

## 🗂️ Base de Datos

La tabla `usuarios` fue creada con la migración:
- UUID como primary key
- Email único
- Password hasheado con bcrypt
- Rol con ENUM
- Timestamps automáticos

Para ver los usuarios en la base de datos, puedes ejecutar:
```sql
SELECT id, email, nombre, apellido, rol, activo, created_at 
FROM usuarios;
```

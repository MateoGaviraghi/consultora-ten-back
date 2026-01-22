# Plan de Acción - Desarrollo Consultora TEN

## 🎯 Objetivo
Implementar el sistema de gestión para consultora de discapacidad siguiendo un enfoque incremental y funcional.

---

## 📋 Fase 0: Setup Completado ✅

- [x] Proyecto NestJS inicializado
- [x] Base de datos Neon PostgreSQL configurada
- [x] TypeORM configurado con SSL
- [x] GitHub Actions para branching de DB
- [x] Render deployment configurado
- [x] Documentación del sistema generada

---

## 🚀 Fase 1: Autenticación y Base (Semana 1)

### Día 1-2: Módulo de Autenticación

#### 1.1 Instalar dependencias
```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install -D @types/passport-jwt @types/bcrypt
```

#### 1.2 Crear estructura del módulo Auth
```
src/modules/auth/
├── entities/
│   └── usuario.entity.ts
├── dto/
│   ├── login.dto.ts
│   ├── register.dto.ts
│   └── auth-response.dto.ts
├── guards/
│   └── jwt-auth.guard.ts
├── strategies/
│   └── jwt.strategy.ts
├── auth.controller.ts
├── auth.service.ts
└── auth.module.ts
```

#### 1.3 Archivos a crear (en orden)

**a) Usuario Entity** (`usuario.entity.ts`)
- Campos: id, email, password (hash), nombre, apellido, rol, activo, timestamps
- Relaciones: ninguna por ahora

**b) DTOs**
- `LoginDto`: email, password
- `RegisterDto`: email, password, nombre, apellido, rol
- `AuthResponseDto`: token, usuario

**c) Auth Service**
- `register()`: Crear usuario con password hasheado
- `login()`: Validar credenciales y generar JWT
- `validateUser()`: Verificar usuario por ID para JWT

**d) JWT Strategy**
- Configurar passport-jwt
- Extraer usuario del token

**e) JWT Guard**
- Guard para proteger rutas

**f) Auth Controller**
- `POST /auth/register`: Registrar nuevo usuario
- `POST /auth/login`: Login y obtener token
- `GET /auth/profile`: Obtener perfil (protegido)

#### 1.4 Generar migración
```bash
npm run migration:generate src/migrations/CreateUsuario
```

#### 1.5 Testing
- Registrar usuario de prueba
- Login y verificar token
- Acceder a ruta protegida

---

### Día 3-4: Módulo Personas (Entidad Central)

#### 2.1 Crear módulo Personas
```bash
nest g module modules/personas
nest g controller modules/personas
nest g service modules/personas
```

#### 2.2 Estructura
```
src/modules/personas/
├── entities/
│   ├── persona.entity.ts
│   └── domicilio.entity.ts
├── dto/
│   ├── create-persona.dto.ts
│   ├── update-persona.dto.ts
│   └── create-domicilio.dto.ts
├── personas.controller.ts
├── personas.service.ts
└── personas.module.ts
```

#### 2.3 Entidad Persona (según DATABASE_SCHEMA.md)
**Campos principales:**
- id (UUID)
- dni (único)
- nombre, segundo_nombre, apellido, segundo_apellido
- fecha_nacimiento
- sexo (ENUM)
- estado_civil (ENUM)
- email, telefono, celular
- tipo_documento (ENUM)
- nacionalidad
- tiene_discapacidad (boolean)
- activo (boolean)
- timestamps (created_at, updated_at)

**Relaciones:**
- Un Persona → Muchos Domicilios
- Un Persona → Muchos Certificados (para después)

#### 2.4 Entidad Domicilio
**Campos:**
- id (UUID)
- persona_id (FK)
- tipo_domicilio (ENUM: real, legal)
- calle, numero, piso, depto
- codigo_postal
- localidad, provincia, pais
- es_principal (boolean)
- timestamps

#### 2.5 DTOs
- CreatePersonaDto con validaciones
- UpdatePersonaDto (Partial)
- CreateDomicilioDto

#### 2.6 Service
Implementar CRUD completo:
- `create()`: Crear persona con domicilio
- `findAll()`: Listar con paginación
- `findOne()`: Por ID con relaciones
- `update()`: Actualizar datos
- `remove()`: Soft delete (activo = false)
- `findByDni()`: Buscar por DNI

#### 2.7 Controller
Endpoints REST:
- `POST /personas`: Crear persona
- `GET /personas`: Listar (paginado)
- `GET /personas/:id`: Obtener una
- `PATCH /personas/:id`: Actualizar
- `DELETE /personas/:id`: Desactivar
- `GET /personas/dni/:dni`: Buscar por DNI

#### 2.8 Generar migración
```bash
npm run migration:generate src/migrations/CreatePersonaAndDomicilio
npm run migration:run
```

---

### Día 5: Common Utilities

#### 3.1 Crear carpeta common
```
src/common/
├── decorators/
│   └── current-user.decorator.ts
├── filters/
│   └── http-exception.filter.ts
├── interceptors/
│   └── transform.interceptor.ts
├── pipes/
│   └── validation.pipe.ts
└── enums/
    ├── tipo-documento.enum.ts
    ├── sexo.enum.ts
    ├── estado-civil.enum.ts
    └── tipo-domicilio.enum.ts
```

#### 3.2 ENUMs según DB Schema
```typescript
// tipo-documento.enum.ts
export enum TipoDocumento {
  DNI = 'DNI',
  PASAPORTE = 'PASAPORTE',
  LC = 'LC',
  LE = 'LE'
}

// sexo.enum.ts
export enum Sexo {
  MASCULINO = 'M',
  FEMENINO = 'F',
  OTRO = 'X'
}

// etc...
```

#### 3.3 Decorator para usuario actual
```typescript
// @CurrentUser() decorator para extraer user del request
```

#### 3.4 Exception Filter global
```typescript
// Formatear errores de forma consistente
```

---

## 🔄 Fase 2: Módulos de Gestión (Semana 2-3)

### Día 6-8: Módulo Certificados

#### 4.1 Estructura
```
src/modules/certificados/
├── entities/
│   ├── certificado.entity.ts
│   ├── junta-evaluadora.entity.ts
│   └── discapacidad.entity.ts
├── dto/
│   ├── create-certificado.dto.ts
│   ├── update-certificado.dto.ts
│   └── certificado-response.dto.ts
├── certificados.controller.ts
├── certificados.service.ts
└── certificados.module.ts
```

#### 4.2 Entidad Certificado (según DATABASE_SCHEMA.md)
**Campos principales:**
- id (UUID)
- persona_id (FK → Persona)
- numero_certificado (único)
- fecha_emision, fecha_vencimiento
- porcentaje_discapacidad
- tipo_discapacidad (ENUM)
- estado (ENUM: vigente, vencido, suspendido)
- observaciones
- junta_evaluadora_id (FK)
- timestamps

**Relaciones:**
- Muchos Certificados → Una Persona
- Un Certificado → Una JuntaEvaluadora
- Un Certificado → Muchas Discapacidades (many-to-many)

#### 4.3 Funcionalidades
- CRUD de certificados
- Validación de vigencia
- Cálculo automático de vencimiento
- Asociación con discapacidades
- Historial de certificados por persona

---

### Día 9-10: Módulo Trámites

#### 5.1 Estructura
```
src/modules/tramites/
├── entities/
│   ├── tramite.entity.ts
│   ├── estado-tramite.entity.ts
│   └── documento-tramite.entity.ts
├── dto/
│   ├── create-tramite.dto.ts
│   ├── update-estado.dto.ts
│   └── tramite-response.dto.ts
├── tramites.controller.ts
├── tramites.service.ts
└── tramites.module.ts
```

#### 5.2 Entidad Tramite
**Campos:**
- id (UUID)
- persona_id (FK)
- usuario_asignado_id (FK → Usuario)
- tipo_tramite (ENUM)
- estado_actual (ENUM)
- fecha_inicio, fecha_finalizacion
- prioridad (ENUM: baja, media, alta, urgente)
- observaciones
- timestamps

**Relaciones:**
- Un Tramite → Una Persona
- Un Tramite → Un Usuario (asignado)
- Un Tramite → Muchos EstadosTramite (historial)
- Un Tramite → Muchos Documentos

#### 5.3 Funcionalidades
- Crear trámite para persona
- Asignar usuario responsable
- Cambiar estado con historial
- Adjuntar documentos
- Listar trámites por estado
- Dashboard de trámites pendientes

---

## 📊 Fase 3: Funcionalidades Avanzadas (Semana 4)

### 6. Sistema de Búsqueda y Filtros
- Búsqueda por múltiples criterios
- Filtros avanzados en personas
- Reportes básicos

### 7. Sistema de Notificaciones
- Vencimiento de certificados
- Cambios de estado de trámites
- Tareas pendientes

### 8. Auditoría
- Logs de cambios importantes
- Historial de modificaciones
- Trazabilidad de operaciones

---

## ✅ Checklist Inicial (Esta Semana)

### Setup
- [ ] Instalar dependencias de autenticación
- [ ] Configurar JWT en .env

### Módulo Auth
- [ ] Crear entidad Usuario
- [ ] Implementar DTOs de auth
- [ ] Crear Auth Service con bcrypt
- [ ] Configurar JWT Strategy
- [ ] Crear JWT Guard
- [ ] Implementar Auth Controller
- [ ] Generar migración de Usuario
- [ ] Ejecutar migración
- [ ] Probar registro y login

### Módulo Personas
- [ ] Crear ENUMs en common/
- [ ] Crear entidad Persona
- [ ] Crear entidad Domicilio
- [ ] Implementar DTOs
- [ ] Crear Personas Service
- [ ] Crear Personas Controller
- [ ] Generar migración
- [ ] Ejecutar migración
- [ ] Probar CRUD completo

### Testing
- [ ] Crear usuario admin
- [ ] Crear 3 personas de prueba
- [ ] Probar búsqueda por DNI
- [ ] Verificar relaciones con domicilios

---

## 🛠️ Comandos Útiles

### Generar recursos
```bash
# Generar módulo completo
nest g resource modules/nombre-modulo --no-spec

# Solo módulo
nest g module modules/nombre

# Solo service
nest g service modules/nombre

# Solo controller
nest g controller modules/nombre
```

### Migraciones
```bash
# Generar migración
npm run migration:generate src/migrations/NombreMigracion

# Ejecutar migraciones pendientes
npm run migration:run

# Revertir última migración
npm run migration:revert
```

### Testing local
```bash
# Desarrollo con hot-reload
npm run start:dev

# Build de producción
npm run build

# Ver logs de TypeORM
# Agregar en data-source.ts: logging: true
```

---

## 📦 Dependencias a Instalar

### Autenticación
```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install -D @types/passport-jwt @types/bcrypt
```

### Validación
```bash
npm install class-validator class-transformer
```

### Utilidades
```bash
npm install @nestjs/swagger swagger-ui-express  # API docs
npm install @nestjs/throttler  # Rate limiting
```

---

## 🎯 Próximos Pasos Inmediatos

1. **Ahora mismo:**
   - Instalar dependencias de autenticación
   - Crear estructura de carpetas para módulo auth

2. **Esta semana:**
   - Completar módulo de autenticación funcional
   - Implementar módulo Personas con CRUD

3. **Próxima semana:**
   - Módulo Certificados
   - Módulo Trámites

---

## 📚 Referencias Rápidas

- **Documentación del sistema:** [docs/DOCUMENTACION_SISTEMA.md](./DOCUMENTACION_SISTEMA.md)
- **Schema de DB:** [docs/DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)
- **Plan de implementación:** [docs/PLAN_IMPLEMENTACION.md](./PLAN_IMPLEMENTACION.md)
- **Setup de GitHub/Neon:** [docs/GITHUB_NEON_SETUP.md](./GITHUB_NEON_SETUP.md)

---

## 🔥 Comandos para Empezar YA

```bash
# 1. Instalar dependencias
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt class-validator class-transformer
npm install -D @types/passport-jwt @types/bcrypt

# 2. Crear módulo auth
nest g module modules/auth
nest g service modules/auth
nest g controller modules/auth

# 3. Crear carpetas necesarias
mkdir -p src/modules/auth/{entities,dto,guards,strategies}
mkdir -p src/common/{decorators,filters,interceptors,pipes,enums}

# 4. Iniciar desarrollo
npm run start:dev
```

---

**Estado Actual:** ✅ Infraestructura lista → ⏭️ Comenzar desarrollo de funcionalidades

**Próximo paso:** Implementar módulo de autenticación

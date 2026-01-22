# 🏥 Sistema de Gestión de Discapacidad - Backend

> Sistema integral para la gestión de certificados de discapacidad y coordinación de prestaciones médicas

[![NestJS](https://img.shields.io/badge/NestJS-10.0-red.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 📋 Índice

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Documentación](#documentación)
- [Testing](#testing)
- [Estructura del Proyecto](#estructura-del-proyecto)

---

## 📖 Descripción

Sistema backend desarrollado en **NestJS** para la gestión integral de:

- 👥 **Personas con discapacidad** y sus terceros vinculados
- 📄 **Certificados de discapacidad** con control de vigencia
- 🏥 **Financiadoras** (obras sociales, hospitales)
- 💊 **Prestaciones** y nomenclador oficial
- 📊 **Análisis financiero** y métricas de rendimiento
- 🔍 **Problemas** y soluciones para financiadoras

---

## ✨ Características

### Módulos Principales

- ✅ **Autenticación y Autorización** (JWT)
- ✅ **Gestión de Personas** (CRUD completo)
- ✅ **Certificados de Discapacidad** (emisión, renovación, alertas)
- ✅ **Financiadoras** (obras sociales, análisis de costos)
- ✅ **Nomenclador** (catálogo de prestaciones)
- ✅ **Orientación Prestacional** (recomendaciones automáticas)
- ✅ **Dashboard de Métricas** (análisis financiero)
- ✅ **Gestión de Problemas** y soluciones

### Funcionalidades Destacadas

- 🔔 Sistema de alertas de vencimiento de certificados
- 📊 Cálculo automático de costos/ingresos por financiadora
- 🎯 Recomendaciones de prestaciones según perfil de salud
- 📈 Dashboard de métricas en tiempo real
- 🔐 Sistema de roles y permisos
- 📝 Auditoría completa de operaciones
- 🚀 API REST documentada con Swagger

---

## 🛠️ Tecnologías

### Backend
- **Framework:** NestJS 10.x
- **Lenguaje:** TypeScript 5.x
- **Base de Datos:** PostgreSQL 15
- **ORM:** TypeORM 0.3.x

### Autenticación y Seguridad
- **Autenticación:** JWT + Passport
- **Validación:** class-validator
- **Encriptación:** bcrypt

### Documentación y Testing
- **Documentación API:** Swagger/OpenAPI
- **Testing:** Jest
- **E2E Testing:** Supertest

---

## 🚀 Instalación

### Requisitos Previos

- Node.js >= 18.x
- npm >= 9.x
- PostgreSQL >= 15

### Pasos

```bash
# Clonar el repositorio
git clone <repository-url>
cd consultora-ten-back

# Instalar dependencias
npm install
```

---

## ⚙️ Configuración

### 1. Configurar Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
# Base de Datos
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=tu_password
DATABASE_NAME=sistema_discapacidad

# JWT
JWT_SECRET=tu_secreto_super_seguro_y_largo
JWT_EXPIRATION=1d
JWT_REFRESH_SECRET=otro_secreto_para_refresh
JWT_REFRESH_EXPIRATION=7d

# Aplicación
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:4200
```

### 2. Crear Base de Datos

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE sistema_discapacidad;
```

### 3. Ejecutar Migraciones

```bash
npm run typeorm migration:run
```

---

## 🏃 Ejecución

### Modo Desarrollo

```bash
# Con hot-reload
npm run start:dev
```

La aplicación estará disponible en `http://localhost:3000`

### Modo Producción

```bash
# Build
npm run build

# Ejecutar
npm run start:prod
```

### Documentación API (Swagger)

Una vez iniciada la aplicación, acceder a:

```
http://localhost:3000/api/docs
```

---

## 📚 Documentación

La documentación completa del proyecto se encuentra en la carpeta `/docs`:

- **[Documentación del Sistema](docs/DOCUMENTACION_SISTEMA.md)** - Arquitectura y módulos
- **[Schema de Base de Datos](docs/DATABASE_SCHEMA.md)** - Modelo de datos completo
- **[Plan de Implementación](docs/PLAN_IMPLEMENTACION.md)** - Cronograma detallado

---

## 🧪 Testing

### Tests Unitarios

```bash
npm run test
```

### Tests E2E

```bash
npm run test:e2e
```

### Cobertura de Tests

```bash
npm run test:cov
```

---

## 📁 Estructura del Proyecto

```
consultora-ten-back/
├── src/
│   ├── core/                    # Módulos core
│   │   ├── auth/               # Autenticación JWT
│   │   ├── database/           # Configuración DB
│   │   └── config/             # Configuraciones
│   ├── modules/                # Módulos de negocio
│   │   ├── personas/           # Gestión de personas
│   │   ├── certificados/       # Certificados
│   │   ├── financiadoras/      # Financiadoras
│   │   ├── prestaciones/       # Prestaciones
│   │   ├── orientaciones/      # Orientación prestacional
│   │   ├── analisis/           # Análisis y métricas
│   │   └── terceros/           # Terceros vinculados
│   ├── shared/                 # Código compartido
│   │   ├── dto/               # DTOs comunes
│   │   ├── entities/          # Entidades base
│   │   ├── enums/             # Enumeraciones
│   │   ├── interfaces/        # Interfaces
│   │   └── guards/            # Guards personalizados
│   └── main.ts                # Punto de entrada
├── docs/                       # Documentación
├── test/                       # Tests E2E
├── scripts/                    # Scripts auxiliares
└── Documentacion-sistema-discapacidad/  # Planificación original
```

---

## 🔐 Endpoints Principales

### Autenticación
```
POST   /auth/login
POST   /auth/register
POST   /auth/refresh
GET    /auth/profile
```

### Personas
```
GET    /personas
GET    /personas/:id
POST   /personas
PUT    /personas/:id
DELETE /personas/:id
GET    /personas/dni/:dni
```

### Certificados
```
GET    /certificados
POST   /certificados
GET    /certificados/persona/:personaId
PATCH  /certificados/:id/renovar
GET    /certificados/vencimientos-proximos
```

### Financiadoras
```
GET    /financiadoras
POST   /financiadoras
GET    /financiadoras/:id/afiliados
GET    /financiadoras/:id/presupuesto
```

### Análisis
```
GET    /analisis/dashboard/:financiadoraId
GET    /analisis/metricas/:financiadoraId
POST   /analisis/presupuesto
```

---

## 🗄️ Base de Datos

### Entidades Principales

- **personas** - Beneficiarios del sistema
- **terceros_vinculados** - Familiares, tutores
- **certificados_discapacidad** - Certificaciones
- **financiadoras** - Obras sociales, hospitales
- **nomenclador** - Catálogo de prestaciones
- **servicios** - Prestaciones específicas
- **orientaciones_prestacionales** - Recomendaciones
- **presupuestos** - Análisis financiero
- **metricas_admin** - KPIs de financiadoras
- **problemas_identificados** - Incidencias
- **soluciones_para_financiadora** - Propuestas

---

## 👥 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

---

## 📝 Convenciones de Commits

Usar [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `refactor:` Refactorización de código
- `test:` Agregar/modificar tests
- `chore:` Tareas de mantenimiento

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 📞 Contacto

**Proyecto:** Sistema de Gestión de Discapacidad  
**Desarrollado con:** ❤️ y ☕ usando NestJS

---

## 🙏 Recursos

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Swagger Documentation](https://swagger.io/docs/)

---

**Última actualización:** Enero 2026

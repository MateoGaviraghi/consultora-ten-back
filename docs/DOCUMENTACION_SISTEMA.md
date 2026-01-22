# 📋 Sistema de Gestión de Discapacidad - Documentación Técnica

**Versión:** 1.0  
**Fecha:** 22 de Enero de 2026  
**Autor:** Equipo de Desarrollo

---

## 📖 Índice

1. [Descripción General](#descripción-general)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Módulos Principales](#módulos-principales)
4. [Modelos de Datos](#modelos-de-datos)
5. [Relaciones entre Entidades](#relaciones-entre-entidades)
6. [Flujos de Trabajo](#flujos-de-trabajo)
7. [Plan de Implementación](#plan-de-implementación)

---

## 🎯 Descripción General

### Objetivo del Sistema

Sistema integral para la gestión de certificados de discapacidad y coordinación de prestaciones médicas entre personas con discapacidad, financiadoras (obras sociales, hospitales) y proveedores de servicios.

### Alcance Funcional

- **Gestión de Personas:** Registro completo de beneficiarios y terceros vinculados (familiares, tutores)
- **Certificación:** Administración de certificados de discapacidad con seguimiento temporal
- **Prestaciones:** Orientación y gestión de servicios según perfil de salud
- **Financiamiento:** Control de obras sociales y análisis de costos/ingresos
- **Métricas:** Dashboard de rendimiento y optimización de soluciones

### Usuarios del Sistema

1. **Administradores:** Gestión completa del sistema
2. **Financiadoras:** Consulta de afiliados y prestaciones
3. **Personal Médico:** Emisión de certificados y orientaciones
4. **Beneficiarios:** Consulta de estado y prestaciones

---

## 🏗️ Arquitectura del Sistema

### Stack Tecnológico

```
Backend:    NestJS + TypeScript
Database:   PostgreSQL
ORM:        TypeORM
Auth:       JWT + Passport
Validation: class-validator
Docs:       Swagger/OpenAPI
```

### Estructura de Módulos (NestJS)

```
src/
├── core/                    # Módulos core del sistema
│   ├── auth/               # Autenticación y autorización
│   ├── database/           # Configuración de base de datos
│   └── config/             # Configuraciones globales
├── modules/
│   ├── personas/           # Gestión de beneficiarios
│   ├── certificados/       # Certificados de discapacidad
│   ├── financiadoras/      # Obras sociales y hospitales
│   ├── prestaciones/       # Servicios y nomenclador
│   ├── orientaciones/      # Orientación prestacional
│   ├── analisis/           # Métricas y presupuestos
│   └── terceros/           # Personas vinculadas
├── shared/
│   ├── dto/               # Data Transfer Objects
│   ├── entities/          # Entidades TypeORM
│   ├── enums/             # Enumeraciones
│   └── interfaces/        # Interfaces compartidas
└── main.ts
```

---

## 🧩 Módulos Principales

### 1. Módulo de Personas

**Responsabilidad:** Gestionar información de beneficiarios del sistema

**Entidades:**
- `Persona` - Datos personales y estado
- `TercerosVinculado` - Familiares, tutores, acompañantes
- `PersonaTercerosVinculado` - Relación N:M

**Funcionalidades:**
- CRUD completo de personas
- Gestión de vínculos familiares
- Validación de DNI único
- Cálculo automático de edad
- Estados: Activo, Inactivo, Fallecido

### 2. Módulo de Certificados

**Responsabilidad:** Administrar certificados de discapacidad

**Entidades:**
- `CertificadoDiscapacidad` - Certificación oficial
- `FuncionesSalud` - Catálogo de códigos de funciones (CIF)

**Funcionalidades:**
- Emisión de certificados
- Control de vigencia (alertas de vencimiento)
- Historial de certificaciones por persona
- Tipificación de discapacidad
- Diagnósticos asociados

### 3. Módulo de Prestaciones

**Responsabilidad:** Gestionar servicios y nomenclador oficial

**Entidades:**
- `Nomenclador` - Catálogo de prestaciones con costos
- `Servicios` - Prestaciones específicas
- `OrientacionPrestacional` - Recomendaciones personalizadas

**Funcionalidades:**
- Consulta de nomenclador vigente
- Asignación de servicios según perfil
- Recomendaciones por edad y tipo de discapacidad
- Priorización de prestaciones

### 4. Módulo de Financiadoras

**Responsabilidad:** Gestionar obras sociales y entidades financiadoras

**Entidades:**
- `Financiadora` - Obras sociales, hospitales, clínicas
- `Presupuestos` - Análisis financiero por período
- `MetricasAdmin` - KPIs de rendimiento
- `ProblemasIdentificados` - Incidencias y soluciones
- `SolucionesParaFinanciadora` - Propuestas de mejora
- `CategoriaSoluciones` - Clasificación de soluciones
- `FormatosAdmin` - Documentación requerida

**Funcionalidades:**
- Gestión de múltiples financiadoras
- Análisis de rentabilidad (costos vs ingresos)
- Identificación de problemas recurrentes
- Propuesta y seguimiento de soluciones
- Generación de reportes de métricas

---

## 📊 Modelos de Datos

### Entidad: Persona

```typescript
interface Persona {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;                    // Único
  fechaNacimiento: Date;
  edad: number;                   // Calculado
  telefono?: string;
  email?: string;
  direccion?: string;
  estadoCivil: EstadoCivil;       // ENUM
  estado: EstadoPersona;          // ENUM: Activo, Inactivo, Fallecido
  acompaniante: boolean;
  pension: boolean;
  
  // Relaciones
  certificados: CertificadoDiscapacidad[];
  financiadoras: Financiadora[];
  tercerosVinculados: TercerosVinculado[];
  
  createdAt: Date;
  updatedAt: Date;
}
```

### Entidad: CertificadoDiscapacidad

```typescript
interface CertificadoDiscapacidad {
  id: number;
  numeroCertificado: string;
  fechaEmision: Date;
  fechaVencimiento: Date;
  tipoDiscapacidad: string;
  estado: EstadoCertificado;      // ENUM: Vigente, Vencido, Renovado
  
  // Relaciones
  persona: Persona;
  diagnostico: Diagnostico;
  orientacionPrestacional: OrientacionPrestacional;
  comentarios: string;
  
  createdAt: Date;
  updatedAt: Date;
}
```

### Entidad: Financiadora

```typescript
interface Financiadora {
  id: number;
  nombre: string;
  tipo: TipoFinanciadora;         // ENUM: Obra Social, Hospital, Clínica
  cuit: string;
  direccion: string;
  telefono: string;
  email: string;
  contactoResponsable: string;
  estado: EstadoFinanciadora;     // ENUM: Activo, Suspendido, Inactivo
  
  // Relaciones
  personas: Persona[];
  presupuestos: Presupuesto[];
  metricas: MetricasAdmin[];
  problemas: ProblemasIdentificados[];
  soluciones: SolucionesParaFinanciadora[];
  formatosRequeridos: FormatosAdmin[];
  
  createdAt: Date;
  updatedAt: Date;
}
```

### Entidad: Nomenclador

```typescript
interface Nomenclador {
  id: number;
  categoria: string;
  codigoPrestacion: string;
  descripcionPrestacion: string;
  costoUnitario: number;          // Decimal
  unidadMedida: string;           // hora, sesión, mes, etc.
  fechaVigencia: Date;
  
  createdAt: Date;
  updatedAt: Date;
}
```

### Entidad: Presupuesto

```typescript
interface Presupuesto {
  id: number;
  periodo: string;                // MM/YYYY
  totalCertificados: number;
  costoTotal: number;             // Decimal
  ingresoTotal: number;           // Decimal
  gananciaPerdida: number;        // Calculado
  margenPorcentaje: number;       // Calculado
  
  // Relación
  financiadora: Financiadora;
  
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🔗 Relaciones entre Entidades

### Diagrama de Relaciones

```
PERSONA (1) ──────── (N) CERTIFICADO_DISCAPACIDAD
   │                           │
   │ (N:M)                     │ (1:N)
   │                           │
FINANCIADORA              ORIENTACION_PRESTACIONAL
   │                           │
   │ (1:N)                     │ (N:M)
   │                           │
PRESUPUESTOS              SERVICIOS
METRICAS_ADMIN
PROBLEMAS
SOLUCIONES

PERSONA (N) ──── (M) TERCEROS_VINCULADO
         (tabla intermedia: PERSONA_TERCEROS_VINCULADO)
```

### Relaciones Detalladas

| Origen | Destino | Tipo | Tabla Intermedia | Descripción |
|--------|---------|------|------------------|-------------|
| Persona | CertificadoDiscapacidad | 1:N | - | Una persona puede tener múltiples certificados |
| Persona | Financiadora | N:M | PersonaFinanciadora | Una persona puede tener varias obras sociales |
| Persona | TercerosVinculado | N:M | PersonaTercerosVinculado | Relación con familiares/tutores |
| CertificadoDiscapacidad | OrientacionPrestacional | 1:N | - | Un certificado genera orientaciones |
| OrientacionPrestacional | Servicios | N:M | OrientacionServicios | Servicios recomendados |
| Financiadora | Presupuesto | 1:N | - | Historial de análisis financiero |
| Financiadora | SolucionesParaFinanciadora | 1:N | - | Soluciones propuestas |
| SolucionesParaFinanciadora | CategoriaSoluciones | N:1 | - | Clasificación de soluciones |

---

## 🔄 Flujos de Trabajo

### Flujo 1: Registro de Nuevo Beneficiario

```
1. Registrar Persona
   ↓
2. Validar DNI único
   ↓
3. Asociar Financiadora(s)
   ↓
4. Registrar Terceros Vinculados (opcional)
   ↓
5. Estado: Activo
```

### Flujo 2: Emisión de Certificado

```
1. Seleccionar Persona
   ↓
2. Ingresar datos de certificación
   - Número de certificado
   - Tipo de discapacidad
   - Diagnóstico
   - Vigencia
   ↓
3. Sistema genera orientación prestacional
   - Analiza edad
   - Consulta funciones de salud
   - Propone servicios
   ↓
4. Asignar prioridades a prestaciones
   ↓
5. Estado: Vigente
```

### Flujo 3: Análisis Financiero

```
1. Seleccionar Financiadora
   ↓
2. Definir período (mes/año)
   ↓
3. Sistema calcula:
   - Total de certificados emitidos
   - Costo total (nomenclador)
   - Ingreso total
   - Ganancia/Pérdida
   - Margen %
   ↓
4. Generar reporte
   ↓
5. Identificar problemas
   ↓
6. Proponer soluciones
```

### Flujo 4: Gestión de Problemas y Soluciones

```
1. Identificar problema en Financiadora
   ↓
2. Categorizar y documentar
   - Descripción
   - Impacto financiero
   - Frecuencia
   ↓
3. Proponer solución
   - Categoría de solución
   - Costo estimado
   - Tiempo de implementación
   - Efectividad esperada
   ↓
4. Seguimiento y medición
   ↓
5. Actualizar métricas
```

---

## 📋 Plan de Implementación

### Fase 1: Configuración Base (Semana 1)
- [x] Inicializar proyecto NestJS
- [x] Configurar Git y .gitignore
- [ ] Configurar TypeORM + PostgreSQL
- [ ] Implementar módulo de autenticación
- [ ] Configurar Swagger

### Fase 2: Módulos Core (Semanas 2-3)
- [ ] Implementar módulo Personas
  - Entidades: Persona, TercerosVinculado
  - DTOs de validación
  - CRUD completo
  - Servicios y controladores
- [ ] Implementar módulo Financiadoras
  - Entidad Financiadora
  - Gestión de tipos
  - Endpoints REST

### Fase 3: Certificación y Prestaciones (Semanas 4-5)
- [ ] Implementar módulo Certificados
  - Entidad CertificadoDiscapacidad
  - Validación de vigencia
  - Alertas de vencimiento
- [ ] Implementar módulo Prestaciones
  - Nomenclador
  - Servicios
  - OrientacionPrestacional
  - Lógica de recomendaciones

### Fase 4: Análisis y Métricas (Semana 6)
- [ ] Implementar análisis financiero
  - Presupuestos
  - Cálculos automáticos
- [ ] Implementar gestión de problemas
  - ProblemasIdentificados
  - SolucionesParaFinanciadora
  - CategoriaSoluciones
- [ ] Dashboard de métricas

### Fase 5: Testing y Documentación (Semana 7)
- [ ] Tests unitarios
- [ ] Tests de integración
- [ ] Documentación API (Swagger)
- [ ] Manual de usuario

### Fase 6: Deploy (Semana 8)
- [ ] Configurar entorno de producción
- [ ] Migraciones de base de datos
- [ ] Deploy inicial
- [ ] Monitoreo y logs

---

## 📝 Convenciones de Código

### Nomenclatura

- **Clases/Interfaces:** PascalCase (`Persona`, `CertificadoDiscapacidad`)
- **Variables/Funciones:** camelCase (`obtenerPersona`, `certificadoActivo`)
- **Constantes:** UPPER_SNAKE_CASE (`MAX_CERTIFICADOS_POR_PERSONA`)
- **Archivos:** kebab-case (`persona.entity.ts`, `certificado.service.ts`)

### Estructura de Archivos por Módulo

```
personas/
├── dto/
│   ├── create-persona.dto.ts
│   ├── update-persona.dto.ts
│   └── persona-response.dto.ts
├── entities/
│   ├── persona.entity.ts
│   └── persona-terceros.entity.ts
├── personas.controller.ts
├── personas.service.ts
├── personas.module.ts
└── personas.repository.ts
```

### Validaciones

Usar decoradores de `class-validator`:

```typescript
export class CreatePersonaDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  nombre: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  apellido: string;

  @IsString()
  @Matches(/^\d{7,8}$/, { message: 'DNI debe tener 7 u 8 dígitos' })
  dni: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsEnum(EstadoCivil)
  @IsOptional()
  estadoCivil?: EstadoCivil;
}
```

---

## 🔐 Consideraciones de Seguridad

1. **Datos Sensibles:** Todos los datos personales son sensibles (Ley de Protección de Datos)
2. **Autenticación:** JWT con refresh tokens
3. **Autorización:** RBAC (Role-Based Access Control)
4. **Encriptación:** Datos sensibles encriptados en base de datos
5. **Auditoría:** Log de todas las operaciones críticas
6. **CORS:** Configuración restrictiva
7. **Rate Limiting:** Protección contra ataques DDoS

---

## 📞 Próximos Pasos

1. ✅ Revisión de documentación
2. ⏳ Configuración de base de datos PostgreSQL
3. ⏳ Implementación de entidades base
4. ⏳ Desarrollo de módulos principales
5. ⏳ Testing y validación

---

**Documento generado por:** Sistema de Documentación Automática  
**Última actualización:** 22/01/2026

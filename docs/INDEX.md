# 📚 Índice de Documentación - Sistema de Discapacidad

Bienvenido a la documentación completa del Sistema de Gestión de Discapacidad. Esta guía te ayudará a navegar por todos los documentos del proyecto.

---

## 🎯 Inicio Rápido

Si eres nuevo en el proyecto, comienza aquí:

1. 📄 **[README Principal](../README_PROYECTO.md)** - Visión general y configuración inicial
2. 📋 **[Documentación del Sistema](DOCUMENTACION_SISTEMA.md)** - Arquitectura completa
3. 🗄️ **[Schema de Base de Datos](DATABASE_SCHEMA.md)** - Modelo de datos
4. 🚀 **[Plan de Implementación](PLAN_IMPLEMENTACION.md)** - Roadmap de desarrollo

---

## 📖 Documentos Principales

### 1. README Principal
**Archivo:** `README_PROYECTO.md`  
**Propósito:** Introducción al proyecto, instalación y configuración básica  
**Audiencia:** Desarrolladores nuevos, DevOps

**Contenido:**
- Descripción general del sistema
- Stack tecnológico
- Guía de instalación
- Comandos básicos
- Estructura del proyecto

---

### 2. Documentación del Sistema
**Archivo:** `docs/DOCUMENTACION_SISTEMA.md`  
**Propósito:** Arquitectura técnica y diseño del sistema  
**Audiencia:** Desarrolladores, Arquitectos de Software

**Contenido:**
- Arquitectura del sistema
- Módulos principales y responsabilidades
- Modelos de datos (TypeScript interfaces)
- Relaciones entre entidades
- Flujos de trabajo del negocio
- Convenciones de código
- Consideraciones de seguridad

**Secciones destacadas:**
```
1. Descripción General
2. Arquitectura del Sistema
3. Módulos Principales
   - Módulo de Personas
   - Módulo de Certificados
   - Módulo de Prestaciones
   - Módulo de Financiadoras
4. Modelos de Datos
5. Relaciones entre Entidades
6. Flujos de Trabajo
7. Plan de Implementación
```

---

### 3. Schema de Base de Datos
**Archivo:** `docs/DATABASE_SCHEMA.md`  
**Propósito:** Diseño detallado de la base de datos PostgreSQL  
**Audiencia:** DBAs, Desarrolladores Backend

**Contenido:**
- Enumeraciones (ENUMs)
- Scripts SQL de creación de tablas
- Índices y optimizaciones
- Triggers y funciones
- Vistas útiles
- Datos de ejemplo

**17 Tablas principales:**
1. `personas`
2. `terceros_vinculados`
3. `persona_terceros_vinculado`
4. `financiadoras`
5. `persona_financiadora`
6. `funciones_salud`
7. `certificados_discapacidad`
8. `nomenclador`
9. `servicios`
10. `orientaciones_prestacionales`
11. `orientacion_servicios`
12. `presupuestos`
13. `metricas_admin`
14. `categorias_soluciones`
15. `soluciones_para_financiadora`
16. `problemas_identificados`
17. `formatos_admin`

---

### 4. Plan de Implementación
**Archivo:** `docs/PLAN_IMPLEMENTACION.md`  
**Propósito:** Cronograma detallado de desarrollo  
**Audiencia:** Project Managers, Desarrolladores, Stakeholders

**Contenido:**
- Cronograma de 8 semanas
- Tareas detalladas por día
- Dependencias del proyecto
- Comandos útiles
- Métricas de éxito

**Fases:**
- **Semana 1:** Configuración Base
- **Semana 2:** Módulo de Personas
- **Semana 3:** Módulo de Financiadoras
- **Semana 4:** Módulo de Certificados
- **Semana 5:** Módulo de Prestaciones
- **Semana 6:** Análisis y Métricas
- **Semana 7:** Testing y Optimización
- **Semana 8:** Deploy y Producción

---

## 🔍 Guías por Rol

### Para Desarrolladores Backend

**Lectura recomendada:**
1. [README Principal](../README_PROYECTO.md) - Configuración inicial
2. [Documentación del Sistema](DOCUMENTACION_SISTEMA.md) - Arquitectura
3. [Plan de Implementación](PLAN_IMPLEMENTACION.md) - Tareas a realizar
4. [Schema de Base de Datos](DATABASE_SCHEMA.md) - Modelo de datos

**Orden sugerido:**
```
README → DOCUMENTACION_SISTEMA → DATABASE_SCHEMA → PLAN_IMPLEMENTACION
```

---

### Para DBAs

**Lectura recomendada:**
1. [Schema de Base de Datos](DATABASE_SCHEMA.md) - Diseño completo
2. [Documentación del Sistema](DOCUMENTACION_SISTEMA.md) - Relaciones
3. [README Principal](../README_PROYECTO.md) - Configuración

**Archivos relevantes:**
- Scripts SQL completos en `DATABASE_SCHEMA.md`
- Diagramas de relaciones en `DOCUMENTACION_SISTEMA.md`
- Variables de entorno en `README_PROYECTO.md`

---

### Para Project Managers

**Lectura recomendada:**
1. [Plan de Implementación](PLAN_IMPLEMENTACION.md) - Cronograma
2. [Documentación del Sistema](DOCUMENTACION_SISTEMA.md) - Alcance funcional
3. [README Principal](../README_PROYECTO.md) - Resumen ejecutivo

**Información clave:**
- Duración: 8 semanas
- Fases del proyecto claramente definidas
- Métricas de éxito por semana
- Entregables específicos

---

### Para Nuevos Desarrolladores

**Ruta de aprendizaje recomendada:**

**Día 1:**
- Leer [README Principal](../README_PROYECTO.md)
- Configurar entorno local
- Ejecutar aplicación en modo desarrollo

**Día 2:**
- Leer [Documentación del Sistema](DOCUMENTACION_SISTEMA.md)
- Entender arquitectura de módulos
- Revisar convenciones de código

**Día 3:**
- Estudiar [Schema de Base de Datos](DATABASE_SCHEMA.md)
- Entender relaciones entre entidades
- Revisar tipos de datos y ENUMs

**Día 4:**
- Revisar [Plan de Implementación](PLAN_IMPLEMENTACION.md)
- Identificar tareas pendientes
- Asignar primer módulo a desarrollar

**Día 5:**
- Comenzar desarrollo
- Seguir convenciones establecidas
- Realizar primera Pull Request

---

## 📂 Estructura de Documentación

```
consultora-ten-back/
├── README.md                              # README original de NestJS
├── README_PROYECTO.md                     # README del proyecto
├── docs/
│   ├── INDEX.md                          # Este archivo
│   ├── DOCUMENTACION_SISTEMA.md          # Arquitectura completa
│   ├── DATABASE_SCHEMA.md                # Esquema de DB
│   └── PLAN_IMPLEMENTACION.md            # Cronograma
├── Documentacion-sistema-discapacidad/
│   └── SISTEMA_DISCAPACIDAD_DOCUMENTACION.xlsx  # Fuente original
└── scripts/
    └── read-excel.js                     # Script de conversión
```

---

## 🎨 Diagramas y Visualizaciones

### Diagrama de Relaciones Principal

Consultar sección **"Relaciones entre Entidades"** en:
- [DOCUMENTACION_SISTEMA.md](DOCUMENTACION_SISTEMA.md#relaciones-entre-entidades)

### Diagrama de Arquitectura

Consultar sección **"Arquitectura del Sistema"** en:
- [DOCUMENTACION_SISTEMA.md](DOCUMENTACION_SISTEMA.md#arquitectura-del-sistema)

### Flujos de Trabajo

Consultar sección **"Flujos de Trabajo"** en:
- [DOCUMENTACION_SISTEMA.md](DOCUMENTACION_SISTEMA.md#flujos-de-trabajo)

---

## 🔧 Documentación Técnica por Módulo

### Módulo: Personas
- **Documentación:** [DOCUMENTACION_SISTEMA.md](DOCUMENTACION_SISTEMA.md#1-módulo-de-personas)
- **Schema SQL:** [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md#1-tabla-personas)
- **Plan:** [PLAN_IMPLEMENTACION.md](PLAN_IMPLEMENTACION.md#semana-2-módulo-de-personas)

### Módulo: Certificados
- **Documentación:** [DOCUMENTACION_SISTEMA.md](DOCUMENTACION_SISTEMA.md#2-módulo-de-certificados)
- **Schema SQL:** [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md#7-tabla-certificados_discapacidad)
- **Plan:** [PLAN_IMPLEMENTACION.md](PLAN_IMPLEMENTACION.md#semana-4-módulo-de-certificados)

### Módulo: Financiadoras
- **Documentación:** [DOCUMENTACION_SISTEMA.md](DOCUMENTACION_SISTEMA.md#4-módulo-de-financiadoras)
- **Schema SQL:** [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md#4-tabla-financiadoras)
- **Plan:** [PLAN_IMPLEMENTACION.md](PLAN_IMPLEMENTACION.md#semana-3-módulo-de-financiadoras)

### Módulo: Prestaciones
- **Documentación:** [DOCUMENTACION_SISTEMA.md](DOCUMENTACION_SISTEMA.md#3-módulo-de-prestaciones)
- **Schema SQL:** [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md#8-tabla-nomenclador)
- **Plan:** [PLAN_IMPLEMENTACION.md](PLAN_IMPLEMENTACION.md#semana-5-módulo-de-prestaciones)

---

## 📊 Resumen de Entidades

| Entidad | Campos | Relaciones | Documento |
|---------|--------|------------|-----------|
| Persona | 17 | 1:N Certificados, N:M Financiadoras | [Ver](DATABASE_SCHEMA.md#1-tabla-personas) |
| CertificadoDiscapacidad | 10 | N:1 Persona, 1:N Orientaciones | [Ver](DATABASE_SCHEMA.md#7-tabla-certificados_discapacidad) |
| Financiadora | 9 | N:M Personas, 1:N Presupuestos | [Ver](DATABASE_SCHEMA.md#4-tabla-financiadoras) |
| Nomenclador | 7 | 1:N Servicios | [Ver](DATABASE_SCHEMA.md#8-tabla-nomenclador) |
| Presupuesto | 8 | N:1 Financiadora | [Ver](DATABASE_SCHEMA.md#12-tabla-presupuestos) |

---

## 🚀 Próximos Pasos

Una vez leída la documentación:

1. **Configurar entorno:**
   - Seguir guía en [README_PROYECTO.md](../README_PROYECTO.md#instalación)

2. **Crear base de datos:**
   - Usar scripts en [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)

3. **Comenzar desarrollo:**
   - Seguir plan en [PLAN_IMPLEMENTACION.md](PLAN_IMPLEMENTACION.md)

4. **Consultar arquitectura:**
   - Revisar [DOCUMENTACION_SISTEMA.md](DOCUMENTACION_SISTEMA.md) cuando sea necesario

---

## 📞 Información de Contacto

Para preguntas sobre la documentación:
- Revisar primero esta guía
- Consultar documento específico según la sección
- Contactar al equipo de desarrollo

---

## 📝 Mantenimiento de Documentación

**Importante:** Mantener documentación actualizada

- Al agregar nuevas entidades → Actualizar `DATABASE_SCHEMA.md`
- Al crear nuevos módulos → Actualizar `DOCUMENTACION_SISTEMA.md`
- Al cambiar cronograma → Actualizar `PLAN_IMPLEMENTACION.md`
- Al modificar configuración → Actualizar `README_PROYECTO.md`

---

## ✅ Checklist para Nuevos Desarrolladores

- [ ] Leer README principal
- [ ] Configurar entorno local
- [ ] Leer documentación del sistema
- [ ] Estudiar schema de base de datos
- [ ] Revisar plan de implementación
- [ ] Ejecutar aplicación en modo desarrollo
- [ ] Revisar código existente
- [ ] Leer convenciones de código
- [ ] Realizar primera tarea del plan

---

**Documentación generada:** Enero 2026  
**Versión:** 1.0  
**Estado:** Completo

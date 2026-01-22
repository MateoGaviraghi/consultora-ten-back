# 🗄️ Modelo de Base de Datos - Sistema de Discapacidad

## Enumeraciones (ENUMs)

### EstadoPersona
```typescript
enum EstadoPersona {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
  FALLECIDO = 'fallecido',
  SUSPENDIDO = 'suspendido'
}
```

### EstadoCivil
```typescript
enum EstadoCivil {
  SOLTERO = 'soltero',
  CASADO = 'casado',
  DIVORCIADO = 'divorciado',
  VIUDO = 'viudo',
  UNION_CONVIVENCIAL = 'union_convivencial'
}
```

### EstadoCertificado
```typescript
enum EstadoCertificado {
  VIGENTE = 'vigente',
  VENCIDO = 'vencido',
  RENOVADO = 'renovado',
  ANULADO = 'anulado',
  EN_TRAMITE = 'en_tramite'
}
```

### TipoFinanciadora
```typescript
enum TipoFinanciadora {
  OBRA_SOCIAL = 'obra_social',
  HOSPITAL_PUBLICO = 'hospital_publico',
  CLINICA_PRIVADA = 'clinica_privada',
  PREPAGA = 'prepaga',
  MUTUAL = 'mutual'
}
```

### EstadoFinanciadora
```typescript
enum EstadoFinanciadora {
  ACTIVO = 'activo',
  SUSPENDIDO = 'suspendido',
  INACTIVO = 'inactivo',
  EN_REVISION = 'en_revision'
}
```

### TipoSolucion
```typescript
enum TipoSolucion {
  PROCESO = 'proceso',
  TECNOLOGIA = 'tecnologia',
  CAPACITACION = 'capacitacion',
  INFRAESTRUCTURA = 'infraestructura',
  NORMATIVA = 'normativa'
}
```

### PrioridadSolucion
```typescript
enum PrioridadSolucion {
  CRITICA = 'critica',
  ALTA = 'alta',
  MEDIA = 'media',
  BAJA = 'baja'
}
```

---

## Scripts SQL para Creación de Tablas

### 1. Tabla: personas

```sql
CREATE TABLE personas (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  dni VARCHAR(20) NOT NULL UNIQUE,
  fecha_nacimiento DATE,
  edad INTEGER,
  telefono VARCHAR(20),
  email VARCHAR(255),
  direccion TEXT,
  estado_civil VARCHAR(50),
  estado VARCHAR(50) NOT NULL DEFAULT 'activo',
  acompaniante BOOLEAN DEFAULT false,
  pension BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_personas_dni ON personas(dni);
CREATE INDEX idx_personas_estado ON personas(estado);
CREATE INDEX idx_personas_apellido_nombre ON personas(apellido, nombre);
```

### 2. Tabla: terceros_vinculados

```sql
CREATE TABLE terceros_vinculados (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  dni VARCHAR(20) NOT NULL UNIQUE,
  fecha_nacimiento DATE,
  edad INTEGER,
  telefono VARCHAR(20),
  email VARCHAR(255),
  direccion TEXT,
  tipo_vinculo VARCHAR(50), -- padre, madre, tutor, cuidador, etc.
  estado VARCHAR(50) NOT NULL DEFAULT 'activo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_terceros_dni ON terceros_vinculados(dni);
```

### 3. Tabla: persona_terceros_vinculado (Tabla intermedia N:M)

```sql
CREATE TABLE persona_terceros_vinculado (
  id SERIAL PRIMARY KEY,
  persona_id INTEGER NOT NULL REFERENCES personas(id) ON DELETE CASCADE,
  tercero_vinculado_id INTEGER NOT NULL REFERENCES terceros_vinculados(id) ON DELETE CASCADE,
  relacion VARCHAR(100), -- Descripción de la relación específica
  es_tutor_legal BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(persona_id, tercero_vinculado_id)
);

CREATE INDEX idx_persona_terceros_persona ON persona_terceros_vinculado(persona_id);
CREATE INDEX idx_persona_terceros_tercero ON persona_terceros_vinculado(tercero_vinculado_id);
```

### 4. Tabla: financiadoras

```sql
CREATE TABLE financiadoras (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  cuit VARCHAR(11) UNIQUE,
  direccion TEXT,
  telefono VARCHAR(20),
  email VARCHAR(255),
  contacto_responsable VARCHAR(255),
  estado VARCHAR(50) NOT NULL DEFAULT 'activo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_financiadoras_tipo ON financiadoras(tipo);
CREATE INDEX idx_financiadoras_estado ON financiadoras(estado);
```

### 5. Tabla: persona_financiadora (Tabla intermedia N:M)

```sql
CREATE TABLE persona_financiadora (
  id SERIAL PRIMARY KEY,
  persona_id INTEGER NOT NULL REFERENCES personas(id) ON DELETE CASCADE,
  financiadora_id INTEGER NOT NULL REFERENCES financiadoras(id) ON DELETE CASCADE,
  numero_afiliado VARCHAR(50),
  fecha_afiliacion DATE,
  estado VARCHAR(50) DEFAULT 'activo',
  es_titular BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(persona_id, financiadora_id)
);

CREATE INDEX idx_persona_financiadora_persona ON persona_financiadora(persona_id);
CREATE INDEX idx_persona_financiadora_financiadora ON persona_financiadora(financiadora_id);
```

### 6. Tabla: funciones_salud

```sql
CREATE TABLE funciones_salud (
  id SERIAL PRIMARY KEY,
  codigo VARCHAR(50) NOT NULL UNIQUE,
  descripcion VARCHAR(255),
  categoria VARCHAR(100),
  tipo_funcion VARCHAR(100),
  estado VARCHAR(50) NOT NULL DEFAULT 'activo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_funciones_codigo ON funciones_salud(codigo);
CREATE INDEX idx_funciones_categoria ON funciones_salud(categoria);
```

### 7. Tabla: certificados_discapacidad

```sql
CREATE TABLE certificados_discapacidad (
  id SERIAL PRIMARY KEY,
  persona_id INTEGER NOT NULL REFERENCES personas(id) ON DELETE CASCADE,
  numero_certificado VARCHAR(100) UNIQUE,
  fecha_emision DATE NOT NULL,
  fecha_vencimiento DATE,
  tipo_discapacidad VARCHAR(255),
  diagnostico TEXT,
  porcentaje_discapacidad INTEGER CHECK (porcentaje_discapacidad >= 0 AND porcentaje_discapacidad <= 100),
  estado VARCHAR(50) NOT NULL DEFAULT 'vigente',
  comentarios TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_certificados_persona ON certificados_discapacidad(persona_id);
CREATE INDEX idx_certificados_estado ON certificados_discapacidad(estado);
CREATE INDEX idx_certificados_fecha_vencimiento ON certificados_discapacidad(fecha_vencimiento);
```

### 8. Tabla: nomenclador

```sql
CREATE TABLE nomenclador (
  id SERIAL PRIMARY KEY,
  categoria VARCHAR(100),
  codigo_prestacion VARCHAR(50) NOT NULL UNIQUE,
  descripcion_prestacion VARCHAR(255) NOT NULL,
  costo_unitario DECIMAL(10, 2),
  unidad_medida VARCHAR(50),
  fecha_vigencia DATE NOT NULL,
  fecha_fin_vigencia DATE,
  estado VARCHAR(50) NOT NULL DEFAULT 'activo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_nomenclador_codigo ON nomenclador(codigo_prestacion);
CREATE INDEX idx_nomenclador_categoria ON nomenclador(categoria);
CREATE INDEX idx_nomenclador_vigencia ON nomenclador(fecha_vigencia, fecha_fin_vigencia);
```

### 9. Tabla: servicios

```sql
CREATE TABLE servicios (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  nomenclador_id INTEGER REFERENCES nomenclador(id),
  jornadas_semanales INTEGER,
  duracion_meses INTEGER,
  categoria VARCHAR(100),
  edad_minima INTEGER,
  edad_maxima INTEGER,
  estado VARCHAR(50) NOT NULL DEFAULT 'activo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_servicios_categoria ON servicios(categoria);
CREATE INDEX idx_servicios_edad ON servicios(edad_minima, edad_maxima);
```

### 10. Tabla: orientaciones_prestacionales

```sql
CREATE TABLE orientaciones_prestacionales (
  id SERIAL PRIMARY KEY,
  certificado_id INTEGER NOT NULL REFERENCES certificados_discapacidad(id) ON DELETE CASCADE,
  titulo VARCHAR(255),
  descripcion TEXT,
  prioridad VARCHAR(50),
  estado VARCHAR(50) NOT NULL DEFAULT 'activo',
  fecha_orientacion DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orientaciones_certificado ON orientaciones_prestacionales(certificado_id);
CREATE INDEX idx_orientaciones_prioridad ON orientaciones_prestacionales(prioridad);
```

### 11. Tabla: orientacion_servicios (Tabla intermedia N:M)

```sql
CREATE TABLE orientacion_servicios (
  id SERIAL PRIMARY KEY,
  orientacion_id INTEGER NOT NULL REFERENCES orientaciones_prestacionales(id) ON DELETE CASCADE,
  servicio_id INTEGER NOT NULL REFERENCES servicios(id) ON DELETE CASCADE,
  prioridad INTEGER DEFAULT 1,
  observaciones TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(orientacion_id, servicio_id)
);

CREATE INDEX idx_orientacion_servicios_orientacion ON orientacion_servicios(orientacion_id);
CREATE INDEX idx_orientacion_servicios_servicio ON orientacion_servicios(servicio_id);
```

### 12. Tabla: presupuestos

```sql
CREATE TABLE presupuestos (
  id SERIAL PRIMARY KEY,
  financiadora_id INTEGER NOT NULL REFERENCES financiadoras(id) ON DELETE CASCADE,
  periodo VARCHAR(7) NOT NULL, -- formato: MM/YYYY
  total_certificados INTEGER DEFAULT 0,
  costo_total DECIMAL(12, 2) DEFAULT 0,
  ingreso_total DECIMAL(12, 2) DEFAULT 0,
  ganancia_perdida DECIMAL(12, 2) GENERATED ALWAYS AS (ingreso_total - costo_total) STORED,
  margen_porcentaje DECIMAL(5, 2) GENERATED ALWAYS AS (
    CASE WHEN ingreso_total > 0 THEN ((ingreso_total - costo_total) / ingreso_total * 100) ELSE 0 END
  ) STORED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(financiadora_id, periodo)
);

CREATE INDEX idx_presupuestos_financiadora ON presupuestos(financiadora_id);
CREATE INDEX idx_presupuestos_periodo ON presupuestos(periodo);
```

### 13. Tabla: metricas_admin

```sql
CREATE TABLE metricas_admin (
  id SERIAL PRIMARY KEY,
  financiadora_id INTEGER NOT NULL REFERENCES financiadoras(id) ON DELETE CASCADE,
  periodo VARCHAR(7) NOT NULL,
  cantidad_casos INTEGER DEFAULT 0,
  tiempo_promedio_resolucion INTEGER, -- en días
  tasa_aprobacion DECIMAL(5, 2), -- porcentaje
  costo_promedio_caso DECIMAL(10, 2),
  observaciones TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(financiadora_id, periodo)
);

CREATE INDEX idx_metricas_financiadora ON metricas_admin(financiadora_id);
CREATE INDEX idx_metricas_periodo ON metricas_admin(periodo);
```

### 14. Tabla: categorias_soluciones

```sql
CREATE TABLE categorias_soluciones (
  id SERIAL PRIMARY KEY,
  nombre_categoria VARCHAR(100) NOT NULL UNIQUE,
  descripcion VARCHAR(255),
  tipo VARCHAR(50),
  prioridad VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 15. Tabla: soluciones_para_financiadora

```sql
CREATE TABLE soluciones_para_financiadora (
  id SERIAL PRIMARY KEY,
  financiadora_id INTEGER NOT NULL REFERENCES financiadoras(id) ON DELETE CASCADE,
  categoria_solucion_id INTEGER NOT NULL REFERENCES categorias_soluciones(id),
  descripcion_solucion TEXT,
  costo_estimado DECIMAL(10, 2),
  tiempo_implementacion VARCHAR(100), -- ej: "2 semanas", "1 mes"
  efectividad VARCHAR(50), -- baja, media, alta
  estado VARCHAR(50) NOT NULL DEFAULT 'propuesta',
  fecha_propuesta DATE NOT NULL DEFAULT CURRENT_DATE,
  fecha_implementacion DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_soluciones_financiadora ON soluciones_para_financiadora(financiadora_id);
CREATE INDEX idx_soluciones_categoria ON soluciones_para_financiadora(categoria_solucion_id);
CREATE INDEX idx_soluciones_estado ON soluciones_para_financiadora(estado);
```

### 16. Tabla: problemas_identificados

```sql
CREATE TABLE problemas_identificados (
  id SERIAL PRIMARY KEY,
  financiadora_id INTEGER NOT NULL REFERENCES financiadoras(id) ON DELETE CASCADE,
  descripcion_problema TEXT NOT NULL,
  categoria VARCHAR(100),
  impacto_financiero VARCHAR(50), -- bajo, medio, alto
  frecuencia VARCHAR(50), -- esporádico, recurrente, constante
  fecha_identificacion DATE NOT NULL DEFAULT CURRENT_DATE,
  estado VARCHAR(50) NOT NULL DEFAULT 'identificado',
  solucion_id INTEGER REFERENCES soluciones_para_financiadora(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_problemas_financiadora ON problemas_identificados(financiadora_id);
CREATE INDEX idx_problemas_estado ON problemas_identificados(estado);
CREATE INDEX idx_problemas_categoria ON problemas_identificados(categoria);
```

### 17. Tabla: formatos_admin

```sql
CREATE TABLE formatos_admin (
  id SERIAL PRIMARY KEY,
  financiadora_id INTEGER NOT NULL REFERENCES financiadoras(id) ON DELETE CASCADE,
  tipo_documento VARCHAR(100) NOT NULL,
  campos_requeridos TEXT[], -- array de campos
  formato_archivo VARCHAR(50), -- PDF, Excel, Word, etc.
  template_url VARCHAR(500),
  observaciones TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_formatos_financiadora ON formatos_admin(financiadora_id);
CREATE INDEX idx_formatos_tipo ON formatos_admin(tipo_documento);
```

---

## Triggers y Funciones

### Trigger: Actualizar edad automáticamente

```sql
CREATE OR REPLACE FUNCTION actualizar_edad()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.fecha_nacimiento IS NOT NULL THEN
    NEW.edad = EXTRACT(YEAR FROM AGE(NEW.fecha_nacimiento));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_actualizar_edad_persona
BEFORE INSERT OR UPDATE ON personas
FOR EACH ROW
EXECUTE FUNCTION actualizar_edad();

CREATE TRIGGER trigger_actualizar_edad_tercero
BEFORE INSERT OR UPDATE ON terceros_vinculados
FOR EACH ROW
EXECUTE FUNCTION actualizar_edad();
```

### Trigger: Actualizar updated_at

```sql
CREATE OR REPLACE FUNCTION actualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar a todas las tablas que tengan updated_at
CREATE TRIGGER trigger_actualizar_timestamp_personas
BEFORE UPDATE ON personas
FOR EACH ROW
EXECUTE FUNCTION actualizar_timestamp();

-- Repetir para cada tabla con updated_at
```

### Función: Verificar vigencia de certificado

```sql
CREATE OR REPLACE FUNCTION verificar_vigencia_certificado(certificado_id INTEGER)
RETURNS VARCHAR AS $$
DECLARE
  fecha_venc DATE;
  estado_actual VARCHAR;
BEGIN
  SELECT fecha_vencimiento, estado INTO fecha_venc, estado_actual
  FROM certificados_discapacidad
  WHERE id = certificado_id;
  
  IF fecha_venc < CURRENT_DATE AND estado_actual = 'vigente' THEN
    UPDATE certificados_discapacidad SET estado = 'vencido' WHERE id = certificado_id;
    RETURN 'vencido';
  ELSE
    RETURN estado_actual;
  END IF;
END;
$$ LANGUAGE plpgsql;
```

---

## Vistas Útiles

### Vista: Personas con certificados vigentes

```sql
CREATE VIEW personas_con_certificados_vigentes AS
SELECT 
  p.id,
  p.nombre,
  p.apellido,
  p.dni,
  p.edad,
  COUNT(c.id) as cantidad_certificados,
  MAX(c.fecha_vencimiento) as proxima_fecha_vencimiento
FROM personas p
INNER JOIN certificados_discapacidad c ON p.id = c.persona_id
WHERE c.estado = 'vigente'
GROUP BY p.id, p.nombre, p.apellido, p.dni, p.edad;
```

### Vista: Dashboard financiadoras

```sql
CREATE VIEW dashboard_financiadoras AS
SELECT 
  f.id,
  f.nombre,
  f.tipo,
  COUNT(DISTINCT pf.persona_id) as total_afiliados,
  COUNT(DISTINCT c.id) as total_certificados,
  COALESCE(p.ganancia_perdida, 0) as ganancia_actual,
  COALESCE(p.margen_porcentaje, 0) as margen_actual
FROM financiadoras f
LEFT JOIN persona_financiadora pf ON f.id = pf.financiadora_id
LEFT JOIN certificados_discapacidad c ON pf.persona_id = c.persona_id
LEFT JOIN LATERAL (
  SELECT ganancia_perdida, margen_porcentaje
  FROM presupuestos
  WHERE financiadora_id = f.id
  ORDER BY periodo DESC
  LIMIT 1
) p ON true
WHERE f.estado = 'activo'
GROUP BY f.id, f.nombre, f.tipo, p.ganancia_perdida, p.margen_porcentaje;
```

---

## Datos de Ejemplo

```sql
-- Insertar categorías de soluciones
INSERT INTO categorias_soluciones (nombre_categoria, descripcion, tipo, prioridad) VALUES
('Optimización de Procesos', 'Mejora en los flujos de trabajo', 'proceso', 'alta'),
('Tecnología', 'Implementación de nuevas herramientas', 'tecnologia', 'media'),
('Capacitación', 'Formación del personal', 'capacitacion', 'alta'),
('Infraestructura', 'Mejoras en instalaciones', 'infraestructura', 'baja');

-- Insertar funciones de salud (ejemplo CIF)
INSERT INTO funciones_salud (codigo, descripcion, categoria, tipo_funcion) VALUES
('b140', 'Funciones de la atención', 'Funciones mentales', 'Cognitiva'),
('b280', 'Sensación de dolor', 'Funciones sensoriales', 'Sensorial'),
('d450', 'Andar', 'Movilidad', 'Motora');
```

# 🔧 Configuración de GitHub Actions + Neon

## ✅ Paso 1: Verificar Secrets y Variables en GitHub

Ve a tu repositorio en GitHub: `MateoGaviraghi/consultora-ten-back`

### A. Configurar Secrets

1. Ve a **Settings** → **Secrets and variables** → **Actions**
2. Click en **New repository secret**
3. Según la imagen, ya deberías tener:
   - ✅ `NEON_API_KEY` (ya configurado por Neon)

### B. Configurar Variables

1. Ve a **Settings** → **Secrets and variables** → **Actions** → **Variables** tab
2. Click en **New repository variable**
3. Según la imagen, ya deberías tener:
   - ✅ `NEON_PROJECT_ID` (ya configurado por Neon)

**Nota:** Si no ves estas variables, cópialas de la integración de Neon que ya configuraste.

---

## ✅ Paso 2: Dar Permisos al Workflow

Para que GitHub Actions pueda comentar en los PRs:

1. Ve a **Settings** → **Actions** → **General**
2. Baja hasta **Workflow permissions**
3. Selecciona: **Read and write permissions**
4. Marca: ✅ **Allow GitHub Actions to create and approve pull requests**
5. Click **Save**

---

## ✅ Paso 3: Push del Workflow

El archivo ya está creado en `.github/workflows/neon_workflow.yml`

Ahora solo necesitas hacer commit y push:

```bash
git add .github/workflows/neon_workflow.yml
git commit -m "feat: add Neon database branching workflow"
git push origin main
```

---

## 🎯 Cómo Funciona

### Cuando abres un Pull Request:

1. **GitHub Action se activa** automáticamente
2. **Crea un branch de Neon** llamado `preview/pr-{número}-{nombre-branch}`
3. **Expira en 14 días** (se borra automáticamente)
4. **Ejecuta migraciones** en el nuevo branch
5. **Comenta en el PR** con la información del branch

### Cuando cierras el Pull Request:

1. **GitHub Action se activa**
2. **Elimina el branch de Neon** automáticamente
3. **Comenta en el PR** confirmando la eliminación

---

## 📝 Ejemplo de Flujo

```
1. Creas branch: feature/nueva-funcionalidad
2. Haces cambios en entities/migrations
3. Abres PR → GitHub crea branch de DB automáticamente
4. Comentario en PR: "🎉 Neon Database Branch Created!"
5. Pruebas con la DB del PR
6. Mergeas PR → Branch de DB se elimina automáticamente
```

---

## 🔍 Verificar que Funciona

### Opción 1: Crear un PR de Prueba

```bash
# Crear branch de prueba
git checkout -b test/neon-integration

# Hacer un cambio pequeño
echo "# Test Neon Integration" >> TEST.md

# Commit y push
git add TEST.md
git commit -m "test: verify Neon integration"
git push origin test/neon-integration
```

Luego:
1. Ve a GitHub
2. Crea un Pull Request desde `test/neon-integration` → `main`
3. Espera unos segundos
4. Verás el Action ejecutándose en la pestaña **Actions**
5. Cuando termine, verás un comentario en el PR con la info del DB branch

### Opción 2: Ver Actions Existentes

1. Ve a la pestaña **Actions** en GitHub
2. Espera a que se ejecute el próximo PR
3. Podrás ver los logs en tiempo real

---

## 🚨 Troubleshooting

### Error: "NEON_API_KEY not found"
**Solución:** Ve a Settings → Secrets y verifica que `NEON_API_KEY` existe

### Error: "NEON_PROJECT_ID not found"
**Solución:** Ve a Settings → Secrets → Variables y verifica que existe

### Error: "Permission denied to comment"
**Solución:** 
1. Ve a Settings → Actions → General
2. Habilita "Read and write permissions"

### Action no se ejecuta
**Solución:**
1. Verifica que el archivo está en `.github/workflows/`
2. Verifica que el archivo tiene extensión `.yml`
3. Haz push del archivo a main

---

## 📊 Ventajas de Esta Configuración

✅ **Branch de DB por PR** - Cada PR tiene su propia base de datos
✅ **Migraciones automáticas** - Se ejecutan al crear el branch
✅ **Limpieza automática** - Los branches se borran al cerrar el PR
✅ **Expiración automática** - 14 días si no se cierra el PR
✅ **Comentarios en PR** - Info clara del estado de la DB

---

## 🔐 Seguridad

- ✅ La `DATABASE_URL` NO se muestra en logs
- ✅ Los secrets están encriptados en GitHub
- ✅ Solo se usan en el workflow, nunca se exponen
- ✅ Los branches de preview se borran automáticamente

---

## 📚 Documentación Adicional

- [Neon GitHub Integration Guide](https://neon.tech/docs/guides/github-integration)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Neon Branching](https://neon.tech/docs/introduction/branching)

---

**Estado:** ✅ Configurado
**Fecha:** 22/01/2026
**Próximo paso:** Push y crear PR de prueba

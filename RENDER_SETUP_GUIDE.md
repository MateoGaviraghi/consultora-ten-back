# ⚡ Guía Rápida: Configurar Render

## 🎯 Objetivo

Configurar Render para que automáticamente cree preview deploys cuando abras Pull Requests, usando los branches de base de datos de Neon.

---

## 📋 Paso a Paso (5 minutos)

### 1️⃣ Ir a tu Dashboard de Render

1. Ve a https://dashboard.render.com/
2. Encuentra tu servicio de backend (consultora-ten-back)
3. Click en el servicio

---

### 2️⃣ Habilitar Preview Deploys

1. En el menú lateral, click en **Settings**
2. Baja hasta la sección **"Pull Request Previews"**
3. Click en **"Enable Pull Request Previews"**
4. Configura:
   - ✅ **Create previews for pull requests**
   - **Base branch:** `main` (o `dev` si usas esa como principal)
   - ✅ **Auto-deploy:** Activado

5. Click **"Save Changes"**

---

### 3️⃣ Verificar Variables de Entorno

En **Settings** → **Environment**:

#### Variables Necesarias:

```env
DATABASE_URL=<tu-url-de-neon-producción>
NODE_ENV=production
PORT=3000

# JWT
JWT_SECRET=tu_secreto_super_seguro
JWT_EXPIRATION=1d
JWT_REFRESH_SECRET=otro_secreto_para_refresh
JWT_REFRESH_EXPIRATION=7d

# CORS (ajusta según tu frontend)
CORS_ORIGIN=https://tu-frontend.com
```

---

### 4️⃣ Build Configuration

Verifica que tengas:

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm run start:prod
```

**Node Version:** 18.x o superior

---

## 🎯 Cómo Funciona

### Cuando abres un PR:

```
1. Push código a GitHub
   ↓
2. Abres Pull Request
   ↓
3. GitHub Action crea Neon DB branch
   ↓
4. Render detecta el PR automáticamente
   ↓
5. Render crea un preview deploy
   ↓
6. Preview deploy está disponible en URL temporal
```

### URL del Preview:

Render te da una URL como:
```
https://consultora-ten-back-pr-{número}.onrender.com
```

---

## ⚙️ Configurar DATABASE_URL en Preview

### Opción 1: Automática (Recomendada)

Render heredará las variables del servicio principal, PERO necesitas actualizar manualmente la `DATABASE_URL` para cada preview.

**Pasos:**
1. Cuando se cree el preview deploy en Render
2. Ve al preview deploy → Settings → Environment
3. Actualiza `DATABASE_URL` con la del branch de Neon
4. La URL la encuentras en el comentario del PR en GitHub

### Opción 2: Render Blueprint (Avanzada)

Crear un archivo `render.yaml` para configurar automáticamente:

```yaml
services:
  - type: web
    name: consultora-ten-back
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm run start:prod
    previewsEnabled: true
    previewsExpireAfterDays: 14
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3000
      # DATABASE_URL se configura manualmente por preview
```

---

## 🔍 Verificar que Funciona

### Test Completo:

1. **Crear branch de prueba:**
   ```bash
   git checkout -b test/render-integration
   echo "# Test" >> TEST.md
   git add . && git commit -m "test: Render integration"
   git push origin test/render-integration
   ```

2. **Crear PR en GitHub**

3. **Esperar ~2-3 minutos**

4. **Verificar:**
   - ✅ Comentario en PR con info de Neon branch
   - ✅ Preview deploy aparece en GitHub (Deployments section)
   - ✅ Preview deploy visible en Render dashboard
   - ✅ URL del preview funciona

---

## 🚨 Troubleshooting

### Preview deploy no se crea

**Solución:**
- Verifica que "Pull Request Previews" está habilitado
- Asegúrate de que el PR es desde un branch del mismo repo (no fork)
- Revisa los logs en Render

### Preview deploy falla al iniciar

**Solución:**
- Verifica que `DATABASE_URL` está configurada
- Revisa los logs en Render → Preview Deploy → Logs
- Verifica que las migraciones corrieron bien

### Base de datos no conecta

**Solución:**
- Copia la URL correcta del branch de Neon del comentario del PR
- Pégala en Preview Deploy → Settings → Environment → DATABASE_URL
- Redeploy el preview

---

## 💡 Tips

### 1. Limpieza Automática
- Render borra previews cuando cierras el PR
- Los previews también expiran después de 14 días de inactividad

### 2. Logs
- Accede a logs en tiempo real desde Render dashboard
- Útil para debugging de previews

### 3. Performance
- Los previews pueden tardar 2-5 minutos en estar listos
- Es normal, Render hace build completo cada vez

---

## 📊 Resumen

| Aspecto | Configuración |
|---------|--------------|
| **Preview Deploys** | ✅ Habilitado |
| **Base Branch** | main o dev |
| **Auto Deploy** | ✅ Activado |
| **Variables heredadas** | ✅ Automático |
| **DATABASE_URL** | ⚠️ Manual por preview |
| **Expiración** | 14 días |
| **Limpieza** | Automática al cerrar PR |

---

## ✅ Checklist Final

- [ ] Preview Deploys habilitados en Render
- [ ] Variables de entorno configuradas
- [ ] Build/Start commands correctos
- [ ] PR de prueba creado
- [ ] Preview deploy funciona
- [ ] DATABASE_URL actualizada manualmente

---

**Siguiente:** Probar todo el flujo con un PR real 🚀

**Documentación completa:** Ver `docs/RENDER_NEON_INTEGRATION.md`

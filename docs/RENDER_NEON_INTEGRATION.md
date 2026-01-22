# 🚀 Integración Completa: GitHub + Neon + Render

## 📋 Arquitectura del Sistema

```
GitHub PR → Neon DB Branch → Render Preview Deploy
    ↓            ↓                    ↓
  main     Production DB      Production Deploy
```

---

## 🎯 Cómo Funciona

### Ambiente de Producción (main branch)
- **GitHub:** Branch `main`
- **Neon:** Database principal
- **Render:** Deploy de producción

### Ambiente de Preview (feature branches)
- **GitHub:** Pull Request
- **Neon:** Branch temporal de DB (auto-creado)
- **Render:** Preview deploy (auto-creado)

---

## 🔧 Configuración en Render

### 1️⃣ Configurar tu Web Service Principal

1. Ve a tu dashboard de Render
2. Encuentra tu servicio de backend
3. Ve a **Settings**

#### Environment Variables (Producción):

```env
DATABASE_URL=${{ NEON_DATABASE_URL }}
NODE_ENV=production
PORT=3000
```

**Importante:** Usa la URL de tu base de datos principal de Neon

---

### 2️⃣ Habilitar Preview Deploys en Render

1. En tu servicio de Render, ve a **Settings** → **Deploy**
2. Busca **"Pull Request Previews"**
3. ✅ Habilita **"Create previews for pull requests"**
4. Configura:
   - **Branch to deploy from:** `main` (o `dev`)
   - ✅ **Auto-deploy:** Sí

#### ¿Qué hace esto?

- Cuando abres un PR → Render crea un deploy temporal
- Cuando cierras el PR → Render borra el deploy temporal

---

## 🔗 Actualizar GitHub Actions Workflow

Voy a actualizar el workflow para que pase la URL de la DB del branch a Render:

### Archivo: `.github/workflows/neon_workflow.yml`

```yaml
name: Create/Delete Branch for Pull Request

on:
  pull_request:
    types:
      - opened
      - reopened
      - synchronize
      - closed

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}

jobs:
  setup:
    name: Setup
    outputs:
      branch: ${{ steps.branch_name.outputs.current_branch }}
    runs-on: ubuntu-latest
    steps:
      - name: Get branch name
        id: branch_name
        uses: tj-actions/branch-names@v8

  create_neon_branch:
    name: Create Neon Branch
    needs: setup
    if: |
      github.event_name == 'pull_request' && (
      github.event.action == 'synchronize'
      || github.event.action == 'opened'
      || github.event.action == 'reopened')
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Get branch expiration date (2 weeks)
        id: get_expiration_date
        run: echo "EXPIRES_AT=$(date -u --date '+14 days' +'%Y-%m-%dT%H:%M:%SZ')" >> "$GITHUB_ENV"
      
      - name: Create Neon Branch
        id: create_neon_branch
        uses: neondatabase/create-branch-action@v6
        with:
          project_id: ${{ vars.NEON_PROJECT_ID }}
          branch_name: preview/pr-${{ github.event.number }}-${{ needs.setup.outputs.branch }}
          api_key: ${{ secrets.NEON_API_KEY }}
          expires_at: ${{ env.EXPIRES_AT }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run Migrations on Preview DB
        run: npm run migration:run
        env:
          DATABASE_URL: ${{ steps.create_neon_branch.outputs.db_url_with_pooler }}

      - name: Comment PR with Database and Render Info
        uses: actions/github-script@v7
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            const dbUrl = '${{ steps.create_neon_branch.outputs.db_url_with_pooler }}';
            const branchName = 'preview/pr-${{ github.event.number }}-${{ needs.setup.outputs.branch }}';
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## 🎉 Preview Environment Ready!
              
              ### 📊 Neon Database Branch
              - **Branch:** \`${branchName}\`
              - **Expires:** ${{ env.EXPIRES_AT }}
              - **Status:** ✅ Migrations applied
              
              ### 🚀 Render Preview Deploy
              - Render will automatically create a preview deploy
              - Check the **Deployments** tab for the preview URL
              - The preview will use the database branch created above
              
              ### 🔗 Next Steps
              1. Wait for Render to finish deploying (2-3 min)
              2. Test your changes in the preview environment
              3. Once approved, merge the PR
              
              > **Note:** Both the database branch and Render preview will be deleted when this PR is closed.`
            })

  delete_neon_branch:
    name: Delete Neon Branch
    needs: setup
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    steps:
      - name: Delete Neon Branch
        uses: neondatabase/delete-branch-action@v3
        with:
          project_id: ${{ vars.NEON_PROJECT_ID }}
          branch: preview/pr-${{ github.event.number }}-${{ needs.setup.outputs.branch }}
          api_key: ${{ secrets.NEON_API_KEY }}

      - name: Comment PR
        uses: actions/github-script@v7
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## 🗑️ Preview Environment Cleaned Up
              
              - ✅ Neon database branch deleted
              - ✅ Render preview deploy removed
              
              All preview resources have been cleaned up automatically.`
            })
```

---

## 🎯 Configurar Variables de Entorno en Render Preview

Render puede heredar variables de entorno del deploy principal, pero necesitamos configurar la `DATABASE_URL` para que use el branch de Neon.

### Opción 1: Manual (Simple)

Cuando Render cree el preview deploy:
1. Ve al preview deploy en Render
2. Settings → Environment
3. Agrega: `DATABASE_URL` con el valor del branch de Neon
4. El valor lo encuentras en el comentario del PR

### Opción 2: Automática con Render Deploy Hook

Agrega este step al workflow después de crear el branch:

```yaml
- name: Trigger Render Deploy
  run: |
    curl -X POST "${{ secrets.RENDER_DEPLOY_HOOK }}" \
      -H "Content-Type: application/json" \
      -d '{
        "clearCache": false,
        "envVars": {
          "DATABASE_URL": "${{ steps.create_neon_branch.outputs.db_url_with_pooler }}"
        }
      }'
```

Para esto necesitas:
1. Ir a Render → Settings → Deploy Hook
2. Copiar el Deploy Hook URL
3. Agregarlo como secret en GitHub: `RENDER_DEPLOY_HOOK`

---

## 📝 Configuración Completa en Render

### Variables de Entorno Principales

```env
# Producción (main branch)
DATABASE_URL=postgresql://neondb_owner:npg_J8dghacDBE5f@ep-weathered-morning-ahed619c-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require

# JWT (compartido entre prod y preview)
JWT_SECRET=tu_secreto_super_seguro
JWT_EXPIRATION=1d
JWT_REFRESH_SECRET=otro_secreto_para_refresh
JWT_REFRESH_EXPIRATION=7d

# App
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://tu-frontend.com
```

### Variables para Preview Deploys

Las preview deploys heredan todas las variables EXCEPTO:
- `DATABASE_URL` → Debes configurarla manualmente con el branch de Neon
- `NODE_ENV` → Puede quedarse en "production" o cambiarlo a "preview"

---

## 🔄 Flujo Completo de Trabajo

### Desarrollo de Feature

```bash
# 1. Crear branch de feature
git checkout -b feature/nueva-funcionalidad

# 2. Desarrollar (crear entities, migrations, etc.)
# ... código ...

# 3. Generar migración
npm run migration:generate -- src/core/database/migrations/AddNuevaTabla

# 4. Push
git push origin feature/nueva-funcionalidad
```

### En GitHub (Automático)

```
5. Crear Pull Request
   ↓
6. GitHub Action se activa
   ↓
7. Neon crea branch de DB
   ↓
8. Se ejecutan migraciones en el branch
   ↓
9. Comentario en PR con info
```

### En Render (Automático)

```
10. Render detecta el PR
    ↓
11. Crea preview deploy
    ↓
12. Deploy disponible en URL temporal
```

### Testing

```
13. Probar en preview URL
14. Si todo OK → Aprobar PR
15. Merge → Deploy a producción
```

### Limpieza (Automática)

```
16. PR cerrado/merged
    ↓
17. Neon borra branch de DB
    ↓
18. Render borra preview deploy
```

---

## 🎯 Ventajas de Este Setup

✅ **Ambientes aislados** - Cada PR tiene su propia DB y deploy
✅ **Testing completo** - Pruebas en ambiente casi idéntico a producción
✅ **Sin conflictos** - Múltiples features en paralelo sin interferir
✅ **Limpieza automática** - No quedan recursos huérfanos
✅ **Migraciones seguras** - Pruebas de migraciones antes de producción
✅ **Rollback fácil** - Si algo falla, solo cierras el PR

---

## 📊 Costos

### Neon
- **Free tier:** 10 branches concurrentes
- **Expiración:** 14 días automáticamente
- **Costo:** $0 en tier gratuito

### Render
- **Free tier:** Preview deploys incluidos
- **Límite:** 400 horas/mes build time
- **Costo:** $0 en tier gratuito

### GitHub Actions
- **Free tier:** 2000 minutos/mes
- **Este workflow:** ~2-3 minutos por PR
- **Costo:** $0 en tier gratuito

---

## 🚀 Próximos Pasos

1. ✅ Ya configuraste permisos en GitHub
2. ⏱️ **Habilitar Preview Deploys en Render**
3. ⏱️ **Push del workflow actualizado**
4. ⏱️ **Probar con un PR**

---

## 🔍 Verificar que Todo Funciona

### Checklist:

- [ ] Preview Deploys habilitados en Render
- [ ] Workflow pusheado a GitHub
- [ ] PR de prueba creado
- [ ] Comentario automático en PR aparece
- [ ] Render crea preview deploy
- [ ] Preview deploy funciona con DB branch
- [ ] Al cerrar PR, todo se limpia

---

**¿Necesitas ayuda configurando Render?** ¡Dime y te guío paso a paso! 🚀

# Desplegament a Railway

Aquesta guia porta la web de Lifetime Weddings a producció en Railway, incloent-hi persistència de SQLite, variables d'entorn, domini personalitzat `lifetime.photo` i notificacions d'email reals.

Temps total estimat: **30 min** (la primera vegada). Deploys posteriors: **push a Git** i Railway desplega sol.

---

## Requisits previs

- Compte a [railway.app](https://railway.app) (gratis per començar — 500 h/mes al pla de desenvolupador)
- Accés al repositori Git del projecte (GitHub/GitLab). Si encara no el tens, publica'l primer:
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin https://github.com/<user>/lifetime-weddings.git
  git push -u origin main
  ```
- Accés al DNS del domini `lifetime.photo` (o al proveïdor on està registrat)

---

## Pas 1 — Crear el servei a Railway

1. [railway.app/new](https://railway.app/new) → **"Deploy from GitHub repo"**
2. Selecciona el repositori de Lifetime Weddings
3. Railway detecta automàticament que és un projecte Node (Nixpacks). No cal tocar res al build — ja ho llegeix del `railway.json` que tenim al repo.
4. Railway fa el primer build. Triga uns **2-3 minuts** (el més pesat és `npm ci` + `astro build`).
5. El primer deploy **fallarà** perquè falten les variables d'entorn. Això és esperat — ara les posem.

---

## Pas 2 — Afegir un volum persistent (SQLite)

Per defecte, el disc de Railway és efímer: cada deploy perd els fitxers. Necessitem un volum persistent per la base de dades dels pressupostos:

1. Al servei → pestanya **"Volumes"** → `+ New Volume`
2. **Mount path**: `/data`
3. **Size**: 1 GB (més que suficient — la DB fa ~1 MB)
4. Guarda

---

## Pas 3 — Variables d'entorn

Al servei → pestanya **"Variables"**. Copia-les una per una (o fes servir la importació en massa amb `.env`):

### Imprescindibles

```
NODE_ENV=production
HOST=0.0.0.0

# Admin
ADMIN_USER=eric
# Genera el hash localment abans: node scripts/hash-password.mjs "la-teva-contrasenya"
ADMIN_PASSWORD_HASH=$2a$12$...

# DB (apunta al volum persistent muntat al pas 2)
DATABASE_URL=file:/data/quotes.db

# Privadesa
IP_HASH_SALT=<genera un string llarg i aleatori — openssl rand -hex 32>

# URL pública (actualitza quan tinguis el domini lliure)
PUBLIC_SITE_URL=https://www.lifetime.photo
```

### Feed d'Instagram (Behold)
```
BEHOLD_FEED_ID=P9y7zOS9mlH3lFsHbOs4
```

### Email de notificacions (Resend)

1. Crea compte a [resend.com](https://resend.com) (gratis, 3.000 correus/mes)
2. Afegeix el domini `lifetime.photo` i configura els DNS que et demana Resend (SPF, DKIM)
3. Genera una API key a `Settings → API Keys`

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
EMAIL_FROM=Lifetime Weddings <notifications@lifetime.photo>
EMAIL_TO=hola@lifetime.photo
```

Si encara no tens el domini verificat a Resend, deixa `RESEND_API_KEY` buit — les notificacions es loguejaran a la consola de Railway.

### Telegram (opcional)

Si vols notificacions push per Telegram a més dels emails:

1. Parla amb [@BotFather](https://t.me/BotFather) a Telegram → `/newbot` → segueix les passes
2. Obté el `TELEGRAM_BOT_TOKEN`
3. Envia un missatge al teu bot, després ves a `https://api.telegram.org/bot<TOKEN>/getUpdates` i copia el `chat.id` de la resposta

```
TELEGRAM_BOT_TOKEN=123456:ABC-xxx
TELEGRAM_CHAT_ID=123456789
```

---

## Pas 4 — Redesplegar

Un cop les variables estan posades:

- Al servei → **"Deployments"** → **"Redeploy"** (o simplement fes push d'un commit nou)
- Espera ~2 min
- Al final veuràs el healthcheck passar: `GET /api/health → 200`

Railway et dóna una URL temporal tipus `lifetime-weddings-production.up.railway.app`. **Prova-la**:

- `/` → home en català
- `/admin/login` → entra amb `eric` / la teva contrasenya
- `/quiz` → fes un pressupost de prova

---

## Pas 5 — Domini personalitzat (lifetime.photo)

Quan estigui tot ben verificat:

1. Al servei → **"Settings"** → **"Networking"** → **"Custom Domain"**
2. Afegeix `www.lifetime.photo` (i opcionalment `lifetime.photo` amb redirect a www)
3. Railway et dóna uns registres CNAME → configura'ls al DNS del domini

   Exemple (al proveïdor DNS):
   ```
   Tipus  Nom   Valor
   CNAME  www   <railway-generat>.up.railway.app
   ```
4. Espera la propagació (normalment <5 min, a vegades fins a 30)
5. Railway emet certificat SSL automàticament via Let's Encrypt
6. Actualitza `PUBLIC_SITE_URL` a les variables per reflectir el domini final

### Migració des de Wix

Quan el domini apunti a Railway, la web Wix deixarà de ser accessible pel domini. La URL de Wix (`lifetimeweb.wixsite.com` o similar) continuarà funcionant si la vols mantenir com a backup.

Posa els **301 redirects** de les URL antigues que importen al nostre codi (ja tenim `legacyUrl` a `WEDDINGS` i `legacySlug` a `BLOG_POSTS`) → futura tasca si veiem caiguda de tràfic SEO.

---

## Pas 6 — Setup final a producció

Una vegada el domini funciona:

### Afegir el hash de la contrasenya admin
Si encara no ho has fet, localment:
```bash
node scripts/hash-password.mjs "ContrasenyaForta123!"
```
Copia el hash resultant i posa'l com a `ADMIN_PASSWORD_HASH` a Railway.

### Verificar les notificacions
- Crea un pressupost de prova a `/admin/new`
- Obre l'enllaç en una finestra incògnit
- Revisa el teu email: hauries de rebre `🔥 Primera obertura · <parella>`
- Si no arriba: revisa la pestanya **"Logs"** de Railway per errors

### Configurar un cron de neteja (opcional)

La neteja de pressupostos > 6 mesos ja es fa automàticament en cada arrencada del servidor. Si vols forçar-ho a una hora concreta, pots afegir un **Railway Cron Job** més endavant.

---

## Monitorització i manteniment

### Logs
Railway → servei → **"Logs"** → tots els `console.log` i `console.error` hi apareixen en temps real.

### Mètriques
Railway → servei → **"Metrics"** → CPU, memòria, xarxa. Pla gratuït: 512 MB RAM és suficient per aquest tràfic.

### Actualitzar el codi
Push a `main` → Railway desplega sol. Cap downtime (rolling deploy).

### Backup de la DB
El volum és persistent però **no es fa backup automàtic**. Si vols backup:
- Solució fàcil: script que copia `/data/quotes.db` a S3/Dropbox periòdicament
- O: exportar a SQL ocasionalment des de `/admin` (futura feature)

---

## Checklist final abans de lliurar al client

- [ ] `/` carrega en <2 s
- [ ] `/admin/login` funciona amb credencials correctes
- [ ] `/quiz` complet → genera pressupost → email rebut
- [ ] `/p/<token>` trackeja visites i temps
- [ ] Feed d'Instagram mostra imatges reals
- [ ] Vídeos de YouTube es carreguen
- [ ] Formulari de contacte (actualment placeholder `REPLACE_ME`) → configurar Web3Forms/Formspree **o** canviar a un endpoint propi
- [ ] Galeries de boda mostren les fotos reals
- [ ] Totes les pàgines legals enllaçades al footer
- [ ] HTTPS amb cert vàlid
- [ ] OG image es mostra bé en compartir l'URL a WhatsApp/xarxes

---

## Troubleshooting ràpid

| Símptoma | Causa probable |
|---|---|
| 502 Bad Gateway | App no escolta a `HOST=0.0.0.0` o port incorrecte |
| DB lock / llegeix pressupostos d'altres deploys | `DATABASE_URL` no apunta al volum `/data` |
| Login admin falla amb credencials correctes | `ADMIN_PASSWORD_HASH` mal copiat (caràcters `$` escapats pel shell) — posa-ho sense cometes a Railway |
| Emails no arriben | Domini no verificat a Resend, o `RESEND_API_KEY` expirat |
| Feed IG buit | Re-verifica `BEHOLD_FEED_ID` i que el compte IG segueixi connectat a Behold |

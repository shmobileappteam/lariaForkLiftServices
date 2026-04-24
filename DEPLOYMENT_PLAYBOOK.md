# Aria Forklift Services — Deployment Playbook

> **App:** Aria Forklift Mobile & Web Portal
> **Server:** `root@144.91.74.217` · **Port:** `9010`
> **Live URL:** https://demo.sourapps.com/aria-forklift/

---

## Step 1 — Local Configuration

Make sure the following are set before building.

### 1.1 `app.json` — Web Base URL

Ensure the `web` and `experiments` objects in your `app.json` match the production path:

```json
"web": {
  "bundler": "metro",
  "output": "static",
  "favicon": "./assets/images/favicon.png",
  "baseUrl": "/aria-forklift"
},
"experiments": {
  "typedRoutes": true,
  "reactCompiler": true,
  "baseUrl": "/aria-forklift"
}
```

### 1.2 `.gitignore`

Ensure these entries are present:

```
.metro-cache/
node_modules/
.expo/
dist/
```

### 1.3 `preview.html` 

Update branding to **Aria Forklift** and set the `iframe` src or references to match:

```
https://demo.sourapps.com/aria-forklift/
```

---

## Step 2 — VPS Deployment

SSH into the server and run the following:

```bash
# 1. Clone the repository
cd /var/www
git clone https://github.com/SH-Appace/AriaForklift.git
cd /var/www/AriaForklift

# 2. Install dependencies & build
npm install
npx expo export --platform web

# 3. Inject subpath routing patch
sed -i 's#</head>#<script>(function(){var b="/aria-forklift",p=location.pathname;if(p===b||p.startsWith(b+"/")){history.replaceState(null,"",p.slice(b.length)||"/")}})();</script></head>#' dist/index.html

# 4. Start with PM2 on port 9010
pm2 start "npx serve /var/www/AriaForklift/dist -p 9010 --single" --name aria-forklift
pm2 save
```

---

## Step 3 — Nginx Configuration

Edit: `nano /etc/nginx/sites-available/default`

Add the following **inside** the `server { ... }` block:

```nginx
# Aria Forklift Services
location /aria-forklift/ {
    proxy_pass         http://localhost:9010/;
    proxy_http_version 1.1;
    proxy_set_header   Host $host;
}

location = /aria-forklift/preview.html {
    alias /var/www/AriaForklift/preview.html;
}

# Aria Forklift — Asset Fallback
location @assets_aria_forklift {
    root       /var/www/AriaForklift/dist;
    try_files  $uri =404;
}

# Aria Forklift — Expo Bundle Fallback
location @expo_aria_forklift {
    root       /var/www/AriaForklift/dist;
    try_files  $uri =404;
}
```

### Apply Changes

```bash
nginx -t && systemctl restart nginx
```

---

## Step 4 — Verification

| Check            | URL                                                 |
| ---------------- | --------------------------------------------------- |
| 🟢 Live App      | https://demo.sourapps.com/aria-forklift/             |
| 📱 Preview Frame | https://demo.sourapps.com/aria-forklift/preview.html |

---

## Port Reference (Updated)

| App                  | Port     |
| -------------------- | -------- |
| UnStruck             | 9004     |
| HealingCompass       | 9005     |
| AATO1                | 9007     |
| Northeastern         | 9009     |
| **Aria Forklift**    | **9010** |

---

## Redeploy / Update

When pushing new changes, re-run on the server:

```bash
cd /var/www/AriaForklift
git pull
npm install
npx expo export --platform web
sed -i 's#</head>#<script>(function(){var b="/aria-forklift",p=location.pathname;if(p===b||p.startsWith(b+"/")){history.replaceState(null,"",p.slice(b.length)||"/")}})();</script></head>#' dist/index.html
pm2 restart aria-forklift
```

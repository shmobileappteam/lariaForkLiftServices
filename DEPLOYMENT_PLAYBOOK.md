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

Ensure this file exists in your root directory. It provides the "Elite Frame" experience.

---

## Step 2 — VPS Deployment

SSH into the server and run the following:

```bash
# 1. Navigate to web root
cd /var/www/lariaForkLiftServices

# 2. Pull latest changes
git pull

# 3. Install dependencies & build
npm install
npx expo export --platform web

# 4. Inject subpath routing patch (CRITICAL for subpath navigation)
sed -i 's#</head>#<script>(function(){var b="/aria-forklift",p=location.pathname;if(p===b||p.startsWith(b+"/")){history.replaceState(null,"",p.slice(b.length)||"/")}})();</script></head>#' dist/index.html

# 5. Start with PM2
pm2 delete aria-forklift || true
pm2 start "npx serve dist -p 9010 --single" --name aria-forklift
pm2 save
```

---

## Step 3 — Nginx Configuration

Edit: `nano /etc/nginx/sites-available/default`

Add these blocks **inside** your `server { ... }` block.

```nginx
# Aria Forklift Services - Main App
location /aria-forklift/ {
    proxy_pass         http://localhost:9010/;
    proxy_http_version 1.1;
    proxy_set_header   Host $host;
    proxy_set_header   X-Real-IP $remote_addr;
}

# Aria Forklift - Preview Frame
location = /aria-forklift/preview.html {
    alias /var/www/lariaForkLiftServices/preview.html;
    add_header Cache-Control "no-cache";
}

# Aria Forklift - Favicon Fix
location = /aria-forklift/favicon.ico {
    alias /var/www/lariaForkLiftServices/dist/favicon.ico;
}

# Aria Forklift — Asset Fallback (Important for deep linking)
location @assets_aria_forklift {
    root       /var/www/lariaForkLiftServices/dist;
    try_files  $uri =404;
}
```

### Apply Changes

```bash
nginx -t && systemctl restart nginx
```

---

## Step 4 — Verification

| Check            | URL                                                  |
| ---------------- | ---------------------------------------------------- |
| 🟢 Live App      | https://demo.sourapps.com/aria-forklift/             |
| 📱 Preview Frame | https://demo.sourapps.com/aria-forklift/preview.html |

---

## Troubleshooting (404 Not Found)

If you still see 404:

1.  **Missing File**: Verify the file exists on the server: `ls -l /var/www/lariaForkLiftServices/preview.html`
2.  **PM2 Port**: Verify the app is responding on 9010: `curl -I http://localhost:9010/`
3.  **Nginx Config**: Ensure you don't have another `location /` block that is intercepting the request before `/aria-forklift/`.

# Aiberm Docs Deployment Guide

This guide explains how to deploy the Astro documentation site to nginx.

## Quick Deploy

```bash
# Build and deploy in one command
./deploy.sh production
```

## Manual Deployment Steps

### 1. Build the site

```bash
npm run build
```

This creates a `dist/` directory with the static site.

### 2. Update nginx configuration

```bash
sudo cp ../aiberm.com.conf /etc/nginx/sites-available/aiberm.com
```

Note: The nginx config file is located in the project root directory (`/Users/wichna/Projects/aiberm.com/aiberm.com.conf`).

### 3. Create deployment directory

```bash
sudo mkdir -p /var/html/newapi/aiberm-docs
```

### 4. Copy built files

```bash
sudo cp -r dist /var/html/newapi/aiberm-docs/
```

### 5. Set proper permissions

```bash
sudo chown -R www-data:www-data /var/html/newapi/aiberm-docs
```

### 6. Test nginx configuration

```bash
sudo nginx -t
```

### 7. Reload nginx

```bash
sudo systemctl reload nginx
```

## Verify Deployment

Visit https://aiberm.com/docs to verify the deployment.

## Nginx Configuration

The nginx config includes:

- **Static file serving** from `/var/html/newapi/aiberm-docs/dist`
- **Gzip compression** for faster loading
- **Caching headers**:
  - HTML: 1 hour cache
  - Static assets (JS/CSS/images): 1 year cache
- **Security headers**
- **Client-side routing support** with `try_files`

## File Structure

```
/var/html/newapi/aiberm-docs/
└── dist/
    ├── docs/
    │   ├── en/
    │   │   ├── getting-started/
    │   │   ├── authentication/
    │   │   └── ...
    │   └── zh/
    │       ├── getting-started/
    │       └── ...
    ├── _astro/
    │   └── (compiled assets)
    └── aiberm-black.svg
```

## Troubleshooting

### 404 errors
- Check file permissions: `ls -la /var/html/newapi/aiberm-docs/dist`
- Verify nginx config: `sudo nginx -t`
- Check nginx error logs: `sudo tail -f /var/log/nginx/aiberm.com.error.log`

### CSS/JS not loading
- Check browser console for CORS errors
- Verify static asset paths in built files
- Check nginx access logs: `sudo tail -f /var/log/nginx/aiberm.com.access.log`

### Updates not showing
- Clear browser cache
- Check if files were copied: `ls -la /var/html/newapi/aiberm-docs/dist/docs/en/`
- Verify cache headers: `curl -I https://aiberm.com/docs/en/getting-started/`

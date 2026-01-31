#!/bin/bash
set -e

echo "🚀 Building Aiberm Docs..."

# Build the Astro site
npm run build

if [ "$1" = "production" ]; then
    echo "📦 Deploying to production..."
    
    # Create docs directory if it doesn't exist
    sudo mkdir -p /var/html/newapi/aiberm-docs
    
    # Copy built files
    sudo cp -r dist /var/html/newapi/aiberm-docs/
    
    # Set proper permissions
    sudo chown -R www-data:www-data /var/html/newapi/aiberm-docs
    
    # Copy nginx config
    sudo cp ../aiberm.com.conf /etc/nginx/sites-available/aiberm.com
    
    # Test nginx configuration
    sudo nginx -t
    
    # Reload nginx
    sudo systemctl reload nginx
    
    echo "✅ Deployment complete!"
    echo "🌐 Docs available at: https://aiberm.com/docs"
else
    echo "✅ Build complete!"
    echo ""
    echo "📦 To deploy to production, run:"
    echo "   ./deploy.sh production"
    echo ""
    echo "📝 Or deploy manually:"
    echo "1. Copy nginx config: sudo cp ../aiberm.com.conf /etc/nginx/sites-available/aiberm.com"
    echo "2. Create directory: sudo mkdir -p /var/html/newapi/aiberm-docs"
    echo "3. Copy files: sudo cp -r dist /var/html/newapi/aiberm-docs/"
    echo "4. Set permissions: sudo chown -R www-data:www-data /var/html/newapi/aiberm-docs"
    echo "5. Test nginx: sudo nginx -t"
    echo "6. Reload nginx: sudo systemctl reload nginx"
fi

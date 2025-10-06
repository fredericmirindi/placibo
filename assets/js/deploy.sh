#!/bin/bash

# =============================================================================
# Frédéric Mirindi Professional Website Deployment Script
# =============================================================================
# This script helps organize and prepare your website files for deployment
# Run this script in the directory containing all your website files
# =============================================================================

echo "🚀 Frédéric Mirindi Website Deployment Preparation"
echo "=================================================="
echo ""

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p assets/css
mkdir -p assets/js
mkdir -p images

# Move CSS files to assets/css
echo "🎨 Organizing CSS files..."
mv publications-showcase.css assets/css/ 2>/dev/null || echo "  ℹ️  publications-showcase.css already in place"
mv economic-widgets.css assets/css/ 2>/dev/null || echo "  ℹ️  economic-widgets.css already in place"
mv research-widgets.css assets/css/ 2>/dev/null || echo "  ℹ️  research-widgets.css already in place"
mv profile-icons-fix.css assets/css/ 2>/dev/null || echo "  ℹ️  profile-icons-fix.css already in place"
mv profile-links-white.css assets/css/ 2>/dev/null || echo "  ℹ️  profile-links-white.css already in place"
mv icon-visibility.css assets/css/ 2>/dev/null || echo "  ℹ️  icon-visibility.css already in place"
mv footer-icons-fix.css assets/css/ 2>/dev/null || echo "  ℹ️  footer-icons-fix.css already in place"

# Move JavaScript files to assets/js
echo "⚡ Organizing JavaScript files..."
mv publications-enhanced.js assets/js/ 2>/dev/null || echo "  ℹ️  publications-enhanced.js already in place"
mv research-widgets.js assets/js/ 2>/dev/null || echo "  ℹ️  research-widgets.js already in place"
mv research-widgets-expert.js assets/js/ 2>/dev/null || echo "  ℹ️  research-widgets-expert.js already in place"
mv economics-chatbot.js assets/js/ 2>/dev/null || echo "  ℹ️  economics-chatbot.js already in place"

# Move image files to images/
echo "🖼️  Organizing image files..."
mv linkedin-icon.svg images/ 2>/dev/null || echo "  ℹ️  linkedin-icon.svg already in place"
mv x-icon.svg images/ 2>/dev/null || echo "  ℹ️  x-icon.svg already in place"
mv researchgate-icon.svg images/ 2>/dev/null || echo "  ℹ️  researchgate-icon.svg already in place"
mv google-scholar-icon.svg images/ 2>/dev/null || echo "  ℹ️  google-scholar-icon.svg already in place"
mv orcid-icon.svg images/ 2>/dev/null || echo "  ℹ️  orcid-icon.svg already in place"

# Verify file structure
echo ""
echo "✅ File structure verification:"
echo "================================"

# Check for required HTML files
html_files=("index.html" "publications.html" "conferences.html" "research.html" "blog.html" "about.html" "contact.html")
for file in "${html_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file"
    else
        echo "❌ $file - MISSING"
    fi
done

# Check for main CSS and JS
if [ -f "style.css" ]; then
    echo "✓ style.css"
else
    echo "❌ style.css - MISSING"
fi

if [ -f "app.js" ]; then
    echo "✓ app.js"
else
    echo "❌ app.js - MISSING"
fi

# Check asset directories
if [ -d "assets/css" ]; then
    css_count=$(find assets/css -name "*.css" | wc -l)
    echo "✓ assets/css/ ($css_count CSS files)"
else
    echo "❌ assets/css/ directory - MISSING"
fi

if [ -d "assets/js" ]; then
    js_count=$(find assets/js -name "*.js" | wc -l)
    echo "✓ assets/js/ ($js_count JS files)"
else
    echo "❌ assets/js/ directory - MISSING"
fi

if [ -d "images" ]; then
    img_count=$(find images -name "*.svg" | wc -l)
    echo "✓ images/ ($img_count icon files)"
else
    echo "❌ images/ directory - MISSING"
fi

echo ""
echo "🔍 Pre-deployment checklist:"
echo "============================"
echo "□ Replace placeholder content with your actual information"
echo "□ Update social media profile URLs in all HTML files"
echo "□ Add your actual publications to publications-enhanced.js"
echo "□ Replace frederic.mirindi.jpg with your profile photo"
echo "□ Update contact information in contact.html"
echo "□ Test all pages in a local web server"
echo "□ Validate HTML and CSS"
echo ""

# Generate a simple local server command
echo "🌐 To test locally, run one of these commands:"
echo "=============================================="
echo "Python 3: python -m http.server 8000"
echo "Python 2: python -m SimpleHTTPServer 8000"
echo "Node.js:  npx serve ."
echo "PHP:      php -S localhost:8000"
echo ""
echo "Then open: http://localhost:8000"
echo ""

# Generate deployment instructions
echo "🚀 Deployment options:"
echo "====================="
echo ""
echo "GitHub Pages:"
echo "1. Create a new GitHub repository"
echo "2. Upload all files to the repository"
echo "3. Enable GitHub Pages in repository settings"
echo "4. Your site will be available at: https://yourusername.github.io/repository-name"
echo ""
echo "Netlify:"
echo "1. Visit https://netlify.com"
echo "2. Drag and drop your website folder to Netlify"
echo "3. Your site will be deployed instantly with a custom URL"
echo ""
echo "Vercel:"
echo "1. Visit https://vercel.com"
echo "2. Connect your GitHub repository"
echo "3. Automatic deployments on every commit"
echo ""

# Performance tips
echo "⚡ Performance tips:"
echo "==================="
echo "• Optimize images before uploading (compress JPEG/PNG files)"
echo "• Enable gzip compression on your server"
echo "• Use a Content Delivery Network (CDN)"
echo "• Set up browser caching headers"
echo "• Minify CSS and JavaScript for production"
echo ""

# Security reminders
echo "🔒 Security checklist:"
echo "======================"
echo "• Ensure HTTPS is enabled"
echo "• Add Content Security Policy headers"
echo "• Update contact forms to prevent spam"
echo "• Regular security updates"
echo "• Monitor for broken external links"
echo ""

# Final message
echo "✨ Your professional academic website is ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Customize content and styling to match your preferences"
echo "2. Test thoroughly on different devices and browsers"
echo "3. Deploy to your preferred hosting platform"
echo "4. Set up analytics and monitoring"
echo "5. Submit to search engines for indexing"
echo ""
echo "🎉 Good luck with your new professional website!"
echo "================================================="
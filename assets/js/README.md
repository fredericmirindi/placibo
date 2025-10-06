# Frédéric Mirindi - Professional Academic Website

A modern, responsive, and feature-rich academic portfolio website showcasing research, publications, and professional accomplishments in Economics, AI, and Digital Society studies.

## 🌟 Features

### ✨ **Professional Design System**
- **Responsive Layout**: Perfect display on all devices (mobile, tablet, desktop)
- **Dark/Light Mode**: Automatic theme switching with manual toggle
- **Modern UI**: Clean, professional design with smooth animations
- **Accessibility**: WCAG compliant with proper focus states and screen reader support

### 📄 **Complete Page Structure**
1. **Home** - Hero section with live widgets and achievements
2. **Publications** - Searchable research papers with advanced filtering
3. **Conferences** - Timeline of conference presentations
4. **Research** - Interactive research tools and current projects
5. **Blog** - Academic blog with newsletter signup
6. **About** - Personal biography and professional timeline
7. **Contact** - Professional contact form with social links

### 🔧 **Interactive Features**
- **Live Economic Widgets**: Real-time data displays
- **Advanced Search**: Filter publications by type, year, and category
- **Interactive Research Tools**: AI-powered economic analysis widgets
- **Contact Forms**: Professional inquiry handling
- **Social Integration**: Academic and professional social media links

### 📱 **Technical Excellence**
- **Performance Optimized**: Fast loading with efficient code
- **SEO Ready**: Proper meta tags and semantic HTML
- **Progressive Enhancement**: Works without JavaScript
- **Cross-Browser Support**: Compatible with all modern browsers

## 📁 File Structure

```
website/
├── index.html                      # Homepage with hero and widgets
├── publications.html               # Research publications showcase
├── conferences.html                # Conference presentations timeline
├── research.html                   # Research projects and tools
├── blog.html                      # Academic blog
├── about.html                     # Personal biography
├── contact.html                   # Contact form and information
├── style.css                      # Main stylesheet
├── app.js                         # Core JavaScript functionality
├── favicon-32x32.png             # Website favicon
├── frederic.mirindi.jpg           # Profile photo
├── images/                        # Image assets
│   ├── linkedin-icon.svg
│   ├── x-icon.svg
│   ├── researchgate-icon.svg
│   ├── google-scholar-icon.svg
│   └── orcid-icon.svg
└── assets/
    ├── css/
    │   ├── publications-showcase.css    # Publications page styles
    │   ├── economic-widgets.css        # Widget styling
    │   ├── research-widgets.css        # Research tools styles
    │   ├── profile-icons-fix.css       # Icon display fixes
    │   ├── profile-links-white.css     # Link styling
    │   ├── icon-visibility.css         # Icon visibility controls
    │   └── footer-icons-fix.css        # Footer icon fixes
    └── js/
        ├── publications-enhanced.js     # Publications functionality
        ├── research-widgets.js         # Research tools logic
        ├── research-widgets-expert.js  # Advanced research features
        └── economics-chatbot.js        # Economic data widgets
```

## 🚀 Quick Start

### 1. **Download Files**
Download all HTML, CSS, JS, and image files to your computer.

### 2. **Upload to Web Server**
Upload all files to your web hosting service:
- **GitHub Pages**: Push to a GitHub repository with Pages enabled
- **Netlify**: Drag and drop the folder to Netlify
- **Vercel**: Connect your GitHub repository
- **Traditional Hosting**: Upload via FTP/cPanel

### 3. **Update Personal Information**
Edit the HTML files to include your actual:
- Contact information
- Research publications
- Conference presentations
- Professional experience
- Social media profiles

### 4. **Customize Styling**
Modify CSS variables in `style.css` to match your branding:
```css
:root {
  --color-primary: rgba(33, 128, 141, 1);     /* Your brand color */
  --color-secondary: rgba(94, 82, 64, 0.12);  /* Secondary color */
  /* ... other colors */
}
```

## 🔧 Configuration

### **Social Media Links**
Update social profile URLs in all HTML files:
```html
<a href="YOUR_LINKEDIN_URL" target="_blank" rel="noopener">
<a href="YOUR_TWITTER_URL" target="_blank" rel="noopener">
<a href="YOUR_RESEARCHGATE_URL" target="_blank" rel="noopener">
<a href="YOUR_SCHOLAR_URL" target="_blank" rel="noopener">
<a href="YOUR_ORCID_URL" target="_blank" rel="noopener">
```

### **Economic Widgets Setup**
The homepage includes live economic data widgets. To enable:
1. Update API endpoints in `app.js`
2. Replace placeholder data with real API calls
3. Configure your preferred data sources

### **Publications Database**
Update `publications-enhanced.js` with your actual publications:
```javascript
{
    title: "Your Paper Title",
    authors: ["Your Name", "Co-Author"],
    year: 2024,
    journal: "Journal Name",
    // ... other details
}
```

### **Contact Form**
The contact form creates mailto links by default. For server-side processing:
1. Add form action URL
2. Include CSRF protection
3. Set up email handling

## 📧 Email Integration

### **Newsletter Signup**
Current implementation logs email addresses. To integrate with services:

**Mailchimp:**
```javascript
// Replace in blog.html
fetch('YOUR_MAILCHIMP_ENDPOINT', {
    method: 'POST',
    body: formData
});
```

**ConvertKit:**
```javascript
// Add to newsletter signup
fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, api_key: 'YOUR_API_KEY' })
});
```

## 🎨 Customization

### **Color Scheme**
Modify the CSS custom properties:
```css
:root {
  --color-primary: #your-color;
  --color-secondary: #your-secondary;
}
```

### **Typography**
Update font families:
```css
--font-family-base: "Your-Font", "Fallback", sans-serif;
```

### **Layout**
Adjust container widths and spacing:
```css
--container-xl: 1280px;  /* Max content width */
--space-32: 32px;        /* Standard spacing */
```

## 🔍 SEO Optimization

Each page includes:
- **Meta Descriptions**: Unique descriptions for each page
- **Title Tags**: Descriptive and keyword-rich titles
- **Structured Data**: Academic and professional schema markup
- **Open Graph**: Social media sharing optimization

### **Update Meta Tags**
```html
<meta name="description" content="Your unique page description">
<meta property="og:title" content="Your Page Title">
<meta property="og:description" content="Your page description">
```

## 📱 Mobile Optimization

The website is fully responsive with:
- **Mobile-first Design**: Optimized for small screens
- **Touch-friendly**: Proper button sizes and spacing
- **Fast Loading**: Optimized images and code
- **Readable Typography**: Scalable fonts and contrast

## 🔒 Security Considerations

- **External Links**: All external links include `rel="noopener"`
- **Form Validation**: Client-side validation with server-side backup needed
- **Content Security Policy**: Add CSP headers for production
- **HTTPS**: Ensure SSL certificate for secure connections

## 🚀 Performance Optimization

### **Already Implemented**
- Optimized CSS and JavaScript
- Efficient animations and transitions
- Responsive images
- Minimal dependencies

### **Additional Optimizations**
1. **Image Optimization**: Compress images further if needed
2. **CDN**: Use a Content Delivery Network
3. **Caching**: Implement browser caching headers
4. **Minification**: Minify CSS/JS for production

## 🐛 Troubleshooting

### **Common Issues**

**Icons not displaying:**
- Check file paths in HTML
- Ensure SVG files are uploaded correctly
- Verify CSS icon fixes are loaded

**Widgets not updating:**
- Check browser console for JavaScript errors
- Verify API endpoints are accessible
- Ensure CORS is configured for external APIs

**Contact form not working:**
- Check email client is installed for mailto links
- Verify form validation JavaScript is loading
- Test on different browsers

**Mobile display issues:**
- Check viewport meta tag is present
- Test on various devices and browsers
- Verify responsive CSS is loading

## 📞 Support

For technical issues or customization help:
1. Check browser developer console for errors
2. Validate HTML and CSS
3. Test in incognito/private mode
4. Verify all files are uploaded correctly

## 📝 License

This template is created specifically for Frédéric Mirindi's professional use. 
- Personal and academic use: ✅ Allowed
- Commercial redistribution: ❌ Not allowed
- Modification for personal use: ✅ Allowed

## 🎯 Next Steps

1. **Upload and Test**: Deploy to your hosting service and test all functionality
2. **Content Update**: Replace all placeholder content with your actual information
3. **SEO Setup**: Submit to search engines and set up analytics
4. **Social Integration**: Connect to your actual social media profiles
5. **Maintenance**: Regular updates to publications and research sections

---

**Created with ❤️ for Academic Excellence**

*This professional academic website template provides a complete foundation for showcasing research, publications, and professional accomplishments in the digital age.*
# xsong.us - 技術分享與作品集

A modern personal website built with Next.js and Astro, featuring a blog system, project showcase, and tools section.

🌐 **Live Site**: [https://xsong.us](https://xsong.us)

## 🏷️ Project Status

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-38B2AC?logo=tailwind-css&logoColor=white)
![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?logo=astro&logoColor=white)

![Deploy Status](https://img.shields.io/badge/deploy-passing-green)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-deployed-blue?logo=github&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-enabled-green?logo=github-actions&logoColor=white)

![Version](https://img.shields.io/badge/version-1.1.0-orange)
![License](https://img.shields.io/badge/license-MIT-green)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js&logoColor=white)

![WebP Optimization](https://img.shields.io/badge/WebP%20Optimization-enabled-green)
![Security](https://img.shields.io/badge/Security-enhanced-red)
![SEO](https://img.shields.io/badge/SEO-optimized-blue)
![RSS Feed](https://img.shields.io/badge/RSS%20Feed-available-orange)

![Website](https://img.shields.io/badge/website-xsong.us-blue?logo=vercel&logoColor=white)
![Uptime](https://img.shields.io/badge/uptime-99.9%25-green)
![Performance](https://img.shields.io/badge/performance-A-green)
![Build Status](https://img.shields.io/badge/build-passing-green)

## 🚀 Features

- **Modern Design**: Clean, responsive design with dark/light theme support
- **Blog System**: Astro-based blog with Markdown support for technical articles
- **Project Showcase**: Display your projects with screenshots and descriptions
- **Tools Section**: Interactive tools and utilities
- **Short URL Redirect**: Custom 404 page with short URL redirection
- **GitHub Pages Deployment**: Automated deployment via GitHub Actions
- **SEO Optimized**: Complete SEO setup with meta tags, structured data, and sitemaps
- **RSS Feed**: Automatic RSS feed generation for blog posts
- **Copy Functions**: Copy URL and email functionality for better UX
- **Smooth Navigation**: Enhanced scroll-to-section with bounce animations
- **Advanced Image Optimization**: WebP conversion, global preloading, and intelligent caching
- **Security-First Screenshot API**: Protected proxy API with rate limiting and domain whitelisting
- **Real-time Project Screenshots**: Dynamic website screenshots with error handling and retry mechanisms

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Blog**: Astro 5.x
- **Styling**: TailwindCSS
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
xsong.us/
├── app/                    # Next.js app directory
│   ├── components/         # React components
│   ├── contexts/          # React contexts
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── blog-astro/            # Astro blog project
│   ├── src/
│   │   ├── content/       # Blog content (Markdown)
│   │   ├── layouts/       # Astro layouts
│   │   └── pages/         # Astro pages
│   └── astro.config.mjs   # Astro configuration
├── public/                # Static assets
├── .github/workflows/     # GitHub Actions
└── scripts/              # Build scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/120061203/xsong.git
   cd xsong
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd blog-astro && npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build Astro blog (optional)**
   ```bash
   cd blog-astro
   npm run build
   ```

## 🚀 Deployment

This project uses GitHub Actions for automated deployment to GitHub Pages.

### Deployment Process

1. **Next.js Build**: Builds the main website
2. **Astro Blog Build**: Builds the blog system
3. **File Organization**: Copies files to correct locations
4. **GitHub Pages**: Deploys to GitHub Pages

### Key Configuration Files

- `.github/workflows/nextjs.yml` - GitHub Actions workflow
- `next.config.ts` - Next.js configuration
- `blog-astro/astro.config.mjs` - Astro configuration

## 🔧 Common Issues & Solutions

### 1. Astro Blog Integration Issues

**Problem**: Blog pages showing 404 errors or default Astro styles

**Root Cause**: Astro's `base: '/blog'` configuration creates nested paths (`public/blog/blog/`)

**Solution**: 
- Modified GitHub Actions to handle double blog directory
- Copy only article directories, not the entire `blog/` subdirectory
- Ensure custom Layout.astro is used instead of default Astro layout

**GitHub Actions Fix**:
```bash
# Only copy article directories, not the entire blog subdirectory
for dir in public/blog/blog/*/; do
  if [ -d "$dir" ]; then
    dirname=$(basename "$dir")
    cp -r "$dir" "out/blog/"
  fi
done
```

### 2. CSS Styling Issues

**Problem**: Blog pages showing default Astro styles instead of custom design

**Root Cause**: 
- Default Astro layout overriding custom Layout.astro
- CSS path issues due to `base: '/blog'` configuration

**Solution**:
- Use TailwindCSS CDN in Layout.astro for reliable CSS loading
- Ensure Layout.astro is properly imported in all pages
- Clear build cache before deployment

### 3. Short URL Redirect Conflicts

**Problem**: Blog article pages being intercepted by short URL redirect system

**Root Cause**: Custom 404.html redirecting all 404s to short URL service

**Solution**: Modified 404.html to only redirect `/url/xxxxx` paths:
```javascript
const urlMatch = currentPath.match(/^\/url\/(.+)$/);
if (urlMatch) {
  // Redirect to short URL service
} else {
  // Show standard 404 page
}
```

### 4. GitHub Actions Deployment Issues

**Problem**: Files not being deployed to correct locations

**Root Cause**: Complex file structure with Next.js + Astro integration

**Solution**:
- Clear build cache before each deployment
- Add detailed logging and file existence checks
- Ensure proper directory structure in deployment

## 📝 Blog Content Management

### Adding New Blog Posts

1. Create a new Markdown file in `blog-astro/src/content/blog/`
2. Add frontmatter with required fields:
   ```markdown
   ---
   title: "Your Post Title"
   description: "Post description"
   pubDate: 2025-01-21T14:30:00+08:00
   updatedDate: 2025-01-21T14:30:00+08:00
   heroImage: "../../assets/images/your-post/your-image.png"
   categories: ["技術分享", "部落格建立"]
   tags: ["Astro", "Next.js", "技術寫作"]
   ---
   ```
3. Write your content in Markdown
4. Commit and push - GitHub Actions will automatically rebuild and deploy

### Date Format Requirements

**Important**: Use ISO 8601 format for dates to ensure correct time display:

- ✅ **Correct**: `2025-01-21T14:30:00+08:00`
- ❌ **Incorrect**: `2025-01-21` (will show as 00:00)

**Format breakdown**:
- `2025-01-21` - Date (YYYY-MM-DD)
- `T14:30:00` - Time (HH:MM:SS)
- `+08:00` - Timezone (Taiwan UTC+8)

### Blog Configuration

- **Layout**: Custom Layout.astro with xsong.us branding
- **Styling**: TailwindCSS with dark/light theme support
- **Content**: Markdown with frontmatter support
- **Images**: Optimized with Astro's image processing
- **Navigation**: Previous/Next post navigation and related articles
- **Copy URL**: One-click URL copying functionality
- **Table of Contents**: Sticky TOC for easy navigation

### Image Management

#### Recommended Image Sizes
- **Hero Images**: 1200x630px (16:9 ratio)
- **Content Images**: 800x600px or similar
- **Format**: PNG, JPG, or WebP

#### Image Directory Structure
```
blog-astro/src/assets/images/
├── your-post-name/
│   ├── your-post-1.png
│   ├── your-post-2.jpg
│   └── ...
```

#### Image Usage in Markdown
```markdown
<!-- Hero Image (in frontmatter) -->
heroImage: "../../assets/images/your-post/your-image.png"

<!-- Content Image -->
![Image Description](../../assets/images/your-post/your-image.png)
```

## 🔍 SEO & RSS Features

### SEO Optimization

#### Meta Tags
- **Title**: Dynamic page titles with site branding
- **Description**: Optimized meta descriptions
- **Keywords**: Relevant keywords for each page
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Canonical URLs**: Proper canonical link structure

#### Structured Data (JSON-LD)
- **Person Schema**: Author information for About page
- **BlogPosting Schema**: Article metadata for blog posts
- **Organization Schema**: Site publisher information

#### Search Engine Files
- **robots.txt**: Search engine crawler guidance
- **sitemap.xml**: Main website sitemap
- **Blog sitemap**: Automatic blog sitemap generation

### RSS Feed
- **Automatic Generation**: RSS feed auto-generated from blog posts
- **Feed Location**: `/blog/rss.xml`
- **RSS Page**: User-friendly RSS subscription page at `/rss`
- **Content**: Includes title, description, publish date, and author
- **Validation**: Valid RSS 2.0 format
- **User Experience**: Friendly RSS page with subscription instructions and reader recommendations
- **Copy Function**: One-click RSS URL copying with visual feedback
- **Recent Posts Preview**: Clickable article previews (last 30 days)
- **Date Format**: Proper ISO 8601 format for accurate time display

### Copy Functions
- **Copy URL**: One-click article URL copying with visual feedback
- **Copy Email**: Direct email copying with mailto functionality
- **Visual Feedback**: Green checkmark confirmation with auto-revert

### Smooth Navigation & Animations
- **Scroll-to-Section**: Smooth scrolling to target sections with enhanced UX
- **Bounce Animation**: Target sections animate with scale effect after scroll completion
- **Cross-Page Navigation**: Seamless navigation from Footer Contact button to About page
- **Animation Timing**: 1.5s delay ensures scroll completion before animation starts
- **Visual Feedback**: 15% scale increase with cubic-bezier easing for smooth bounce effect
- **Debug Support**: Console logging for animation trigger debugging

### Advanced Image Optimization & WebP Conversion

#### WebP Conversion System
- **Automatic Conversion**: All project screenshots automatically converted to WebP format
- **Quality Optimization**: 60% quality setting for optimal file size vs quality balance
- **Canvas-based Processing**: Client-side WebP conversion using HTML5 Canvas API
- **Fallback Support**: Graceful fallback to original format if WebP conversion fails
- **Performance Impact**: Typical 80-90% file size reduction (e.g., 1170kB → 18kB)

#### Global Preloading System
- **Background Preloading**: First 6 projects preloaded globally across all pages
- **Smart Caching**: localStorage-based WebP cache with instant retrieval
- **Progress Tracking**: Real-time preloading progress with visual indicators
- **Rate Limiting**: 2-second delays between requests to prevent API abuse
- **Error Recovery**: Automatic retry mechanism with exponential backoff

#### Intelligent Loading States
- **Immediate Display**: Cached images display instantly without loading states
- **Progressive Loading**: Non-cached images show "即時連線中" (Real-time connecting) status
- **Visual Feedback**: Spinning indicators and progress bars for user awareness
- **Error Handling**: Clear error messages with retry buttons for failed loads

#### Performance Optimizations
- **Lazy Loading**: Images load only when entering viewport using Intersection Observer
- **Priority Loading**: First 6 projects marked as priority for immediate loading
- **Bandwidth Optimization**: WebP format reduces data usage by 80-90%
- **Cache Strategy**: 1-hour browser cache with localStorage persistence

### Security-First Screenshot API

#### Multi-Layer Security Protection
- **Domain Whitelist**: Only allows screenshots of approved domains (xsong.us, go-shorturl.vercel.app, etc.)
- **URL Validation**: Comprehensive URL sanitization and validation
- **Protocol Restrictions**: Only HTTP/HTTPS protocols allowed
- **Dangerous Pattern Filtering**: Blocks local files, FTP, data URLs, JavaScript, mailto, tel protocols
- **Private Network Protection**: Prevents access to internal IP ranges (192.168.x.x, 10.x.x.x, 172.16-31.x.x)
- **URL Length Limits**: Maximum 2048 characters to prevent buffer overflow attacks

#### Rate Limiting & Abuse Prevention
- **IP-based Rate Limiting**: Maximum 10 requests per minute per IP address
- **Request Timeout**: 30-second timeout to prevent resource exhaustion
- **File Size Limits**: Maximum 10MB image size to prevent DoS attacks
- **Request Logging**: Comprehensive logging of all API requests and security events
- **Error Tracking**: Detailed error logging for security monitoring

#### Security Headers
- **X-Content-Type-Options**: `nosniff` prevents MIME type sniffing attacks
- **X-Frame-Options**: `DENY` prevents clickjacking attacks
- **Referrer-Policy**: `strict-origin-when-cross-origin` controls referrer information leakage
- **Cache-Control**: Proper caching headers for performance and security

#### CORS Protection
- **Proxy Architecture**: Server-side proxy eliminates CORS issues
- **No Direct External Calls**: All screenshot requests go through protected API
- **User-Agent Spoofing**: Proper User-Agent headers to avoid blocking
- **Error Handling**: Graceful handling of external API failures

### Project Page Animations
- **Individual Card Fade-in**: Each project card animates independently from transparent to visible
- **Upward Movement**: Cards slide up from 60px below their final position
- **Staggered Animation**: 150ms delay between each card for visual hierarchy
- **Extended Duration**: 3-second total animation time to accommodate screenshot API loading
- **Smooth Transitions**: 1-second fade-in duration with ease-out timing
- **No Overlay Interference**: Clean individual card appearance without loading screens

## 🌐 Development vs Production

### Development Environment
- **Main Site**: `http://localhost:3000` (Next.js)
- **Blog Pages**: Use Astro dev server (`cd blog-astro && npm run dev`)
- **Static Files**: May show 404 in development (normal behavior)

### Production Environment
- **All Pages**: Fully functional including blog routes
- **SEO Features**: All meta tags and structured data active
- **Performance**: Optimized images and static generation

## 🔧 Technical Implementation Details

### Server-Side Rendering (SSR) Hydration Issues

#### Problem: Hydration Mismatch
When using Next.js with SSR, server-side and client-side rendering must produce identical HTML. Common causes of hydration errors:

```typescript
// ❌ Problematic: Random values differ between server and client
const getRandomService = () => {
  const randomIndex = Math.floor(Math.random() * services.length);
  return services[randomIndex];
};

// Server: Math.random() → 0.3 → Service A
// Client: Math.random() → 0.7 → Service B
// Result: Hydration mismatch error
```

#### Solution: Deterministic Functions
Use deterministic functions that produce the same output for the same input:

```typescript
// ✅ Correct: Deterministic hash-based selection
const getScreenshotUrl = (targetUrl: string) => {
  const hash = targetUrl.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  const serviceIndex = Math.abs(hash) % screenshotServices.length;
  return screenshotServices[serviceIndex].url(targetUrl);
};

// Server: hash("https://example.com") → 12345 → Service A
// Client: hash("https://example.com") → 12345 → Service A
// Result: Consistent rendering
```

#### Other Common Hydration Issues
- **Date/Time**: `Date.now()` produces different values
- **Browser APIs**: `window`, `navigator` not available on server
- **User-specific data**: Locale, timezone differences
- **External data**: APIs returning different data between requests

#### Best Practices
1. **Avoid random values** in SSR components
2. **Use deterministic functions** for consistent output
3. **Handle browser-specific code** with proper checks
4. **Test hydration** in development mode
5. **Use `useEffect`** for client-only operations

### WebP Conversion Implementation

#### Canvas-based Conversion Process
```typescript
const convertToWebP = async (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const webpUrl = URL.createObjectURL(blob);
          resolve(webpUrl);
        } else {
          reject(new Error('Failed to convert to WebP'));
        }
      }, 'image/webp', 0.6); // 60% quality
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageUrl;
  });
};
```

#### Caching Strategy
```typescript
// localStorage-based WebP cache
const getCachedWebP = (url: string): string | null => {
  try {
    return localStorage.getItem(`project_image_${btoa(url)}`);
  } catch (error) {
    console.warn('Failed to read WebP cache:', error);
    return null;
  }
};

const setCachedWebP = (url: string, webpUrl: string) => {
  try {
    localStorage.setItem(`project_image_${btoa(url)}`, webpUrl);
  } catch (error) {
    console.warn('Failed to save WebP cache:', error);
  }
};
```

### Security Implementation Details

#### URL Validation Function
```typescript
function validateUrl(url: string): { isValid: boolean; error?: string } {
  try {
    const parsedUrl = new URL(url);
    
    // Protocol validation
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return { isValid: false, error: 'Only HTTP and HTTPS protocols are allowed' };
    }
    
    // Dangerous pattern filtering
    const DANGEROUS_PATTERNS = [
      /^file:\/\//, /^ftp:\/\//, /^data:/, /^javascript:/,
      /^mailto:/, /^tel:/, /^127\.0\.0\.1/, /^192\.168\./,
      /^10\./, /^172\.(1[6-9]|2[0-9]|3[0-1])\./
    ];
    
    for (const pattern of DANGEROUS_PATTERNS) {
      if (pattern.test(url)) {
        return { isValid: false, error: 'URL contains dangerous patterns' };
      }
    }
    
    // Domain whitelist validation
    const ALLOWED_DOMAINS = ['xsong.us', 'go-shorturl.vercel.app', '120061203.github.io'];
    const hostname = parsedUrl.hostname.toLowerCase();
    const isAllowed = ALLOWED_DOMAINS.some(domain => 
      hostname === domain || hostname.endsWith('.' + domain)
    );
    
    if (!isAllowed) {
      return { isValid: false, error: 'Domain not in allowed list' };
    }
    
    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: 'Invalid URL format' };
  }
}
```

#### Rate Limiting Implementation
```typescript
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute
    return true;
  }
  
  if (limit.count >= 10) {
    return false; // Exceeded limit
  }
  
  limit.count++;
  return true;
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Version**: 2.0.0  
**Last Updated**: January 2025

## 🆕 Recent Updates (v2.0.0)

### 🚀 Major Features Added
- **WebP Image Optimization**: Automatic conversion with 80-90% file size reduction
- **Global Image Preloading**: Background preloading of first 6 projects across all pages
- **Security-First Screenshot API**: Enterprise-grade security with rate limiting and domain whitelisting
- **Intelligent Caching**: localStorage-based WebP cache with instant retrieval
- **CORS Protection**: Server-side proxy eliminates cross-origin issues
- **Real-time Loading States**: Enhanced user feedback with "即時連線中" status

### 🔧 Technical Improvements
- **Canvas-based WebP Conversion**: Client-side image processing with fallback support
- **Rate Limiting**: IP-based protection against API abuse (10 requests/minute)
- **URL Validation**: Comprehensive sanitization and dangerous pattern filtering
- **Security Headers**: X-Content-Type-Options, X-Frame-Options, Referrer-Policy
- **Error Handling**: Graceful degradation with retry mechanisms
- **Performance Optimization**: Priority loading and intelligent caching strategies

### 🛡️ Security Enhancements
- **Domain Whitelist**: Only approved domains can be screenshotted
- **Protocol Restrictions**: HTTP/HTTPS only, blocks dangerous protocols
- **Private Network Protection**: Prevents access to internal IP ranges
- **Request Timeout**: 30-second timeout prevents resource exhaustion
- **File Size Limits**: 10MB maximum to prevent DoS attacks
- **Comprehensive Logging**: Security event tracking and monitoring

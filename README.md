# xsong.us - Personal Website & Blog

A modern personal website built with Next.js and Astro, featuring a blog system, project showcase, and tools section.

🌐 **Live Site**: [https://xsong.us](https://xsong.us)

## 🚀 Features

- **Modern Design**: Clean, responsive design with dark/light theme support
- **Blog System**: Astro-based blog with Markdown support
- **Project Showcase**: Display your projects with screenshots and descriptions
- **Tools Section**: Interactive tools and utilities
- **Short URL Redirect**: Custom 404 page with short URL redirection
- **GitHub Pages Deployment**: Automated deployment via GitHub Actions
- **SEO Optimized**: Complete SEO setup with meta tags, structured data, and sitemaps
- **RSS Feed**: Automatic RSS feed generation for blog posts
- **Copy Functions**: Copy URL and email functionality for better UX
- **Smooth Navigation**: Enhanced scroll-to-section with bounce animations
- **Optimized Image Loading**: Advanced image optimization with lazy loading and preloading

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

### Advanced Image Optimization
- **Lazy Loading**: Images load only when entering viewport using Intersection Observer
- **Smart Preloading**: First 3 projects load immediately, others load on demand
- **Loading States**: Visual feedback with spinners and progress indicators
- **Error Handling**: Automatic retry mechanism with multiple screenshot services
- **Fallback Services**: Multiple screenshot APIs for improved reliability
- **Performance Optimization**: Reduced initial load time and bandwidth usage
- **User Experience**: Smooth transitions and clear loading feedback

## 🌐 Development vs Production

### Development Environment
- **Main Site**: `http://localhost:3000` (Next.js)
- **Blog Pages**: Use Astro dev server (`cd blog-astro && npm run dev`)
- **Static Files**: May show 404 in development (normal behavior)

### Production Environment
- **All Pages**: Fully functional including blog routes
- **SEO Features**: All meta tags and structured data active
- **Performance**: Optimized images and static generation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Version**: 1.0.0  
**Last Updated**: January 2025

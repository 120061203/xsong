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
   pubDate: 2025-01-21
   ---
   ```
3. Write your content in Markdown
4. Commit and push - GitHub Actions will automatically rebuild and deploy

### Blog Configuration

- **Layout**: Custom Layout.astro with xsong.us branding
- **Styling**: TailwindCSS with dark/light theme support
- **Content**: Markdown with frontmatter support
- **Images**: Optimized with Astro's image processing

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

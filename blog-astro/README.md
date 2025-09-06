# Astro Starter Kit: Blog

```sh
npm create astro@latest -- --template blog
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

## 📸 Image Management

### Where to Place Images

**For blog post images, place them in:**
```
src/assets/images/[post-slug]/
```

**Example:**
```
src/assets/images/work-one-month-reflection/
├── work-one-month-reflection-1.png
├── work-one-month-reflection-2.jpg
└── ...
```

### How to Use Images

**In Markdown files (blog posts):**
```markdown
![Image description](../../assets/images/work-one-month-reflection/image-name.png)
```

**In frontmatter (heroImage):**
```yaml
---
title: "My Post"
heroImage: "../../assets/images/work-one-month-reflection/hero-image.png"
---
```

### Recommended Image Sizes

**For HeroImage (article cover):**
- **Size**: `1200 x 750px` (16:10 aspect ratio)
- **Usage**: Homepage list display, article page header
- **Format**: PNG or JPG
- **File size**: Recommended < 2MB

**For content images:**
- **Size**: `800 x 600px` (4:3 ratio) or `800 x 450px` (16:9 ratio)
- **Usage**: Images within article content
- **Format**: PNG or JPG
- **File size**: Recommended < 1MB

### Image Optimization

- ✅ **Automatic optimization**: Images are automatically converted to WebP format
- ✅ **Size reduction**: Typical 95%+ compression (e.g., 1170kB → 18kB)
- ✅ **Responsive images**: Multiple sizes generated automatically with `experimentalLayout: 'responsive'`
- ✅ **Lazy loading**: Images load only when needed
- ✅ **SEO friendly**: Optimized for search engines
- ✅ **Device adaptation**: Automatically selects best image size for each device

### Why These Sizes?

**16:10 ratio (1200x750) benefits:**
- ✅ **Matches homepage display** - Consistent with our `width={400} height={250}` ratio
- ✅ **Modern screen friendly** - 16:10 is a common screen ratio
- ✅ **Good visual effect** - Not too wide or too tall

**4:3 or 16:9 ratio (800x600/800x450) benefits:**
- ✅ **Suitable for content** - Doesn't take up too much vertical space
- ✅ **Good reading experience** - Appropriate size that doesn't interrupt reading flow
- ✅ **Responsive friendly** - Displays well on different screen sizes

### Automatic Base Path Detection

The project automatically adjusts the base path based on the environment:

**Development Environment:**
- Base path: `/` (root)
- Access URLs: `http://localhost:4321/work-one-month-reflection/`

**Production Environment:**
- Base path: `/blog`
- Access URLs: `https://xsong.us/blog/work-one-month-reflection/`

**Configuration:**
```javascript
// astro.config.mjs
export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? '/' : '/blog',
  // ... other config
});
```

This ensures seamless development experience while maintaining correct production URLs.

### Static Assets

For other static assets (favicon, etc.), place them in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).

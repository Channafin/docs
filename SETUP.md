# Documentation Setup Guide

This guide will help you get your Mintlify documentation up and running both locally and in the cloud.

## Quick Start (2 Options)

### Option 1: Local Development (For Editing & Testing)

Run the documentation site on your local machine with live preview:

```bash
# Clone the repository (if you haven't already)
git clone https://github.com/Channafin/docs.git
cd docs

# Start the development server
npx mint dev
```

Then open **http://localhost:3000** in your browser!

**What you get:**
- Live preview as you edit
- Instant feedback on changes
- Full interactive documentation
- Works offline

**Security note:** Using `npx` is safe - it downloads the package temporarily without global installation.

---

### Option 2: Mintlify Cloud (For Production Hosting)

Deploy your documentation to Mintlify's hosting platform:

**Step 1: Connect to Mintlify**
1. Go to [Mintlify Dashboard](https://dashboard.mintlify.com)
2. Sign in with your GitHub account
3. Click "New Project" or "Add Repository"
4. Select your repository: `Channafin/docs`

**Step 2: Deploy**
- Mintlify automatically detects your `docs.json` configuration
- Your docs will be deployed to a URL like: `https://your-project.mintlify.app`
- Every push to GitHub automatically redeploys!

**What you get:**
- Professional hosting
- Automatic deployments from GitHub
- SSL certificates
- CDN delivery
- No server management

---

## Recommended Workflow

Use **both** approaches for the best experience:

1. **Edit locally:**
   - Make changes to `.mdx` files
   - Run `npx mint dev` to preview
   - Test everything looks good

2. **Deploy to cloud:**
   - Commit your changes: `git add . && git commit -m "Update docs"`
   - Push to GitHub: `git push`
   - Mintlify auto-deploys in ~30 seconds

---

## Project Structure

```
docs/
├── docs.json              # Mintlify configuration
├── index.mdx              # Homepage
├── quickstart.mdx         # Getting started guide
├── development.mdx        # Development guide
├── essentials/            # Writing & customization guides
├── api-reference/         # API documentation
├── images/                # Static assets
└── logo/                  # Brand assets
```

---

## Editing Documentation

All documentation files are in MDX format (Markdown + React components).

**Edit any `.mdx` file:**
```mdx
---
title: "Page Title"
description: "Page description"
---

## Heading

Your content here with **markdown** formatting.

<Card title="Interactive Component" icon="rocket">
  Mintlify provides special components!
</Card>
```

**Common components:**
- `<Card>` - Feature cards
- `<CodeGroup>` - Code examples in multiple languages
- `<Tabs>` - Tabbed content
- `<Accordion>` - Collapsible sections

See [Mintlify Components](https://mintlify.com/docs/content/components) for full list.

---

## Troubleshooting

### Local dev server won't start
```bash
# Try updating to latest version
npx mint@latest dev

# Or install globally (if npx doesn't work)
npm install -g mint
mint dev
```

### Changes not showing on cloud
- Check GitHub push succeeded: `git status`
- View deployment logs in Mintlify dashboard
- Mintlify deploys from the main branch by default

### Port 3000 already in use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npx mint dev --port 3001
```

---

## Next Steps

1. **Start local development:**
   ```bash
   npx mint dev
   ```

2. **Set up cloud hosting:**
   Visit [dashboard.mintlify.com](https://dashboard.mintlify.com)

3. **Customize your docs:**
   - Edit `docs.json` for branding and navigation
   - Modify `.mdx` files for content
   - Add images to `/images` folder

4. **Learn more:**
   - [Mintlify Documentation](https://mintlify.com/docs)
   - [MDX Syntax Guide](https://mdxjs.com/)
   - [Mintlify Community](https://mintlify.com/community)

---

## Support

- **Mintlify Docs:** https://mintlify.com/docs
- **Community:** https://mintlify.com/community
- **Issues:** Create an issue in this repository

Happy documenting!

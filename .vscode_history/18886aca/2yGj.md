# Abu Rahat Sabir - Executive Admin & Workflow Automation Portfolio

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS.

## Quick Start

### Option 1: Using the Batch Script (Windows)
Simply double-click `start-dev.bat` - it will automatically install dependencies and start the dev server.

### Option 2: Manual Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Then open http://localhost:3000 in your browser
```

### Option 3: Standalone HTML (No Server Needed)
If you just want to view the site without running a dev server:
- Open `index-standalone.html` directly in your browser
- This is a simplified version without the full React app

## Build for Production

```bash
npm run build
```

This creates a production-ready build in the `dist/` folder.

## Project Structure

```
├── index.html              # Main HTML entry point
├── index-standalone.html   # Standalone version (no dev server needed)
├── index.tsx              # React root component
├── App.tsx                # Main app component with routing
├── vite.config.ts         # Vite configuration
├── components/            # React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Work.tsx
│   └── ... (other components)
├── constants.tsx          # App data and content
├── types.ts              # TypeScript types
└── public/               # Static assets

```

## Key Features

- ✅ Modern React 19 with TypeScript
- ✅ Fast Vite dev server
- ✅ Tailwind CSS for styling
- ✅ Framer Motion animations
- ✅ Hash-based routing (no server required for GitHub Pages)
- ✅ Error boundaries for graceful error handling
- ✅ Responsive design

## Technologies Used

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tool**: Vite 6
- **Animations**: Framer Motion
- **Charts**: Recharts
- **AI Integration**: Google Generative AI (Gemini)

## Troubleshooting

### Page is blank/won't load
1. Make sure you've installed dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Open http://localhost:3000

### Port 3000 already in use
Edit `vite.config.ts` and change the port:
```typescript
server: {
  port: 3001,  // Change to any available port
  host: '0.0.0.0',
}
```

### Missing environment variables
Create a `.env.local` file:
```
GEMINI_API_KEY=your_actual_api_key_here
```

## Deployment

The site is optimized for GitHub Pages or any static hosting:

```bash
# Build production version
npm run build

# Deploy the dist/ folder to GitHub Pages
```

## Support

For questions or issues, refer to the documentation files:
- `BLANK_PAGE_FIX.md` - Technical details on blank page fixes
- `IMPLEMENTATION_COMPLETE.md` - Implementation summary

---

**Created by Abu Rahat Sabir**
Executive Administrator & Workflow Automation Specialist

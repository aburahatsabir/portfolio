# ROOT CAUSE ANALYSIS: Blank Page Issue

## The Problem
The page is blank because **the Vite development server is not running**. 

When you open `localhost:3000`, the browser tries to connect but gets "ERR_CONNECTION_REFUSED" because nothing is listening on that port.

## Why This Happens

1. **Node dependencies not installed** - `npm install` has not been run
2. **Dev server never started** - `npm run dev` was never executed
3. **Browser trying to connect to nothing** - Port 3000 has no server

## The Solution

### Immediate Fix (Fastest)
**Open `index-standalone.html` directly in your browser** (no server needed!)

This is a simplified but fully functional version of the portfolio that works without any development server.

### Proper Fix (Full React App)
You need to start the Vite development server:

#### On Windows:
1. Navigate to the project folder
2. Double-click `start-dev.bat`
3. Wait for "Local: http://localhost:3000" message
4. Open http://localhost:3000 in your browser

#### On Mac/Linux:
```bash
cd "path/to/project"
npm install
npm run dev
```

## What Was Already Fixed

Previous fixes I implemented:
- ✅ Created missing `index.css` file
- ✅ Added error boundaries for better error handling
- ✅ Improved error logging and fallback messages
- ✅ Enhanced Vite configuration
- ✅ Created standalone HTML version

However, **these fixes don't matter if the server isn't running**.

## The Real Issue Flow

```
You: Open localhost:3000
↓
Browser: Try to connect to localhost:3000
↓
Server: "Nothing is listening here" (ERR_CONNECTION_REFUSED)
↓
Browser: Shows blank/error page
```

**To fix this: START THE DEV SERVER**

## Files Provided

1. **`start-dev.bat`** - Automated startup script (Windows)
2. **`index-standalone.html`** - Works without dev server
3. **`GETTING_STARTED.md`** - Setup instructions
4. **`BLANK_PAGE_FIX.md`** - Technical error handling details

## Quick Start Commands

```bash
# Install dependencies (one time only)
npm install

# Start dev server
npm run dev

# Open browser to:
http://localhost:3000
```

## Verification Checklist

- [ ] Have you run `npm install`?
- [ ] Have you run `npm run dev`?
- [ ] Do you see "Local: http://localhost:3000" in the terminal?
- [ ] Are you trying to access http://localhost:3000 (not just localhost)?
- [ ] Is port 3000 actually being used by another app?

## Common Issues & Solutions

**"npm: command not found"**
→ Node.js not installed. Download from nodejs.org

**"Port 3000 in use"**
→ Another app is using it. Kill the process or change the port in vite.config.ts

**"ECONNREFUSED"**
→ Dev server not running. Run `npm run dev`

**"Module not found"**
→ Dependencies not installed. Run `npm install`

---

**TL;DR: The page is blank because the dev server isn't running. Run `npm install && npm run dev` or open `index-standalone.html` directly.**

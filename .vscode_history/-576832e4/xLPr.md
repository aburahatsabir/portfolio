# FIX BLANK PAGE - ACTION STEPS

## ✅ STEP 1: Quick Test (No Installation Needed)

Open this file in your browser:
```
index-standalone.html
```

**If this works:** The React app issue is environment/setup related, not code.
**If this doesn't work:** Contact support with browser console errors (F12).

---

## ✅ STEP 2: Install Dependencies

```bash
npm install
```

This downloads all required packages (React, Vite, Tailwind, etc.).

**What to look for:**
- Should complete without errors
- Creates `node_modules` folder (~500MB)
- Takes 2-5 minutes depending on connection

---

## ✅ STEP 3: Start Development Server

```bash
npm run dev
```

**What to look for:**
- Terminal shows: "Local: http://localhost:3000"
- Shows "ready in XXms"
- No errors in output

---

## ✅ STEP 4: View in Browser

Open: **http://localhost:3000**

You should now see the portfolio website with:
- Navigation bar at top
- Hero section with "Engineering Institutional Sovereignty"
- Project cards
- Contact form
- All styling and animations working

---

## 🪟 WINDOWS USERS - FASTER WAY

Just double-click: **`start-dev.bat`**

It automatically does steps 2 & 3 for you!

---

## 📋 CHECKLIST

- [ ] Downloaded/extracted project files
- [ ] Have Node.js installed (test: `node --version`)
- [ ] Have npm installed (test: `npm --version`)
- [ ] Ran `npm install` successfully
- [ ] Ran `npm run dev` successfully
- [ ] Opened http://localhost:3000 in browser
- [ ] Page loads with content (not blank)

---

## 🆘 STUCK? TRY THIS

### Issue: "npm: command not found"
**Fix:** Install Node.js from https://nodejs.org

### Issue: "Port 3000 already in use"
**Fix:** 
```bash
# Kill existing process
npx kill-port 3000
# Then try again: npm run dev
```

### Issue: "node_modules/vite not found"
**Fix:**
```bash
npm install
```

### Issue: Still blank page after all steps
**Fix:** Check browser console (F12) for errors and share them

---

## 🎯 WHAT SHOULD HAPPEN

```
Your Action        →  What You See
npm install        →  "added XXX packages"
npm run dev        →  "Local: http://localhost:3000"
Open localhost     →  Full website loads
```

If all three happen, **you're done!** 🎉

---

## 📞 SUPPORT

If it still doesn't work:
1. Share the exact error message
2. Tell me which step failed
3. Include `npm --version` and `node --version` output

---

**Updated: 2025-01-21**
**Issue: Dev server not running**
**Solution: Start the dev server with `npm run dev`**

# Quick Start Guide

## Step 1: Open Terminal

**On Windows:**
- Right-click in your project folder
- Select "Open in Terminal" or "Open PowerShell here"

**On Mac/Linux:**
- Open Terminal app
- Navigate to project folder: `cd path/to/calorie-tracking-app`

## Step 2: Install Dependencies

Copy and paste this command:

```bash
npm install
```

Wait for it to finish (1-3 minutes). You should see no red errors.

## Step 3: Start the App

Copy and paste this command:

```bash
npm run dev
```

You should see:
```
VITE v6.0.5  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  press h to show help
```

## Step 4: Open in Browser

Click the link or manually type:
```
http://localhost:3000
```

The app should load immediately.

## Troubleshooting

### Error: "npm: command not found"
- Node.js is not installed
- Download from https://nodejs.org/ (LTS version)
- Restart your computer
- Try the npm install command again

### Error: "EADDRINUSE: address already in use :::3000"
- Port 3000 is already in use
- Edit `vite.config.ts` and change `port: 3000` to `port: 5173`
- Try `npm run dev` again
- Open http://localhost:5173

### Error: "Cannot find module"
- Node modules didn't install properly
- Run: `rm -rf node_modules` (or delete node_modules folder manually)
- Run: `npm install` again

### Nothing loads in browser
- Check if terminal still shows the dev server running
- If it stopped, run `npm run dev` again
- Try refreshing the browser (Ctrl+R or Cmd+R)
- Try a different browser (Chrome, Firefox, Safari)

### Terminal shows errors after npm install
- This is usually safe
- Try running `npm run dev` anyway
- If it starts, ignore the warnings

## How to Stop the App

Press `Ctrl+C` (or `Cmd+C` on Mac) in the terminal.

## Next Steps in the App

1. Click **"Get Started"** on the landing page
2. Complete onboarding (or click **"Continue in demo mode"**)
3. You'll see the dashboard with demo food logs
4. Try:
   - Adding a new food ("Quick add" button)
   - Viewing your diary
   - Checking insights and progress
   - Updating your profile

## Features to Try

✅ **Dashboard** – See your daily calorie and macro intake  
✅ **Food Diary** – Browse meals by date  
✅ **Add Food** – Search demo foods and log meals  
✅ **Food Editor** – Adjust portion sizes and calculate macros  
✅ **Insights** – View weekly charts and trends  
✅ **Progress** – Track history over time  
✅ **Profile** – Update goals and settings  
✅ **Local Storage** – All data saves automatically to your browser  

## Important Notes

- The app uses **demo data** (not a real nutrition database)
- Data is saved in your **browser's localStorage** (local storage, not cloud)
- If you clear browser data, logs will be deleted
- The app is **fully offline** once it loads

## Need Help?

If the app won't start:
1. Paste the exact error message here
2. Tell me your OS (Windows/Mac/Linux)
3. Tell me what step failed

I'll give you the exact fix.

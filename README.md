# Calorie Tracking App

A premium, minimalist nutrition tracking application built with React + TypeScript + Tailwind CSS.

## Project Setup

### Prerequisites
- Node.js 16+ and npm installed
- A code editor (VS Code recommended)

### Installation

1. **Clone the repository** (or navigate to your project directory)

   ```bash
   cd calorie-tracking-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**

   The app will be available at:
   ```
   http://localhost:3000
   ```

### Build for production

```bash
npm run build
```

## Features

✅ **Landing page** with feature overview  
✅ **Authentication** with demo mode  
✅ **Multi-step onboarding** with goal setup  
✅ **Dashboard** with daily calorie and macro tracking  
✅ **Food diary** with date navigation  
✅ **Food search** with demo database  
✅ **Food details editor** with portion control  
✅ **Nutrition insights** with charts  
✅ **Progress history** with weekly/monthly trends  
✅ **Profile settings** with user preferences  
✅ **Responsive design** for mobile, tablet, and desktop  
✅ **Local persistence** using browser localStorage  
✅ **Demo data** included for testing  

## Usage

### First-time user
1. Visit the landing page
2. Click "Get Started"
3. Complete the onboarding (or "Continue in demo mode")
4. View the dashboard
5. Add food using the "Add Food" button
6. Track progress and adjust goals in settings

### Demo mode
Demo mode includes:
- Pre-loaded user profile
- Sample food logs
- Realistic demo data
- Full app functionality

## Project Structure

```
src/
├── pages/
│   ├── LandingPage.tsx       # Landing page
│   ├── AuthPage.tsx          # Login/signup
│   ├── OnboardingPage.tsx    # Goal setup flow
│   ├── DashboardPage.tsx     # Main dashboard
│   ├── DiaryPage.tsx         # Food diary view
│   ├── AddFoodPage.tsx       # Food search
│   ├── FoodDetailPage.tsx    # Food editor
│   ├── InsightsPage.tsx      # Nutrition charts
│   ├── ProgressPage.tsx      # History trends
│   └── ProfilePage.tsx       # Settings
├── components/
│   ├── Layout.tsx            # App shell & nav
│   ├── ProgressRing.tsx      # Circular progress
│   └── MealSection.tsx       # Meal card component
├── types.ts                  # TypeScript interfaces
├── data.ts                   # Demo data & defaults
├── utils.ts                  # Utility functions
├── App.tsx                   # Main app router
└── main.tsx                  # App entry point
```

## Key Technologies

- **React 18** — UI library
- **TypeScript** — Static typing
- **React Router v6** — Client-side navigation
- **Tailwind CSS** — Utility-first styling
- **Recharts** — Data visualization
- **Lucide React** — Icons
- **Vite** — Build tool

## How It Works

### State Management
- User profile and settings stored in localStorage
- Food logs persisted across sessions
- Real-time calculation of calories and macros

### Calorie & Macro Calculations
- Daily totals computed from logged foods
- Nutritional values scale proportionally with portion size
- Remaining calories calculated in real time

### Navigation
- Desktop: Left sidebar with nav items
- Mobile: Bottom tab navigation
- All pages are fully responsive

## Customization

### Change daily calorie target
Edit `DEFAULT_USER.dailyTarget` in `src/data.ts`

### Add more demo foods
Extend the `FOOD_DATABASE` array in `src/data.ts`

### Modify design colors
Update Tailwind config in `tailwind.config.js`:
- Primary: `#237A57` (forest green)
- Secondary: `#DDF3E5` (mint)
- Background: `#F8FAF7` (cream)

### Connect to a real backend
Replace localStorage calls in `src/utils.ts` with API calls to your server

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Limitations

- Demo data only (no real nutrition database connected)
- Local storage only (not synced across devices)
- No image uploads
- No social features

## Future Enhancements

- Real nutrition database integration (USDA FoodData Central, etc.)
- Backend API for multi-device sync
- Photo recognition for food logging
- Recipe creation and macro calculation
- Meal planning
- Social sharing and friend comparison
- Mobile app (React Native)

## License

MIT

## Support

For issues or questions, please check the code comments or refer to the component documentation.

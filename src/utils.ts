import { FoodLog, UserProfile, DailySummary, MealType } from './types';

export const getTodayIso = () => new Date().toISOString().split('T')[0];

export const formatDateLabel = (dateString: string) =>
  new Date(`${dateString}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

export const formatShortDate = (dateString: string) =>
  new Date(`${dateString}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

export const addDays = (dateString: string, offset: number) => {
  const date = new Date(`${dateString}T12:00:00`);
  date.setDate(date.getDate() + offset);
  return date.toISOString().split('T')[0];
};

export const computeEstimatedTarget = (user: Partial<UserProfile>) => {
  const weight = user.currentWeight || 68;
  const base = weight * 22;
  const multipliers: Record<string, number> = {
    'Sedentary': 1.2,
    'Lightly active': 1.375,
    'Moderately active': 1.55,
    'Very active': 1.725
  };
  const multiplier = multipliers[user.activityLevel || 'Lightly active'] || 1.375;
  let target = Math.round(base * multiplier);

  if (user.goalPreference === 'Manage weight') target = Math.max(target - 250, 1500);
  if (user.goalPreference === 'Improve nutrition') target = Math.max(target + 100, 1800);

  return target;
};

export const getMealTotals = (entries: FoodLog[]) => {
  const totals = {
    Breakfast: 0,
    Lunch: 0,
    Dinner: 0,
    Snacks: 0
  } as Record<MealType, number>;

  entries.forEach((entry) => {
    totals[entry.meal] += entry.calories;
  });

  return totals;
};

export const getDailySummary = (entries: FoodLog[], target: number): DailySummary => {
  const calories = entries.reduce((sum, item) => sum + item.calories, 0);
  const protein = entries.reduce((sum, item) => sum + item.protein, 0);
  const carbs = entries.reduce((sum, item) => sum + item.carbs, 0);
  const fat = entries.reduce((sum, item) => sum + item.fat, 0);
  const remaining = target - calories;

  return {
    calories,
    protein,
    carbs,
    fat,
    target,
    remaining,
    percent: target ? Math.min((calories / target) * 100, 100) : 0
  };
};

export const getFoodLogById = (logs: FoodLog[], id: string) => logs.find((log) => log.id === id);

export const sumByDate = (logs: FoodLog[], date: string) =>
  logs.filter((log) => log.date === date).reduce((sum, log) => sum + log.calories, 0);

export const getWeeklyTrend = (logs: FoodLog[], target: number) => {
  const data = Array.from({ length: 7 }, (_, index) => {
    const date = addDays(getTodayIso(), -6 + index);
    const value = sumByDate(logs, date);
    return {
      day: new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short' }),
      calories: value,
      target
    };
  });

  return data;
};

export const getMacroBreakdown = (entries: FoodLog[]) => {
  const totals = entries.reduce(
    (acc, item) => {
      acc.protein += item.protein;
      acc.carbs += item.carbs;
      acc.fat += item.fat;
      return acc;
    },
    { protein: 0, carbs: 0, fat: 0 }
  );

  const grandTotal = totals.protein + totals.carbs + totals.fat || 1;

  return {
    protein: (totals.protein / grandTotal) * 100,
    carbs: (totals.carbs / grandTotal) * 100,
    fat: (totals.fat / grandTotal) * 100
  };
};

export const getMostLoggedFoods = (logs: FoodLog[]) => {
  const map = new Map<string, number>();

  logs.forEach((log) => {
    map.set(log.foodName, (map.get(log.foodName) || 0) + log.calories);
  });

  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, value]) => ({ name, value }));
};

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const getAvailabilityText = (date: string, logs: FoodLog[]) => {
  const hasEntries = logs.some((log) => log.date === date);
  return hasEntries ? 'Logged successfully' : 'No entries yet';
};

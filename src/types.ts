export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  height: number;
  currentWeight: number;
  goalWeight?: number;
  activityLevel: string;
  goalPreference: string;
  dailyTarget: number;
  macroTargets: {
    protein: number;
    carbs: number;
    fat: number;
  };
  unitPreference: 'metric' | 'imperial';
  dietaryPreferences: string[];
  allergies: string[];
  reminder: boolean;
  waterGoal: number;
  waterIntake: number;
  onboardingComplete: boolean;
  theme: 'Light' | 'Dark';
  privacy: 'Private' | 'Friends' | 'Public';
}

export interface Food {
  id: string;
  name: string;
  servingSize: number;
  servingUnit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  source: string;
  category: string;
  isCustom?: boolean;
}

export interface FoodLog {
  id: string;
  userId: string;
  foodId: string;
  foodName: string;
  date: string;
  meal: MealType;
  quantity: number;
  servingUnit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  notes?: string;
  customFood?: boolean;
}

export interface DailySummary {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  target: number;
  remaining: number;
  percent: number;
}

export interface InsightStat {
  name: string;
  value: number;
  fill: string;
}

import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Droplets, Sparkles, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { getTodayIso, formatDateLabel, addDays, getMealTotals, getWeeklyTrend, getDailySummary, getMostLoggedFoods } from '../data';
import { ProgressRing } from '../components/ProgressRing';
import { MealSection } from '../components/MealSection';
import { FoodLog, UserProfile, MealType } from '../types';
import { getUserGreeting, getNutritionStatus } from '../utils';

export function DashboardPage({
  user,
  logs,
  selectedDate,
  setSelectedDate,
  onDeleteLog,
  onEditLog,
  onQuickAdd
}: {
  user: UserProfile;
  logs: FoodLog[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  onDeleteLog: (id: string) => void;
  onEditLog: (id: string) => void;
  onQuickAdd: (meal: MealType) => void;
}) {
  const navigate = useNavigate();
  const dailyEntries = useMemo(() => logs.filter((log) => log.date === selectedDate), [logs, selectedDate]);
  const summary = useMemo(() => getDailySummary(dailyEntries, user.dailyTarget), [dailyEntries, user.dailyTarget]);
  const mealTotals = useMemo(() => getMealTotals(dailyEntries), [dailyEntries]);
  const weekly = useMemo(() => getWeeklyTrend(logs, user.dailyTarget), [logs, user.dailyTarget]);
  const topFoods = useMemo(() => getMostLoggedFoods(logs), [logs]);

  const meals: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  const byMeal = meals.reduce((acc, meal) => {
    acc[meal] = dailyEntries.filter((entry) => entry.meal === meal);
    return acc;
  }, {} as Record<MealType, FoodLog[]>);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3 rounded-[28px] border border-slate-200 bg-white p-4 shadow-soft">
        <div>
          <div className="text-sm text-muted">{formatDateLabel(selectedDate)}</div>
          <h1 className="text-2xl font-bold text-ink">{getUserGreeting(user.name)}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setSelectedDate(addDays(selectedDate, -1))} className="rounded-full border border-slate-200 p-2 text-slate-700">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={() => setSelectedDate(addDays(selectedDate, 1))} className="rounded-full border border-slate-200 p-2 text-slate-700">
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-mint font-bold text-forest">
            {user.name?.slice(0, 1).toUpperCase()}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm text-muted">Daily calorie target</div>
              <div className="text-3xl font-bold text-ink">{user.dailyTarget} kcal</div>
            </div>
            <button onClick={() => navigate('/add-food')} className="inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white">
              <Plus className="h-4 w-4" />
              Quick add
            </button>
          </div>

          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center lg:justify-between">
            <ProgressRing value={summary.calories} max={user.dailyTarget} label="used" size={150} />
            <div className="flex-1 space-y-3">
              <div className="rounded-2xl bg-slate-50 p-3">
                <div className="text-xs uppercase tracking-[0.12em] text-muted">Consumed</div>
                <div className="mt-1 text-2xl font-bold text-ink">{summary.calories} kcal</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <div className="text-xs uppercase tracking-[0.12em] text-muted">Remaining</div>
                <div className={`mt-1 text-2xl font-bold ${summary.remaining >= 0 ? 'text-forest' : 'text-amber-600'}`}>
                  {summary.remaining >= 0 ? `${summary.remaining} kcal` : `${Math.abs(summary.remaining)} kcal over target`}
                </div>
              </div>
              <div className="text-sm text-slate-600">{summary.remaining >= 0 ? 'You are within your planned intake for today.' : 'You’re a bit above today’s target; that’s okay—just keep it consistent.'}</div>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-lg font-semibold text-ink">Macro progress</div>
            <div className="text-sm text-muted">Actual intake</div>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Protein', value: summary.protein, target: user.macroTargets.protein, color: '#237A57' },
              { label: 'Carbohydrates', value: summary.carbs, target: user.macroTargets.carbs, color: '#7ab59d' },
              { label: 'Fat', value: summary.fat, target: user.macroTargets.fat, color: '#D9A441' }
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{item.label}</span>
                  <span className="text-slate-500">{Math.round(item.value)} / {item.target}g</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-200">
                  <div className="h-full rounded-full" style={{ width: `${Math.min((item.value / item.target) * 100, 100)}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          {meals.map((meal) => (
            <MealSection
              key={meal}
              title={meal}
              logs={byMeal[meal] || []}
              onDelete={(id) => onDeleteLog(id)}
              onEdit={(id) => onEditLog(id)}
              onAdd={(selectedMeal) => onQuickAdd(selectedMeal)}
            />
          ))}
        </div>

        <div className="space-y-4">
          <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-soft">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-lg font-semibold text-ink">Water</div>
              <div className="flex items-center gap-2 text-forest">
                <Droplets className="h-4 w-4" />
                {user.waterIntake.toFixed(1)} / {user.waterGoal.toFixed(1)} L
              </div>
            </div>
            <div className="h-2.5 rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-sky-400" style={{ width: `${Math.min((user.waterIntake / user.waterGoal) * 100, 100)}%` }} />
            </div>
            <button className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
              + 250 ml
            </button>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-soft">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-lg font-semibold text-ink">Recent meals</div>
              <button className="text-sm font-medium text-forest">View all</button>
            </div>
            <div className="space-y-3">
              {dailyEntries.slice(0, 3).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div>
                    <div className="font-medium text-ink">{entry.foodName}</div>
                    <div className="text-xs text-muted">{entry.meal}</div>
                  </div>
                  <div className="text-sm font-medium text-slate-700">{entry.calories} kcal</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-soft">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-lg font-semibold text-ink">Weekly trend</div>
              <ArrowUpRight className="h-4 w-4 text-forest" />
            </div>
            <div className="h-28">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekly}>
                  <Bar dataKey="calories" fill="#237A57" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-soft">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-forest" />
              <div className="text-lg font-semibold text-ink">Daily insight</div>
            </div>
            <p className="text-sm leading-6 text-slate-600">{getNutritionStatus(user, dailyEntries)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


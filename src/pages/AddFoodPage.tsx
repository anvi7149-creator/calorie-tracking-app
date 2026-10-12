import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CalendarDays, Plus } from 'lucide-react';
import { MealSection } from '../components/MealSection';
import { addDays, formatDateLabel, getDailySummary } from '../data';
import { FoodLog, MealType, UserProfile } from '../types';

export function DiaryPage({
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
  const meals: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
  const dayEntries = useMemo(() => logs.filter((log) => log.date === selectedDate), [logs, selectedDate]);
  const summary = useMemo(() => getDailySummary(dayEntries, user.dailyTarget), [dayEntries, user.dailyTarget]);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-soft">
        <div className="flex items-center justify-between gap-3">
          <button onClick={() => setSelectedDate(addDays(selectedDate, -1))} className="rounded-full border border-slate-200 p-2 text-slate-700">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.12em] text-muted">Food diary</div>
            <div className="text-xl font-bold text-ink">{formatDateLabel(selectedDate)}</div>
          </div>
          <button onClick={() => setSelectedDate(addDays(selectedDate, 1))} className="rounded-full border border-slate-200 p-2 text-slate-700">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {meals.map((meal) => (
            <MealSection
              key={meal}
              title={meal}
              logs={dayEntries.filter((entry) => entry.meal === meal)}
              onDelete={(id) => onDeleteLog(id)}
              onEdit={(id) => onEditLog(id)}
              onAdd={(selectedMeal) => onQuickAdd(selectedMeal)}
            />
          ))}
        </div>

        <div className="space-y-4">
          <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-soft">
            <div className="mb-3 flex items-center gap-2 text-lg font-semibold text-ink">
              <CalendarDays className="h-5 w-5 text-forest" />
              Daily totals
            </div>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                <span>Calories</span>
                <span className="font-semibold text-ink">{summary.calories} kcal</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                <span>Protein</span>
                <span className="font-semibold text-ink">{summary.protein} g</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                <span>Carbs</span>
                <span className="font-semibold text-ink">{summary.carbs} g</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                <span>Fat</span>
                <span className="font-semibold text-ink">{summary.fat} g</span>
              </div>
            </div>
            <button onClick={() => navigate('/add-food')} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-forest px-4 py-3 font-semibold text-white">
              <Plus className="h-4 w-4" />
              Add food
            </button>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-soft">
            <div className="mb-3 text-lg font-semibold text-ink">Weekly view</div>
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Use the date controls above to browse any day and keep a complete history.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


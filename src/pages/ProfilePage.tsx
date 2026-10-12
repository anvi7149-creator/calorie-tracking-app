import React, { useMemo, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid } from 'recharts';
import { getDailySummary, getWeeklyTrend } from '../data';
import { FoodLog, UserProfile } from '../types';

export function ProgressPage({ user, logs }: { user: UserProfile; logs: FoodLog[] }) {
  const [period, setPeriod] = useState<'Daily' | 'Weekly' | 'Monthly'>('Weekly');
  const data = useMemo(() => {
    if (period === 'Daily') {
      return logs.slice(-7).map((log) => ({ label: log.date, calories: log.calories }));
    }
    return getWeeklyTrend(logs, user.dailyTarget);
  }, [logs, period, user.dailyTarget]);

  const avgCalories = useMemo(() => {
    if (logs.length === 0) return 0;
    const total = logs.reduce((sum, log) => sum + log.calories, 0);
    return Math.round(total / logs.length);
  }, [logs]);

  const consistency = useMemo(() => {
    const uniqueDates = new Set(logs.map((log) => log.date));
    return uniqueDates.size ? Math.min((uniqueDates.size / 30) * 100, 100) : 0;
  }, [logs]);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-[0.12em] text-muted">Progress</div>
            <h1 className="text-2xl font-bold text-ink">Nutrition history</h1>
          </div>
          <div className="flex rounded-full border border-slate-200 bg-slate-100 p-1">
            {['Daily', 'Weekly', 'Monthly'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setPeriod(option as 'Daily' | 'Weekly' | 'Monthly')}
                className={`rounded-full px-3 py-2 text-sm font-medium ${period === option ? 'bg-white text-ink shadow-sm' : 'text-slate-600'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
          <div className="text-sm text-muted">Average daily intake</div>
          <div className="mt-2 text-3xl font-bold text-ink">{avgCalories} kcal</div>
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
          <div className="text-sm text-muted">Food log consistency</div>
          <div className="mt-2 text-3xl font-bold text-ink">{Math.round(consistency)}%</div>
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
          <div className="text-sm text-muted">Weekly target</div>
          <div className="mt-2 text-3xl font-bold text-ink">{user.dailyTarget * 7} kcal</div>
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-soft">
        <div className="mb-4 text-lg font-semibold text-ink">Calorie trend</div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="calories" fill="#237A57" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


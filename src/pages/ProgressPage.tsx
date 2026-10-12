import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { getMostLoggedFoods, getMacroBreakdown, getWeeklyTrend } from '../data';
import { FoodLog, UserProfile } from '../types';

export function InsightsPage({ user, logs }: { user: UserProfile; logs: FoodLog[] }) {
  const weeklyData = useMemo(() => getWeeklyTrend(logs, user.dailyTarget), [logs, user.dailyTarget]);
  const macroBreakdown = useMemo(() => getMacroBreakdown(logs), [logs]);
  const topFoods = useMemo(() => getMostLoggedFoods(logs), [logs]);

  const barData = weeklyData.map((day) => ({ ...day, targetLabel: `${day.target}` }));

  if (logs.length === 0) {
    return (
      <div className="p-6">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-soft">
          <h2 className="text-2xl font-bold text-ink">Not enough logged data yet</h2>
          <p className="mt-2 text-slate-600">Add a few meals to unlock calorie, macro, and trend insights.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-3 text-lg font-semibold text-ink">Daily calorie intake vs target</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calories" fill="#237A57" radius={[8, 8, 0, 0]} />
                <Bar dataKey="target" fill="#DDF3E5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-3 text-lg font-semibold text-ink">Weekly calorie trend</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="calories" stroke="#237A57" strokeWidth={3} />
                <Line type="monotone" dataKey="target" stroke="#A7CDB6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-3 text-lg font-semibold text-ink">Macro distribution</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[{ name: 'Macros', protein: macroBreakdown.protein, carbs: macroBreakdown.carbs, fat: macroBreakdown.fat }]}> 
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="protein" stackId="1" stroke="#237A57" fill="#237A57" />
                <Area type="monotone" dataKey="carbs" stackId="1" stroke="#7ab59d" fill="#7ab59d" />
                <Area type="monotone" dataKey="fat" stackId="1" stroke="#D9A441" fill="#D9A441" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-3 text-lg font-semibold text-ink">Most logged foods</div>
          <div className="space-y-3">
            {topFoods.map((food) => (
              <div key={food.name} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <span className="font-medium text-ink">{food.name}</span>
                <span className="text-sm text-slate-600">{Math.round(food.value)} kcal</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-soft">
        <div className="mb-3 text-lg font-semibold text-ink">Suggestions</div>
        <ul className="space-y-2 text-sm leading-6 text-slate-600">
          <li>• Keep your protein and fiber consistent at breakfast and lunch to support steadier energy.</li>
          <li>• Try to distribute meals evenly across the day instead of relying on one large meal.</li>
          <li>• Review trends weekly rather than judging any single day in isolation.</li>
        </ul>
      </div>
    </div>
  );
}


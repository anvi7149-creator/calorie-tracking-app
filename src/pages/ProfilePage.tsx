import React from 'react';
import { Settings, Heart, Lock, LogOut, Flame, Download, Trash2, ChevronRight } from 'lucide-react';
import { UserProfile, FoodLog } from '../types';

export function ProfilePage({
  user,
  onUpdateUser,
  logs,
  onClearLogs
}: {
  user: UserProfile;
  onUpdateUser: (next: Partial<UserProfile>) => void;
  logs: FoodLog[];
  onClearLogs: () => void;
}) {
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-mint text-2xl font-bold text-forest">
            {user.name?.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-ink">{user.name}</h1>
            <p className="text-sm text-slate-600">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white shadow-soft">
        <div className="border-b border-slate-200 px-6 py-4">
          <div className="text-lg font-semibold text-ink">Profile details</div>
        </div>
        <div className="space-y-1 p-6">
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <span className="text-slate-700">Name</span>
            <span className="font-medium text-ink">{user.name}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <span className="text-slate-700">Age</span>
            <span className="font-medium text-ink">{user.age}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <span className="text-slate-700">Height</span>
            <span className="font-medium text-ink">{user.height} {user.unitPreference === 'metric' ? 'cm' : 'in'}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <span className="text-slate-700">Current weight</span>
            <span className="font-medium text-ink">{user.currentWeight} {user.unitPreference === 'metric' ? 'kg' : 'lb'}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <span className="text-slate-700">Activity level</span>
            <span className="font-medium text-ink">{user.activityLevel}</span>
          </div>
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white shadow-soft">
        <div className="border-b border-slate-200 px-6 py-4">
          <div className="text-lg font-semibold text-ink">Nutrition goals</div>
        </div>
        <div className="space-y-1 p-6">
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <span className="text-slate-700">Daily target</span>
            <span className="font-medium text-ink">{user.dailyTarget} kcal</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <span className="text-slate-700">Protein target</span>
            <span className="font-medium text-ink">{user.macroTargets.protein} g</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <span className="text-slate-700">Carbs target</span>
            <span className="font-medium text-ink">{user.macroTargets.carbs} g</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <span className="text-slate-700">Fat target</span>
            <span className="font-medium text-ink">{user.macroTargets.fat} g</span>
          </div>
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white shadow-soft">
        <div className="border-b border-slate-200 px-6 py-4">
          <div className="text-lg font-semibold text-ink">Preferences</div>
        </div>
        <div className="space-y-1 p-6">
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <span className="text-slate-700">Units</span>
            <span className="font-medium text-ink">{user.unitPreference === 'metric' ? 'kg/cm' : 'lb/in'}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <span className="text-slate-700">Theme</span>
            <span className="font-medium text-ink">{user.theme}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <span className="text-slate-700">Privacy</span>
            <span className="font-medium text-ink">{user.privacy}</span>
          </div>
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white shadow-soft">
        <div className="border-b border-slate-200 px-6 py-4">
          <div className="text-lg font-semibold text-ink">Data & account</div>
        </div>
        <div className="space-y-1 p-6">
          <button className="flex w-full items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-left hover:bg-slate-100">
            <div className="flex items-center gap-3">
              <Download className="h-4 w-4 text-slate-600" />
              <span className="text-slate-700">Export my data</span>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </button>
          <button
            onClick={onClearLogs}
            className="flex w-full items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-left hover:bg-slate-100"
          >
            <div className="flex items-center gap-3">
              <Trash2 className="h-4 w-4 text-slate-600" />
              <span className="text-slate-700">Clear all food logs</span>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </button>
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-left hover:bg-slate-100"
          >
            <div className="flex items-center gap-3">
              <LogOut className="h-4 w-4 text-slate-600" />
              <span className="text-slate-700">Log out</span>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

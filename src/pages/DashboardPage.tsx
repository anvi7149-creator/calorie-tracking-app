import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { computeEstimatedTarget } from '../data';
import { UserProfile } from '../types';

const steps = ['Basic info', 'Body info', 'Activity', 'Goals', 'Preferences'];

export function OnboardingPage({ user, onUpdateUser }: { user: UserProfile; onUpdateUser: (next: Partial<UserProfile>) => void }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<Partial<UserProfile>>({
    name: user.name,
    age: user.age,
    height: user.height,
    currentWeight: user.currentWeight,
    goalWeight: user.goalWeight,
    activityLevel: user.activityLevel,
    goalPreference: user.goalPreference,
    dietaryPreferences: user.dietaryPreferences,
    allergies: user.allergies,
    unitPreference: user.unitPreference,
    reminder: user.reminder,
    waterGoal: user.waterGoal
  });

  const progress = ((step + 1) / steps.length) * 100;

  const estimate = useMemo(() => computeEstimatedTarget(form), [form]);

  const updateForm = (key: keyof UserProfile, value: string | number | boolean | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (step === 0 && (!form.name || form.name.trim().length < 2)) nextErrors.name = 'Please enter your name.';
    if (step === 0 && (!form.age || Number(form.age) < 13)) nextErrors.age = 'Please enter a valid age.';
    if (step === 1 && (!form.height || Number(form.height) <= 0)) nextErrors.height = 'Height is required.';
    if (step === 1 && (!form.currentWeight || Number(form.currentWeight) <= 0)) nextErrors.currentWeight = 'Current weight is required.';
    if (step === 2 && !form.activityLevel) nextErrors.activityLevel = 'Please choose an activity level.';
    if (step === 3 && !form.goalPreference) nextErrors.goalPreference = 'Please choose a goal preference.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
      return;
    }

    const nextUser = {
      ...user,
      ...form,
      dailyTarget: estimate,
      onboardingComplete: true,
      macroTargets: {
        protein: Math.round((form.currentWeight || user.currentWeight) * 1.6),
        carbs: Math.round((form.currentWeight || user.currentWeight) * 3.1),
        fat: Math.round((form.currentWeight || user.currentWeight) * 0.9)
      }
    };

    onUpdateUser(nextUser);
    navigate('/dashboard');
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
              <input value={form.name || ''} onChange={(e) => updateForm('name', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Age</label>
              <input type="number" value={form.age || ''} onChange={(e) => updateForm('age', Number(e.target.value))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
              {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Profile photo (optional)</label>
              <input type="file" className="w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3" />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Height ({form.unitPreference === 'metric' ? 'cm' : 'ft / in'})</label>
              <input type="number" value={form.height || ''} onChange={(e) => updateForm('height', Number(e.target.value))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
              {errors.height && <p className="mt-1 text-sm text-red-600">{errors.height}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Current weight ({form.unitPreference === 'metric' ? 'kg' : 'lb'})</label>
              <input type="number" value={form.currentWeight || ''} onChange={(e) => updateForm('currentWeight', Number(e.target.value))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
              {errors.currentWeight && <p className="mt-1 text-sm text-red-600">{errors.currentWeight}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Goal weight (optional)</label>
              <input type="number" value={form.goalWeight || ''} onChange={(e) => updateForm('goalWeight', Number(e.target.value))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            {['Sedentary', 'Lightly active', 'Moderately active', 'Very active'].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => updateForm('activityLevel', level)}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left ${form.activityLevel === level ? 'border-forest bg-mint text-forest' : 'border-slate-200 bg-slate-50 text-slate-600'}`}
              >
                <span>{level}</span>
                <span className="text-xs font-medium">{level === 'Sedentary' ? 'Low' : level === 'Lightly active' ? 'Light' : level === 'Moderately active' ? 'Moderate' : 'High'}</span>
              </button>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            {['Maintain weight', 'Manage weight', 'Improve nutrition', 'Track calories and macros without a weight goal'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => updateForm('goalPreference', option)}
                className={`flex w-full rounded-2xl border px-4 py-3 text-left ${form.goalPreference === option ? 'border-forest bg-mint text-forest' : 'border-slate-200 bg-slate-50 text-slate-600'}`}
              >
                {option}
              </button>
            ))}
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Estimated daily target: <span className="font-semibold text-ink">{estimate} kcal</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Dietary preferences</label>
              <input value={form.dietaryPreferences?.join(', ') || ''} onChange={(e) => updateForm('dietaryPreferences', e.target.value.split(',').map((v) => v.trim()).filter(Boolean))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Allergies or foods to avoid</label>
              <input value={form.allergies?.join(', ') || ''} onChange={(e) => updateForm('allergies', e.target.value.split(',').map((v) => v.trim()).filter(Boolean))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Preferred units</label>
              <select value={form.unitPreference || 'metric'} onChange={(e) => updateForm('unitPreference', e.target.value as 'metric' | 'imperial')} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <option value="metric">kg / cm</option>
                <option value="imperial">lb / ft-in</option>
              </select>
            </div>
            <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <span>Daily reminders</span>
              <input type="checkbox" checked={Boolean(form.reminder)} onChange={(e) => updateForm('reminder', e.target.checked)} />
            </label>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-cream px-4 py-8 text-ink sm:px-6">
      <div className="mx-auto max-w-2xl rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="mb-6 flex items-center justify-between">
          <button type="button" onClick={handleBack} className="inline-flex items-center gap-2 text-sm font-medium text-slate-700" disabled={step === 0}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="text-sm font-medium text-slate-500">Step {step + 1} of {steps.length}</div>
        </div>

        <div className="mb-6 h-2 rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-forest" style={{ width: `${progress}%` }} />
        </div>

        <h2 className="mb-6 text-2xl font-bold">{steps[step]}</h2>

        {renderStep()}

        <div className="mt-8 flex items-center justify-between gap-3">
          <button type="button" onClick={() => navigate('/dashboard')} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
            Skip
          </button>
          <button type="button" onClick={handleNext} className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 font-semibold text-white shadow-soft">
            {step === steps.length - 1 ? 'Finish setup' : 'Continue'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}


import React, { useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { FOOD_DATABASE } from '../data';
import { Food, FoodLog } from '../types';
import { calculateNutrients } from '../utils';

const defaultFood: Food = {
  id: 'custom-food',
  name: 'Custom food',
  servingSize: 1,
  servingUnit: 'serving',
  calories: 150,
  protein: 8,
  carbs: 18,
  fat: 6,
  source: 'user-entered estimate',
  category: 'Custom',
  isCustom: true
};

export function FoodDetailPage({
  user,
  logs,
  onAddLog,
  onUpdateLog,
  onSaveFavorite
}: {
  user: { id: string };
  logs: FoodLog[];
  onAddLog: (log: FoodLog) => void;
  onUpdateLog: (log: FoodLog) => void;
  onSaveFavorite: (food: Food) => void;
}) {
  const navigate = useNavigate();
  const { foodId } = useParams();
  const [searchParams] = useSearchParams();
  const editingId = searchParams.get('edit') || undefined;
  const mealParam = (searchParams.get('meal') || 'Breakfast') as FoodLog['meal'];
  const dateParam = searchParams.get('date') || new Date().toISOString().split('T')[0];

  const existingLog = useMemo(() => logs.find((log) => log.id === editingId), [logs, editingId]);
  const baseFood = useMemo(() => {
    if (foodId === 'custom' || foodId === 'new') return defaultFood;
    return FOOD_DATABASE.find((item) => item.id === foodId) || defaultFood;
  }, [foodId]);

  const [food, setFood] = useState<Food>({
    ...baseFood,
    name: existingLog?.foodName || baseFood.name,
    calories: existingLog?.calories || baseFood.calories,
    protein: existingLog?.protein || baseFood.protein,
    carbs: existingLog?.carbs || baseFood.carbs,
    fat: existingLog?.fat || baseFood.fat,
    source: existingLog ? 'updated entry' : baseFood.source
  });
  const [quantity, setQuantity] = useState(existingLog?.quantity || 1);
  const [meal, setMeal] = useState(existingLog?.meal || mealParam);
  const [notes, setNotes] = useState(existingLog?.notes || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const nutrientPreview = useMemo(() => calculateNutrients(food, quantity * food.servingSize), [food, quantity]);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!food.name.trim()) nextErrors.name = 'Food name is required.';
    if (!quantity || quantity <= 0) nextErrors.quantity = 'Quantity must be greater than zero.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const entry: FoodLog = {
      id: existingLog?.id || `log-${Date.now()}`,
      userId: user.id,
      foodId: food.id,
      foodName: food.name,
      date: existingLog?.date || dateParam,
      meal,
      quantity,
      servingUnit: food.servingUnit,
      calories: nutrientPreview.calories,
      protein: nutrientPreview.protein,
      carbs: nutrientPreview.carbs,
      fat: nutrientPreview.fat,
      fiber: nutrientPreview.fiber,
      notes,
      customFood: food.isCustom
    };

    if (existingLog) onUpdateLog(entry);
    else onAddLog(entry);

    navigate('/diary');
  };

  const handleSaveFavorite = () => {
    onSaveFavorite(food);
    navigate('/profile');
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-soft">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.12em] text-muted">Food details</div>
            <h1 className="text-2xl font-bold text-ink">{food.name}</h1>
          </div>
          <button onClick={() => navigate(-1)} className="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700">
            Cancel
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Food name</label>
              <input value={food.name} onChange={(e) => setFood((prev) => ({ ...prev, name: e.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Serving size</label>
              <input value={food.servingSize} onChange={(e) => setFood((prev) => ({ ...prev, servingSize: Number(e.target.value) }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Quantity</label>
              <input type="number" min={0.1} step={0.1} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
              {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Measurement unit</label>
              <input value={food.servingUnit} onChange={(e) => setFood((prev) => ({ ...prev, servingUnit: e.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Meal</label>
              <select value={meal} onChange={(e) => setMeal(e.target.value as FoodLog['meal'])} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snacks">Snacks</option>
              </select>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl bg-slate-50 p-4">
              <div className="mb-2 text-lg font-semibold text-ink">Nutrition overview</div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-white p-3"><div className="text-muted">Calories</div><div className="text-xl font-bold text-ink">{nutrientPreview.calories}</div></div>
                <div className="rounded-2xl bg-white p-3"><div className="text-muted">Protein</div><div className="text-xl font-bold text-ink">{nutrientPreview.protein}g</div></div>
                <div className="rounded-2xl bg-white p-3"><div className="text-muted">Carbs</div><div className="text-xl font-bold text-ink">{nutrientPreview.carbs}g</div></div>
                <div className="rounded-2xl bg-white p-3"><div className="text-muted">Fat</div><div className="text-xl font-bold text-ink">{nutrientPreview.fat}g</div></div>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              Data source: <span className="font-medium text-slate-700">{food.source}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <button onClick={handleSaveFavorite} className="rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700">
            Save to Favorites
          </button>
          <div className="flex gap-3">
            <button onClick={() => navigate(-1)} className="rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700">
              Cancel
            </button>
            <button onClick={handleSubmit} className="rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white shadow-soft">
              Add to Diary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


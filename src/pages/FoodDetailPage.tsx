import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, PlusCircle } from 'lucide-react';
import { FOOD_DATABASE } from '../data';

const categories = ['Fruits and vegetables', 'Grains and cereals', 'Dairy and alternatives', 'Protein sources', 'Snacks', 'Beverages', 'Restaurant meals', 'Packaged foods'];

export function AddFoodPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    const list = FOOD_DATABASE.filter((food) => {
      const matchesQuery = `${food.name} ${food.category}`.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === 'All' || food.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
    return list;
  }, [query, activeCategory]);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.12em] text-muted">Add food</div>
            <h1 className="text-2xl font-bold text-ink">Food search</h1>
          </div>
          <Link to="/food/custom" className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-mint px-4 py-2 text-sm font-medium text-forest">
            <PlusCircle className="h-4 w-4" />
            Custom food
          </Link>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search foods, brands, or meals"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4"
          />
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-soft">
        <div className="mb-3 text-lg font-semibold text-ink">Food categories</div>
        <div className="flex flex-wrap gap-2">
          {['All', ...categories].map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-3 py-2 text-sm font-medium ${activeCategory === category ? 'bg-forest text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-lg font-semibold text-ink">Search results</div>
          <div className="text-sm text-muted">Demo data</div>
        </div>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-600">
              No foods match that search. Try another item or create a custom food.
            </div>
          ) : (
            filtered.map((food) => (
              <button
                key={food.id}
                type="button"
                onClick={() => navigate(`/food/${food.id}`)}
                className="flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left hover:bg-white"
              >
                <div>
                  <div className="font-medium text-ink">{food.name}</div>
                  <div className="text-xs text-muted">{food.servingSize} {food.servingUnit} • {food.category}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-ink">{food.calories} kcal</div>
                  <div className="text-xs text-muted">P {food.protein}g • C {food.carbs}g • F {food.fat}g</div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


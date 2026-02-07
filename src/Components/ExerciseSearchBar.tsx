import { useState } from "react";
import type { SearchFilters } from "./SearchFilters";

interface ExerciseSearchBarProps {
    initialFilters?: SearchFilters;
    onChange: (filters: SearchFilters) => void; // call this to trigger backend fetch
}

const defaultFilters: SearchFilters = {
    query: "",
    difficulty: "any",
    maxPrice: null,
    location: "",
    sport: "",
    date: "",
};

export function ExerciseSearchBar({ initialFilters, onChange }: ExerciseSearchBarProps) {
    const [filters, setFilters] = useState<SearchFilters>(initialFilters ?? defaultFilters);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onChange(filters); // only trigger when user clicks Search / presses Enter
    }

    function handleReset() {
        setFilters(defaultFilters);
        onChange(defaultFilters);      // trigger backend fetch with cleared filters
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-full mb-6 bg-white/80 rounded-2xl shadow p-4 space-y-4"
        >
            <div className="flex gap-2">
                <input
                    type="text"
                    value={filters.query}
                    onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
                    placeholder="Search sessions, gyms, locations..."
                    className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-xl transition"
                >
                    Search
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-slate-600">Difficulty</label>
                    <select
                        value={filters.difficulty}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                difficulty: e.target.value as SearchFilters["difficulty"],
                            }))
                        }
                        className="rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="any">Any</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-slate-600">Max price (SEK)</label>
                    <input
                        type="number"
                        min={0}
                        value={filters.maxPrice ?? ""}
                        onChange={(e) => {
                            const v = e.target.value;
                            setFilters((prev) => ({ ...prev, maxPrice: v === "" ? null : Number(v) }));
                        }}
                        className="rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-slate-600">Location (Sweden)</label>
                    <input
                        type="text"
                        value={filters.location}
                        onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
                        placeholder="Göteborg, Stockholm..."
                        className="rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-slate-600">Sport</label>
                    <input
                        type="text"
                        value={filters.sport}
                        onChange={(e) => setFilters((prev) => ({ ...prev, sport: e.target.value }))}
                        placeholder="Climbing, Gym, Running..."
                        className="rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-slate-600">Date</label>
                    <input
                        type="date"
                        value={filters.date}
                        onChange={(e) => setFilters((prev) => ({ ...prev, date: e.target.value }))}
                        className="rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex items-end">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="text-xs text-slate-500 hover:text-slate-700 underline"
                    >
                        Clear filters
                    </button>
                </div>
            </div>
        </form>
    );
}

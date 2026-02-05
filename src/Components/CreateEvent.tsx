import React, { useEffect, useState } from "react";

interface CreateEventProps {
    isOpen: boolean;
    onClose: () => void;
}

type EventFormState = {
    title: string;
    description: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    sport: string;
    location: string;
    date: string;
    price: string;
    memberPrice: string;
    freeForMembers: boolean;
    image: string;
};

const initialForm: EventFormState = {
    title: "",
    description: "",
    difficulty: "Beginner",
    sport: "",
    location: "",
    date: "",
    price: "",
    memberPrice: "",
    freeForMembers: false,
    image: "placeholder.png", // default image
};

export function CreateEvent({ isOpen, onClose }: CreateEventProps) {
    const [form, setForm] = useState<EventFormState>(initialForm);

    useEffect(() => {
        if (!isOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) setForm(initialForm);
    }, [isOpen]);

    if (!isOpen) return null;

    function handleChange(
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        // Later: send to backend here

        onClose();
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 space-y-5">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Create event</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full w-8 h-8 flex items-center justify-center hover:bg-slate-100"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Title
                        </label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-500 px-3 py-2 text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-500 px-3 py-2 text-sm"
                            rows={3}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Difficulty
                            </label>
                            <select
                                name="difficulty"
                                value={form.difficulty}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-500 px-3 py-2 text-sm"
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Sport
                            </label>
                            <input
                                name="sport"
                                value={form.sport}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-500 px-3 py-2 text-sm"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Location
                            </label>
                            <input
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-500 px-3 py-2 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Date / time text
                            </label>
                            <input
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-500 px-3 py-2 text-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Price
                            </label>
                            <input
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-500 px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Member price
                            </label>
                            <input
                                name="memberPrice"
                                value={form.memberPrice}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-500 px-3 py-2 text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            id="freeForMembers"
                            type="checkbox"
                            name="freeForMembers"
                            checked={form.freeForMembers}
                            onChange={handleChange}
                            className="rounded border-slate-500"
                        />
                        <label htmlFor="freeForMembers" className="text-sm text-slate-700">
                            Free for members
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Image file name / URL
                        </label>
                        <input
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-500 px-3 py-2 text-sm"
                            placeholder="placeholder"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center text-sm font-semibold px-5 py-2 text-white bg-blue-400 hover:bg-blue-600 active:bg-blue-800 rounded-xl"
                    >
                        Publish event
                    </button>
                </form>
            </div>
        </div>
    );
}

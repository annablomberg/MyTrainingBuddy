import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import * as eventsApi from "../api/eventsApi";
import { ApiError } from "../api/http";

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
    image: "placeholder.png",
};

export function CreateEvent({ isOpen, onClose }: CreateEventProps) {
    const [form, setForm] = useState<EventFormState>(initialForm);
    const { accessToken } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            setForm(initialForm);
            setError(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    function handleChange(
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? target.checked : value,
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (!accessToken) {
            setError("You must be logged in to publish event");
            return;
        }

        setIsSubmitting(true);

        try {
            const priceNumber = form.price ? Number(form.price) : 0;
            const memberPriceNumber = form.memberPrice ? Number(form.memberPrice) : 0;

            if (Number.isNaN(priceNumber) || Number.isNaN(memberPriceNumber)) {
                setError("Price and member price must be numbers.");
                return;
            }

            const now = new Date();
            const iso = now.toISOString();

            const payload: eventsApi.EventRequest = {
                eventName: form.title,
                eventDifficulty: form.difficulty.toUpperCase(),
                exerciseType: form.sport,
                description: form.description,
                price: priceNumber,
                membersprice: memberPriceNumber,
                startTime: iso,
                endTime: iso, // TODO: replace with real UI date/time
                place: form.location,
            };

            const created = await eventsApi.createEvent(payload, accessToken);

            onClose();
        } catch (err) {
            if (err instanceof ApiError) {
                console.error("Create event failed:", err.status, err.body);
                const msg =
                    (err.body as any)?.message ||
                    (err.body as any)?.error ||
                    `Could not create event (HTTP ${err.status}).`;
                setError(msg);
            } else {
                console.error(err);
                setError("Could not create event. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
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

                {error && (
                    <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                        {error}
                    </div>
                )}

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
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center text-sm font-semibold px-5 py-2 text-white bg-blue-400 hover:bg-blue-600 active:bg-blue-800 rounded-xl disabled:opacity-60"
                    >
                        {isSubmitting ? "Publishing..." : "Publish event"}
                    </button>
                </form>
            </div>
        </div>
    );
}

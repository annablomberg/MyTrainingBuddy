import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { DifficultyBadge, Price } from "./EventPieces";
import { TbCalendarMonthFilled, TbLocation } from "react-icons/tb";
import type { EventInfo } from "./EventPieces";

interface SignUpPopUpProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventInfo;
}

export function SignUpPopUp({ isOpen, onClose, event }: SignUpPopUpProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [pickedDate, setPickedDate] = useState("");

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
      setShowCalendar(false);
      setPickedDate("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const {
    image,
    title,
    description,
    difficulty,
    sport,
    location,
    date,
    price,
    memberPrice,
    freeForMembers,
  } = event;

  const isBookDisabled = !pickedDate;

  const handleBookSession = () => {
    if (!pickedDate) return;

    // TODO: replace this with real booking logic / API call
    console.log("Book session", {
      eventTitle: title,
      date: pickedDate,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-label={`Sign up for ${title}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[720px] max-h-[90vh]">
        <Card className="w-full h-full rounded-2xl !bg-white shadow-xl flex flex-col overflow-hidden">
          <div className="flex items-start justify-between p-5 border-b">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">{title}</h2>
                <DifficultyBadge level={difficulty} />
              </div>
              <p className="text-sm text-slate-500">{sport}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3 py-2 hover:bg-black/5"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-auto p-5 space-y-6">
            <div className="w-full rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={image}
                alt={title}
                className="w-full h-48 md:h-56 object-cover object-center"
                loading="lazy"
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm text-slate-600">{description}</p>

              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <TbLocation /> {location}
                <TbCalendarMonthFilled /> {date}
              </div>

              <Price
                price={price}
                memberPrice={memberPrice}
                freeForMembers={freeForMembers}
              />
            </div>

            <div className="rounded-2xl border p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Choose date</div>

                <button
                  type="button"
                  onClick={() => setShowCalendar((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2
                             bg-black text-white text-sm hover:opacity-90"
                >
                  <TbCalendarMonthFilled />
                  {showCalendar ? "Hide calendar" : "Calendar"}
                </button>
              </div>

              {showCalendar && (
                <div className="space-y-3">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700">
                      Pick a date
                    </label>
                    <input
                      type="date"
                      value={pickedDate}
                      onChange={(e) => setPickedDate(e.target.value)}
                      className="rounded-lg border px-3 py-2"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleBookSession}
                  disabled={isBookDisabled}
                  className={
                    "inline-flex items-center text-sm font-semibold px-5 py-2 rounded-xl transition " +
                    (isBookDisabled
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                      : "text-white bg-blue-400 hover:bg-blue-600 active:bg-blue-800")
                  }
                >
                  Book session
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

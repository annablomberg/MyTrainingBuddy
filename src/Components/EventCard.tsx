// EventCard.tsx
import React, { useState } from "react";
import { Card, CardImage, CardText, CardTitle } from "./Card";
import { DifficultyBadge, Price } from "./EventPieces";
import { TbCalendarMonthFilled, TbLocation } from "react-icons/tb";
import { SignUpPopUp } from "./SignUpPopUp";
import type { EventInfo } from "./EventPieces";

interface EventCardProps extends EventInfo {
  onSeeMore?: () => void;
}

export function EventCard(props: EventCardProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
    onSeeMore,
  } = props;

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto rounded-2xl bg-white shadow-md">
        <div className="px-4 pt-4">
          <div className="rounded-2xl">
            <CardImage src={image} alt={title} className="w-full aspect-[16/9] object-cover" />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between gap-3 px-4 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-xl font-semibold">{title}</CardTitle>
              <DifficultyBadge level={difficulty} />
            </div>

            <CardText className="text-left text-sm text-slate-600">
              {description}
            </CardText>

            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <TbLocation /> {location}
              <TbCalendarMonthFilled /> {date}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Price
              price={price}
              memberPrice={memberPrice}
              freeForMembers={freeForMembers}
            />

            <button
              type="button"
              onClick={() => setIsPopupOpen(true)}
              className="inline-flex items-center text-sm font-semibold px-5 py-2 text-white bg-blue-400 hover:bg-blue-600 active:bg-blue-800 transition rounded-xl"
            >
              Sign up
            </button>
          </div>
        </div>
      </Card>

      <SignUpPopUp
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        event={{
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
        }}
      />
    </>
  );
}

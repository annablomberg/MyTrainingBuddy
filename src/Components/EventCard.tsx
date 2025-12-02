import React from "react";
import { Card, CardImage, CardText, CardTitle } from "./Card";
import { DifficultyBadge, Price } from "./EventPieces";
import type { Difficulty } from "./EventPieces";
import { TbCalendarMonthFilled, TbLocation } from "react-icons/tb";


interface EventCardProps {
    title: string;
    description: string;
    image: string;
    difficulty: Difficulty;
    sport: string;
    location: string;
    date: string;
    price: string;
    memberPrice?: string;
    freeForMembers?: boolean;
    onSeeMore?: () => void 
}

export function EventCard(props: EventCardProps){

const {
    image,
    title,
    description,
    difficulty,
    location,
    date,
    price,
    memberPrice,
    freeForMembers,
    onSeeMore,
  } = props;

return (
   <Card className="w-full max-w-2xl mx-auto rounded-2xl bg-white/80 shadow-md">
  <div className="px-4 pt-4">
    <div className="rounded-2xl">
      <CardImage
        src={image}
        alt={title}
        className="w-full aspect-[16/9] object-cover"
      />
    </div>
  </div>

  <div className="flex-1 flex flex-col justify-between gap-3 px-4 pb-4">
    <div>
      <div className="flex items-center gap-2 mb-1">
        <CardTitle className="text-xl font-semibold">
          {title}
        </CardTitle>
        <DifficultyBadge level={difficulty} />
      </div>

      <CardText className="text-left text-sm text-slate-600">
        {description}
      </CardText>

      <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
      <TbLocation /> {location}
      <TbCalendarMonthFilled />{date}
      </div>
    </div>

    <div className="flex items-center justify-between">
      <Price
        price={price}
        memberPrice={memberPrice}
        freeForMembers={freeForMembers}
      />

      <div className="flex items-center">
        <button
          type="button"
          onClick={onSeeMore}
          className="inline-flex items-center text-sm font-semibold text-white px-5 py-2 text-white font-semibold bg-blue-400 hover:bg-blue-600 active:bg-blue-800 transition rounded-xl"
        >
          Sign up
        </button>
      </div>
    </div>
  </div>
</Card>
  );

}
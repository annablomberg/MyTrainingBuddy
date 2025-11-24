import React from "react";
import { Card, CardImage, CardText, CardTitle } from "./Card";
import { DifficultyBadge, Price } from "./EventPieces";
import type { Difficulty } from "./EventPieces";


// image 
// Event name 
// Additional info
// difficulty
// marker for which sport (symbol or color symbol)
// location & date 
// se more info / register button that takes you to about page where you can register 
// price (include member discounts / free for members )

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
    onSeeMore?: () => void // for button click 
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
    <Card className="flex flex-col sm:flex-row gap-4">
      <div className="sm:w-40 flex-shrink-0">
        <div className="relative">
          <CardImage src={image} alt={title} className="h-32 sm:h-40" />
          <div className="absolute top-2 left-2">
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CardTitle className="text-xl font-semibold">
              {title}
            </CardTitle>
            <DifficultyBadge level={difficulty} />
          </div>

          <CardText className="text-sm text-slate-600">
            {description}
          </CardText>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>📍 {location}</span>
            <span>·</span>
            <span>🗓 {date}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 mt-2">
          <Price
            price={price}
            memberPrice={memberPrice}
            freeForMembers={freeForMembers}
          />

          <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onSeeMore}
                className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-xl transition"
              >
                See more / Sign up
              </button>
          </div>
        </div>
      </div>
    </Card>
  );

}
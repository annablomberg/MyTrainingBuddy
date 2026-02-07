import type { HTMLAttributes } from "react";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced"

export type EventInfo = {
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
};

export function DifficultyBadge({level}: {level: Difficulty}){
    const color = 
    level === "Beginner" ? "bg-emerald-100 text-emerald-700"
    : level === "Intermediate" ? "bg-purple-100 text-purple-700"
    : "bg-rose-100 text-rose-700";

    return (
    <span
    className={
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium " +
    color
      }
    >
      {level}
    </span>
    );
}

interface PriceProps extends HTMLAttributes<HTMLSpanElement> {
    price: string;
    memberPrice?: string;
    freeForMembers?: boolean;
}

export function Price({ price, memberPrice, freeForMembers, className = "", ...rest }: PriceProps) {
  return (
    <div className={"flex flex-col text-sm " + className} {...rest}>
      <span className="font-semibold text-slate-800">{price}</span>
      {freeForMembers ? (
        <span className="text-xs text-emerald-700 font-medium">
          Free for members
        </span>
      ) : memberPrice ? (
        <span className="text-xs text-emerald-700 font-medium">
          Member price {memberPrice}
        </span>
      ) : null}
    </div>
  );
}
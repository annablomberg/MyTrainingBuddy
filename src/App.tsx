import './App.css'
import React, {useState} from "react";
import Navbar from './Components/NavBar';
import { EventCard } from './Components/EventCard';
import type { ExerciseEvent, SearchFilters } from './Components/SearchFilters';
import { ExerciseSearchBar } from './Components/ExerciseSearchBar';

type Page = "home" | "chat" | "friends" | "about";

const App: React.FC = () => {

const [currentPage, setCurrentPage] = useState<Page>("home");

const events: ExerciseEvent[] = [
  {
    id: "1",
    title: "Climbing course",
    description: "3 Hour green card course 2x a week for 2 weeks",
    difficulty: "Beginner",
    price: 700,
    location: "Göteborg",
    sport: "Climbing",
    date: "2025-12-12",
  },
];

const initialFilters: SearchFilters = {
  query: "",
  difficulty: "any",
  maxPrice: null,
  location: "",
  sport: "",
  date: "",
};

function matchesFilters(event: ExerciseEvent, f: SearchFilters): boolean {
  if (f.query.trim()) {
    const haystack = (
      event.title +
      " " +
      event.description +
      " " +
      event.location +
      " " +
      event.sport
    ).toLowerCase();
    if (!haystack.includes(f.query.toLowerCase())) return false;
  }

  if (f.difficulty !== "any" && event.difficulty !== f.difficulty) {
    return false;
  }

  if (f.maxPrice != null && event.price > f.maxPrice) {
    return false;
  }

  if (
    f.location.trim() &&
    !event.location.toLowerCase().includes(f.location.toLowerCase())
  ) {
    return false;
  }

  if (
    f.sport.trim() &&
    !event.sport.toLowerCase().includes(f.sport.toLowerCase())
  ) {
    return false;
  }

  if (f.date && event.date !== f.date) {
    return false;
  }

  return true;
}

const [filters, setFilters] = useState<SearchFilters>(initialFilters);

const filteredEvents = events.filter((e) => matchesFilters(e, filters));

return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#d7f3ff_0,#a4d6ff_30%,#ffe5cf_80%)] ">
      <Navbar current={currentPage} />
      
      <div id="home" className="mt-8 landing-page pt-20">
        <section className="max-w-5xl mx-auto px-4">
          <h1 className="text-center text-4xl font-bold text-black mb-6">
            Find workout sessions near you!
          </h1>
          <h2 className="text-center text-xl font-semibold text-black-600 mb-6">
            Also find new friends to exercise with!
          </h2>

        <ExerciseSearchBar
          initialFilters={initialFilters}
          onChange={setFilters}
        />  

        <EventCard title={"Crossfit at Fysiken"} description={"Crossfit session for advanced crossfitters with high intensity, 2 times a week Sundays and Mondays 18:00-19:00 with our best crossfit instructor"} 
        image={"crossfit.png"} difficulty={'Advanced'} sport={"Crossfit"} 
        location={"Gibraltarvägen 12"} date={"Söndag 12 dec · 18:00"} price={'200 kr / session'} freeForMembers={true}/>

        <EventCard 
        title={"Climbing course"} description={"3 Hour green card course with instructor"} 
        image={"climbing.png"} difficulty={'Beginner'} sport={"Climbing"} 
        location={"Chalmers tvärgata 12"} date={"Torsdag 12 dec · 18:00"} price={'700 kr'} />

        <EventCard 
        title={"Looking for a tennis buddy!"} description={"Intermediate tennis player from the gothenburg city region looking for a tennis buddy to play with 3 times per week, message me and we can discuss when"} 
        image={"tennis.png"} difficulty={'Intermediate'} sport={"Tennis"} 
        location={"Gothenburg"} date={"Not yet decided"} price={'0 kr'} />

        </section>
      </div>
    </main>
  );
};

export default App

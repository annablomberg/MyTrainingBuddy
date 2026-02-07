import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import { EventCard } from "./EventCard";
import { ExerciseSearchBar } from "./ExerciseSearchBar";
import Footer from "./Footer";

import * as eventsApi from "../api/eventsApi";
import { ApiError } from "../api/http";

// A small type for how we want to pass data into EventCard
type BackendEventForCard = {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    sport: string;
    location: string;
    date: string;
    price?: string;
};

// helper: format startTime/endTime into a nice string
function formatEventDate(startTime: number, endTime: number): string {
    const start = new Date(startTime);
    // later include end time too; for now just show start
    return start.toLocaleString("sv-SE", {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// map backend EventResponse → props for EventCard
function mapEventResponseToCard(e: eventsApi.EventResponse): BackendEventForCard {
    return {
        id: e.id,
        title: e.eventName,
        description: e.description,
        difficulty: e.eventDifficulty,
        sport: e.exerciseType,
        location: e.Location?.formattedAdress ?? "Unknown location",
        date: formatEventDate(e.startTime, e.endTime),
        // backend response only has membersprice; later add `price` to EventResponse,
        // adjust this:
        price: e.membersprice,
    };
}

function LandingPage() {
    const [backendEvents, setBackendEvents] = useState<BackendEventForCard[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // load events from backend once
    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            setError(null);
            try {
                const res = await eventsApi.listEvents();
                if (cancelled) return;
                const mapped = res.map(mapEventResponseToCard);
                setBackendEvents(mapped);
            } catch (err) {
                if (cancelled) return;
                if (err instanceof ApiError) {
                    const msg =
                        (err.body as any)?.message ||
                        (err.body as any)?.error ||
                        `Could not load events (HTTP ${err.status}).`;
                    setError(msg);
                } else {
                    setError("Could not load events. Please try again.");
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top,#d7f3ff_0,#a4d6ff_30%,#ffe5cf_80%)]">
            <div id="home" className="pt-20 mb-20">
                <Navbar />
                <section className="mt-20 max-w-5xl mx-auto px-4">
                    <h1 className="text-center text-6xl font-[Oswald] text-black mb-6">
                        Find workout sessions near you!
                    </h1>
                    <h2 className="text-center text-xl font-[Oswald]-semibold text-black-600 mb-15">
                        My Training Buddy helps you find new friends to exercise with and
                        attend exercise sessions alone or with friends from your network.
                    </h2>

                    {/* For now: no-op onChange so it doesn’t crash */}
                    <ExerciseSearchBar onChange={() => {}} />

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* --- STATIC (hardcoded) EVENTS --- */}
                        <EventCard
                            title={"Crossfit at Fysiken"}
                            description={
                                "Crossfit session for advanced crossfitters with high intensity, 2 times a week Sundays and Mondays 18:00-19:00 with our best crossfit instructor"
                            }
                            image={"crossfit.png"}
                            difficulty={"Advanced"}
                            sport={"Crossfit"}
                            location={"Gibraltarvägen 12, Gothenburg"}
                            date={"Söndag 12 dec · 18:00"}
                            price={"200 kr / session"}
                            freeForMembers={true}
                        />

                        <EventCard
                            title={"Looking for a tennis buddy!"}
                            description={
                                "Intermediate tennis player from the gothenburg city region looking for a tennis buddy to play with 3 times per week, message me and we can discuss when"
                            }
                            image={"tennis.png"}
                            difficulty={"Intermediate"}
                            sport={"Tennis"}
                            location={"Gothenburg"}
                            date={"Not yet decided"}
                            price={"0 kr"}
                        />

                        <EventCard
                            title={"Gym beginner startup course at STC"}
                            description={
                                "Welcome to our FREE beginner gym course with our talented instructor Ida that will show you proper form and technique. Get 50% discount off your membership for 3 months after this course!"
                            }
                            image={"gym.png"}
                            difficulty={"Beginner"}
                            sport={"Gym"}
                            location={"Ekträngegatan 15, Gothenburg"}
                            date={"Sunday 14 dec · 13:00"}
                            price={"0 kr"}
                        />

                        <EventCard
                            title={
                                "Looking for a climbing buddy with atleast green card"
                            }
                            description={
                                "Hello, my name is Adam Sandler and I'm looking for a climbing buddy in the Stockholm region. I'm unemplyed so my schedule is very flexible, dm me :)"
                            }
                            image={"climbing2.png"}
                            difficulty={"Intermediate"}
                            sport={"Climbing"}
                            location={"Stockholm"}
                            date={"Not yet decided"}
                            price={"0 kr"}
                        />

                        <EventCard
                            title={"Looking for golf buddies"}
                            description={
                                "My name is Bengt Andersson and I'm a chill Danish finance bro that loves golf and trading stocks. My old golf buddy got an injury so I'm looking for a replacement on Wednesdays 19:00. Dm me if you are interested!"
                            }
                            image={"golf.png"}
                            difficulty={"Advanced"}
                            sport={"Golf"}
                            location={"Stockholm"}
                            date={"Each Wednesday · 19:00"}
                            price={"0 kr"}
                        />

                        <EventCard
                            title={"Kickboxing course for women ❤️"}
                            description={
                                "Kickboxing course at Göteborgs kampsportstudio for girls! Group size: 15 people. Mondays & Fridays 16:00 - 20 sessions. Starting date: 2nd January 2026"
                            }
                            image={"kickboxinggirls.png"}
                            difficulty={"Beginner"}
                            sport={"Kickboxing"}
                            location={"Brunnsvikstorget 14, Gothenburg"}
                            date={"Mondays & Fridays 16:00"}
                            price={"1500 kr"}
                            memberPrice={"1000 kr"}
                        />

                        <EventCard
                            title={"Pilates at Lilla Pilates studion"}
                            description={
                                "Pilates sessions at Lilla Pilates studion som ligger centralt i Majorna. Click sign up to see more dates & availability. 18+ studio for peace and calm"
                            }
                            image={"pilates.png"}
                            difficulty={"Beginner"}
                            sport={"Pilates"}
                            location={"Kajplatsen 7, Gothenburg"}
                            date={"Olika datum"}
                            price={"500-800 kr"}
                            freeForMembers={true}
                        />

                        <EventCard
                            title={"Salsa course at Mölndals dansstudio"}
                            description={
                                "Learn how to dance salsa at Mölndals dance studio! First time is free and then the regular price is 300 kr. Our classes are around 20 people."
                            }
                            image={"salsa.png"}
                            difficulty={"Beginner"}
                            sport={"Dans - Salsa"}
                            location={"Mölndalsvägen 9, Gothenburg"}
                            date={"Olika datum"}
                            price={"250 kr"}
                            freeForMembers={true}
                        />

                        <EventCard
                            title={"Hot yoga Wednesdays!"}
                            description={
                                "Love hot yoga? Well then you should totally try our hot yoga Wednesdays at Annas Yoga studio"
                            }
                            image={"yoga.png"}
                            difficulty={"Intermediate"}
                            sport={"Yoga"}
                            location={"Vasagatan 33, Gothenburg"}
                            date={"Each Wednesday · 17:00"}
                            price={"300 kr"}
                            freeForMembers={true}
                        />

                        <EventCard
                            title={"Climbing course"}
                            description={"3 Hour green card course with instructor"}
                            image={"climbing.png"}
                            difficulty={"Beginner"}
                            sport={"Climbing"}
                            location={"Chalmers tvärgata 12, Gothenburg"}
                            date={"Torsdag 18 dec · 18:00"}
                            price={"700 kr"}
                        />

                        {/* --- BACKEND EVENTS --- */}
                        {loading && (
                            <p className="col-span-full text-center text-slate-500">
                                Loading events...
                            </p>
                        )}

                        {error && !loading && (
                            <p className="col-span-full text-center text-red-600">
                                {error}
                            </p>
                        )}

                        {!loading &&
                            !error &&
                            backendEvents.map((ev) => (
                                <EventCard
                                    key={ev.id}
                                    title={ev.title}
                                    description={ev.description}
                                    difficulty={ev.difficulty as any}
                                    sport={ev.sport}
                                    location={ev.location}
                                    date={ev.date}
                                    price={ev.price}
                                    image={"placeholder.png"} // until backend gives you image URLs
                                />
                            ))}
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}

export default LandingPage;

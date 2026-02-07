import type { UserResponse } from "./authApi";
import { authFetchJson } from "./authFetch";
import { fetchJson } from "./http";

// eventsApi.ts
export type LocationResponse = {
    locationId: string;
    lat: number;
    lon: number;
    formattedAddress: string;
};

export type EventResponse = {
    eventId: string;
    eventName: string;
    eventDifficulty: string;
    exerciseType: string;
    description: string;
    price: number;
    memberPrice: number;
    startTime: string;   // ISO string
    endTime: string;     // ISO string
    creator: UserResponse;
    location: LocationResponse;
};


export type EventsPageResponse = {
    data: EventResponse[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
};

export type EventRequest = {
    eventName: string;
    eventDifficulty: string;
    exerciseType: string;
    description: string;
    price: number;
    membersprice: number;
    startTime: string;  // ISO
    endTime: string;    // ISO
    place: string;
};

// POST /api/events
export async function createEvent(
    req: EventRequest,
    accessToken: string | null
): Promise<EventResponse> {
    return authFetchJson<EventResponse>("/api/events", accessToken, {
        method: "POST",
        body: JSON.stringify(req),
    });
}

export async function listEvents(): Promise<EventsPageResponse> {
    return fetchJson<EventsPageResponse>("/api/events", {
        method: "GET",
    });
}

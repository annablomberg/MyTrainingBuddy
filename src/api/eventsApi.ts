import type {UserResponse} from "./authApi.ts";
import {authFetchJson} from "./authFetch.ts";
import {fetchJson} from "./http.ts";

export type locationResponse = {
    locationId: string;
    lat: number;
    lon: number;
    formattedAdress: string;
}

export type EventResponse = {
    id: string;
    eventName: string;
    eventDifficulty: string;
    exerciseType: string;
    description: string;
    membersprice: string;
    startTime: string;
    endTime: string;
    creator: UserResponse
    Location: locationResponse
}

export type EventRequest = {
    eventName: string;
    eventDifficulty: string;
    exerciseType: string;
    description: string;
    price: number;
    membersprice: number;
    startTime: string;
    endTime: string;
    place: string;
}

export async function createEvent(
    req: EventRequest,
    accessToken: string | null
): Promise<EventResponse> {
    return authFetchJson<EventResponse>("/api/events", accessToken, {
        method: "POST",
        body: JSON.stringify(req),
    });
}

export async function listEvents(
): Promise<EventResponse[]> {
    return fetchJson<EventResponse[]>("/api/events", {
        method: "GET",
    });
}




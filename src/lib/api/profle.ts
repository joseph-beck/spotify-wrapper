import type { UserProfile } from "$lib/types/spotify";

export async function fetchProfile(code: string): Promise<UserProfile> {
    const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${code}` }
    });

    if (!response.ok) throw new Error("failed to fetch (get) from api");

    return await response.json();
}
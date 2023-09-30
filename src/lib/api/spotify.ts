import type { TopArtists, TopTracks, UserProfile } from '$lib/types/spotify';
import axios from 'axios';
import querystring from 'querystring';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';
const CLIENT_ID = 'bafec66b777341cc98db566863368d07';
const REDIRECT_URI = 'https://spotify-wrapper.vercel.app/profile';

export function getAuthorizationUrl() {
    const scopes = ['user-read-private', 'user-read-email', 'user-top-read'];
    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'token',
        redirect_uri: REDIRECT_URI,
        scope: scopes.join(' '),
    });
    return `https://accounts.spotify.com/authorize?${queryParams}`;
}

export function getAccessTokenFromUrlHash(): string | null {
    if (typeof window !== 'undefined') {
        const hashParams = new URLSearchParams(window.location.hash.substr(1));
        return hashParams.get('access_token');
    }

    return null;
}

export async function getProfile(accessToken: string): Promise<UserProfile> {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await axios.get(`${SPOTIFY_API_BASE_URL}/me`, { headers });

    return response.data;
}

export function getUserProfileImage(profile: UserProfile, width = 640, height = 640): string | null {
    if (profile?.images?.length > 0) {
      const closestImage = profile.images.reduce((prev, curr) => {
            const prevDiff = Math.abs(prev.width - width) + Math.abs(prev.height - height);
            const currDiff = Math.abs(curr.width - width) + Math.abs(curr.height - height);
            return currDiff < prevDiff ? curr : prev;
      });

      return closestImage.url;
    }

    return null;
}

export async function getTopTracks(accessToken: string): Promise<TopTracks> {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await axios.get(`${SPOTIFY_API_BASE_URL}/me/top/tracks?limit=21`, { headers });
    return response.data;
}

export async function getTopTracksRecent(accessToken: string): Promise<TopTracks> {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await axios.get(`${SPOTIFY_API_BASE_URL}/me/top/tracks?time_range=short_term&limit=21`, { headers });
    return response.data;
}

export async function getTopTracksAllTime(accessToken: string): Promise<TopTracks> {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await axios.get(`${SPOTIFY_API_BASE_URL}/me/top/tracks?time_range=long_term&limit=21`, { headers });
    return response.data;
}

export async function getTopArtists(accessToken: string): Promise<TopArtists> {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await axios.get(`${SPOTIFY_API_BASE_URL}/me/top/artists?limit=21`, { headers });
    return response.data;
}

export async function getTopArtistsRecent(accessToken: string): Promise<TopArtists> {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await axios.get(`${SPOTIFY_API_BASE_URL}/me/top/artists?time_range=short_term&limit=21`, { headers });
    return response.data;
}

export async function getTopArtistsAllTime(accessToken: string): Promise<TopArtists> {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await axios.get(`${SPOTIFY_API_BASE_URL}/me/top/artists?time_range=long_term&limit=21`, { headers });
    return response.data;
}

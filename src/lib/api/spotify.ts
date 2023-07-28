
import type { UserProfile } from '$lib/types/spotify';
import axios from 'axios';
import querystring from 'querystring';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';
const CLIENT_ID = 'bafec66b777341cc98db566863368d07';
const REDIRECT_URI = 'http://localhost:5173/profile';

export function getAuthorizationUrl() {
    const scopes = ['user-read-private', 'user-read-email'];
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

export function getUserProfileImage(profile: UserProfile): string | null {
    // Check if profile has images
    if (profile?.images?.length > 0) {
      // Assuming the first image in the array is the desired size (you can choose other sizes if needed)
      return profile.images[0].url;
    }
    return null; // Return null if no image available
  }
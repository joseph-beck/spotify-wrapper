<script lang="ts">
    import Artists from './Artists.svelte';
	import Tracks from './Tracks.svelte';
	import Profile from './Profile.svelte';
	import Footer from '../Footer.svelte';

    import { getAuthorizationUrl, getAccessTokenFromUrlHash, getProfile, getUserProfileImage, getTopTracks, getTopArtists } from '$lib/api/spotify';
	import type { TopArtists, TopTracks, UserProfile } from '$lib/types/spotify';

    let accessToken: string | null = getAccessTokenFromUrlHash();
    let profile: UserProfile | null = null;
    let topTracks: TopTracks | null = null;
    let topArtists: TopArtists | null = null;

    async function fetchStats() {
        if (!accessToken) {
            window.location.href = getAuthorizationUrl();
        } else {
            try {
                profile = await getProfile(accessToken);
                topTracks = await getTopTracks(accessToken);
                topArtists = await getTopArtists(accessToken);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        }
    }

    import { onMount } from 'svelte';
    onMount(fetchStats);
</script>

<main>
    <h1>Spotify Wrapper</h1>

    {#if profile !== null}
        <Profile
            profile={profile}
        />
    {:else}
        {#if accessToken}
            <p>Loading profile data...</p>
        {:else}
            <p>Redirecting to Spotify authorization...</p>
        {/if}
    {/if}

    {#if topTracks !== null}
        <h2>Top Tracks</h2>
        <Tracks topTracks={topTracks}/>
    {:else}
        <p>Loading track statistics</p>
    {/if}

    {#if topArtists !== null}
        <h2>Top Artists</h2>
        <Artists topArtists={topArtists}/>
    {:else}
        <p>Loading artist statistics</p>
    {/if}

    <Footer/>
</main>

<style>
</style>

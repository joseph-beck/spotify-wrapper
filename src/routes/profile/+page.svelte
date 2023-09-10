<script lang="ts">
    import Artists from '../../lib/components/Artists.svelte';
	import Tracks from '../../lib/components/Tracks.svelte';
	import Profile from '../../lib/components/Profile.svelte';
	import Footer from '../../lib/components/Footer.svelte';

    import { getAuthorizationUrl, getAccessTokenFromUrlHash, getProfile, getUserProfileImage, getTopTracks, getTopArtists, getTopTracksRecent, getTopArtistsRecent, getTopArtistsAllTime, getTopTracksAllTime } from '$lib/api/spotify';
	import type { TopArtists, TopTracks, UserProfile } from '$lib/types/spotify';

    let accessToken: string | null = getAccessTokenFromUrlHash();
    let profile: UserProfile | null = null;
    let topTracks: TopTracks | null = null;
    let topTracksRecent: TopTracks | null = null;
    let topTracksAllTime: TopTracks | null = null;
    let topArtists: TopArtists | null = null;
    let topArtistsRecent: TopArtists | null = null;
    let topArtistsAllTime: TopArtists | null = null;

    async function fetchStats() {
        if (!accessToken) {
            window.location.href = getAuthorizationUrl();
        } else {
            try {
                profile = await getProfile(accessToken);
                topTracks = await getTopTracks(accessToken);
                topTracksRecent = await getTopTracksRecent(accessToken);
                topTracksAllTime = await getTopTracksAllTime(accessToken);
                topArtists = await getTopArtists(accessToken);
                topArtistsRecent = await getTopArtistsRecent(accessToken);
                topArtistsAllTime = await getTopArtistsAllTime(accessToken);
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

    {#if topTracksRecent !== null}
        <h2>Recent Top Tracks</h2>
        <Tracks topTracks={topTracksRecent}/>
    {:else}
        <p>Loading track statistics</p>
    {/if}

    {#if topArtistsRecent !== null}
        <h2>Recent Top Artists</h2>
        <Artists topArtists={topArtistsRecent}/>
    {:else}
        <p>Loading artist statistics</p>
    {/if}

    {#if topTracksAllTime !== null}
        <h2>All Time Top Tracks</h2>
        <Tracks topTracks={topTracksAllTime}/>
    {:else}
        <p>Loading track statistics</p>
    {/if}

    {#if topArtistsAllTime !== null}
        <h2>All Time Top Artists</h2>
        <Artists topArtists={topArtistsAllTime}/>
    {:else}
        <p>Loading artist statistics</p>
    {/if}

    <Footer/>
</main>

<style>
</style>

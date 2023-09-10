<script lang="ts">
    import Artists from '../../lib/components/Artists.svelte';
	import Tracks from '../../lib/components/Tracks.svelte';
    import Header from '$lib/components/Header.svelte';
	import Footer from '../../lib/components/Footer.svelte';

    import { getAuthorizationUrl, getAccessTokenFromUrlHash, getProfile, getTopTracks, getTopArtists, getTopTracksRecent, getTopArtistsRecent, getTopArtistsAllTime, getTopTracksAllTime } from '$lib/api/spotify';
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

    function loaded(): boolean {
        return (
            !profile &&
            !topTracks &&
            !topTracksRecent &&
            !topTracksAllTime &&
            !topArtists &&
            !topArtistsRecent &&
            !topArtistsAllTime
        );
    }

    import { onMount } from 'svelte';
	import Progress from '$lib/components/Progress.svelte';
    onMount(fetchStats);
</script>

<main>

    {#if    profile !== null &&
            topTracks !== null &&
            topTracksRecent !== null &&
            topTracksAllTime !== null &&
            topArtists !== null &&
            topArtistsRecent !== null &&
            topArtistsAllTime !== null
    }
        <Header profile={profile}/>

        <h2>Top Tracks</h2>
        <Tracks topTracks={topTracks}/>

        <h2>Top Artists</h2>
        <Artists topArtists={topArtists}/>

        <h2>Recent Top Tracks</h2>
        <Tracks topTracks={topTracksRecent}/>

        <h2>Recent Top Artists</h2>
        <Artists topArtists={topArtistsRecent}/>

        <h2>All Time Top Tracks</h2>
        <Tracks topTracks={topTracksAllTime}/>

        <h2>All Time Top Artists</h2>
        <Artists topArtists={topArtistsAllTime}/>
    {:else}
        <Progress/>
    {/if}

    <Footer/>
</main>

<style>
</style>

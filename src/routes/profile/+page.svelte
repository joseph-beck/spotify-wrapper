<script lang="ts">
    import Artists from '$lib/components/Artists.svelte';
	import Tracks from '$lib/components/Tracks.svelte';
    import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
    import Progress from '$lib/components/Progress.svelte';

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

    let currentTracks: TopTracks | null = null;
    let currentArtists: TopArtists | null = null;
    let selectedCategory: "short" | "medium" | "long" = "medium";

    function shortOnClick() {
        selectedCategory = "short";
        currentTracks = topTracksRecent;
        currentArtists = topArtistsRecent;
    }

    function mediumOnClick() {
        selectedCategory = "medium";
        currentTracks = topTracks;
        currentArtists = topArtists;
    }

    function longOnClick() {
        selectedCategory = "long";
        currentTracks = topTracksAllTime;
        currentArtists = topArtistsAllTime;
    }

    import { onMount } from 'svelte';
    onMount(async () => {
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

                currentTracks = topTracks;
                currentArtists = topArtists;
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        }
    });
</script>

<main>

    {#if    profile !== null &&
            topTracks !== null &&
            topTracksRecent !== null &&
            topTracksAllTime !== null &&
            topArtists !== null &&
            topArtistsRecent !== null &&
            topArtistsAllTime !== null &&
            currentTracks !== null &&
            currentArtists !== null
    }
        <Header profile={profile}/>

        <div>
            <div class="sm:hidden">
                <label for="Tab" class="sr-only">Tab</label>

                <select id="Tab" class="w-full rounded-md border-gray-200">
                    <option>Recent Favourites</option>
                    <option>Favourites</option>
                    <option>All Time Favouries</option>
                </select>
            </div>

            <div class="hidden sm:block">
                <nav class="flex gap-6" aria-label="Tabs">
                    <button
                        class="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        class:bg-gray-200={selectedCategory === "short"}
                        class:text-gray-700={selectedCategory === "short"}
                        on:click={shortOnClick}
                    >
                        Recent Favourites
                    </button>

                    <button
                        class="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        class:bg-gray-200={selectedCategory === "medium"}
                        class:text-gray-700={selectedCategory === "medium"}
                        on:click={mediumOnClick}
                    >
                        Favourites
                    </button>

                    <button
                        class="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        class:bg-gray-200={selectedCategory === "long"}
                        class:text-gray-700={selectedCategory === "long"}
                        on:click={longOnClick}
                    >
                        All Time Favouries
                    </button>
                </nav>
            </div>
        </div>

        <h2>Tracks</h2>
        <Tracks topTracks={currentTracks}/>
        <h2>Artists</h2>
        <Artists topArtists={currentArtists}/>
    {:else}
        <Progress percent={70}/>
    {/if}

    <Footer/>
</main>

<style>
</style>

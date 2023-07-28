<script lang="ts">
    import { getAuthorizationUrl, getAccessTokenFromUrlHash, getProfile, getUserProfileImage, getTopTracks, getTopArtists } from '$lib/api/spotify';
	import type { TopArtists, TopTracks, UserProfile } from '$lib/types/spotify';
    import { fly } from 'svelte/transition';

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
                console.log(profile);
                console.log(topTracks);
                console.log(topArtists);
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
        <div class="profile-info">
            <img src="{getUserProfileImage(profile)}" alt="User Profile"/>
            <p>{profile.display_name} {profile.product}</p>
        </div>
    {:else}
        {#if accessToken}
            <p>Loading profile data...</p>
        {:else}
            <p>Redirecting to Spotify authorization...</p>
        {/if}
    {/if}

    {#if topTracks !== null && topArtists !== null}
        <h2>Top Tracks</h2>
        <ul>
            {#each topTracks.items as track}
                <li transition:fly="{{ y: 50, duration: 1000 }}">
                    <div class="track-info">
                        <img src="{track.album.images[0]?.url}" alt="Track"/>
                        <p>{track.name} - {track.artists[0].name}</p>
                    </div>
                </li>
            {/each}
        </ul>

        <h2>Top Artists</h2>
        <ul>
            {#each topArtists.items as artist}
                <li transition:fly="{{ y: 50, duration: 1000 }}">
                    <div class="artist-info">
                        <img src="{artist.images[0]?.url}" alt="Artist"/>
                        <p>{artist.name}</p>
                    </div>
                </li>
            {/each}
        </ul>
    {:else}
        <p>Loading listening statistics...</p>
    {/if}
</main>

<style>
    .profile-info, .track-info, .artist-info {
        display: flex;
        align-items: center;
    }

    img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
    }
</style>

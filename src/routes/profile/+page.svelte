<script lang="ts">
    import { getAuthorizationUrl, getAccessTokenFromUrlHash, getProfile, getUserProfileImage } from '$lib/api/spotify';
	import type { UserProfile } from '$lib/types/spotify';

    let accessToken: string | null = getAccessTokenFromUrlHash();
    let profile: UserProfile | null = null;

    async function fetchProfile() {
        if (!accessToken) {
            window.location.href = getAuthorizationUrl();
        } else {
            try {
                const data = await getProfile(accessToken);
                console.log(data);
                profile = data;
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        }
    }

    import { onMount } from 'svelte';
    onMount(fetchProfile);
</script>

<main>
    <h1>Spotify Wrapper</h1>

    {#if profile !== null}
        <img src="{getUserProfileImage(profile)}" alt="User Profile"/>
        <p>{profile.display_name} {profile.product}</p>
    {:else}
        {#if accessToken}
            <p>Loading profile data...</p>
        {:else}
            <p>Redirecting to Spotify authorization...</p>
        {/if}
    {/if}
</main>

<style>

</style>
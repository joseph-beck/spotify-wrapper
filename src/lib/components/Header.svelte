<script lang="ts">
	import { getUserProfileImage } from "$lib/api/spotify";
	import type { UserProfile } from "$lib/types/spotify";

    export let profile: UserProfile;
</script>

<header>
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div class="flex items-center sm:justify-between sm:gap-4">
            <div class="text-center sm:text-left">
                <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Spotify Wrapper
                </h1>
            </div>

            <div
                class="flex flex-1 items-center justify-between gap-8 sm:justify-end"
            >
                <button
                    type="button"
                    class="group flex shrink-0 items-center rounded-lg transition"
                >
                    <span class="sr-only">Menu</span>
                    <img
                        alt="Man"
                        src="{getUserProfileImage(profile)}"
                        class="h-10 w-10 rounded-full object-cover"
                    />

                    <p class="ms-2 hidden text-left text-xs sm:block">
                        <strong class="block font-medium">{profile.display_name}</strong>
                        <span class="text-gray-500">{profile.product}</span>
                    </p>
                </button>
            </div>
        </div>
    </div>
</header>

<style>
</style>

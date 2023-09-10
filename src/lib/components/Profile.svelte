<script lang="ts">
	import { getUserProfileImage } from "$lib/api/spotify";
	import type { UserProfile } from "$lib/types/spotify";

    export let profile: UserProfile;
</script>

<div>
    <a
        href="{profile.external_urls.spotify}"
        target="_blank"
        class="group relative block bg-black"
    >
        <img
            alt="user"
            src="{getUserProfileImage(profile)}"
            class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
        />

        <div class="relative p-4 sm:p-6 lg:p-8">
            <p class="text-sm font-medium uppercase tracking-widest text-pink-500">
                {profile.display_name}
            </p>

            <div class="mt-32 sm:mt-48 lg:mt-64">
                <div
                    class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                >
                    <p class="text-sm text-white">
                        {profile.country} &nbsp;
                        {profile.product}
                    </p>
                </div>
            </div>
        </div>
    </a>
</div>

<style>
</style>

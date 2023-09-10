<script lang="ts">
	import type { TopTracks } from "$lib/types/spotify";
	import { fly } from "svelte/transition";


    export let topTracks: TopTracks;
</script>

<div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
    {#each topTracks.items as track}
        <a
            href="{track.external_urls.spotify}"
            target="_blank"
            class="group relative block bg-black"
        >
            <img
              alt="Track"
              src="{track.album.images[0]?.url}"
              class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            />

            <div class="relative p-4 sm:p-6 lg:p-8">
                <p class="text-sm font-medium uppercase tracking-widest text-pink-500">
                    {track.name}
                </p>

                <p class="text-xl font-bold text-white sm:text-2xl">{track.artists[0].name}</p>

                <div class="mt-32 sm:mt-48 lg:mt-64">
                    <div
                        class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                    >
                        <p class="text-sm text-white">
                            This song has a popularity of {track.popularity}
                        </p>
                    </div>
                </div>
            </div>
        </a>
    {/each}
</div>

<style>
</style>

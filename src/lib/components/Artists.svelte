<script lang="ts">
	import type { TopArtists } from "$lib/types/spotify";
    import "../../app.css"

    export let topArtists: TopArtists;
</script>

<div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
    {#each topArtists.items as artist}
        <a
            href="{artist.external_urls.spotify}"
            target="_blank"
            class="group relative block bg-black"
        >
            <img
              alt="Artist"
              src="{artist.images[0]?.url}"
              class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            />
          
            <div class="relative p-4 sm:p-6 lg:p-8">
                <p class="text-sm font-medium uppercase tracking-widest text-pink-500">
                    {artist.name}
                </p>
          
                <div class="mt-32 sm:mt-48 lg:mt-64">
                    <div
                        class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                    >
                        <p class="text-sm text-white">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis
                            perferendis hic asperiores quibusdam quidem voluptates doloremque
                            reiciendis nostrum harum. Repudiandae?
                        </p>
                    </div>
                </div>
            </div>
        </a>
    {/each}
</div>

<style>
</style>

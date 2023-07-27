<script>
	import { fetchProfile } from "$lib/api/profle";
    //import type { UserProfile } from "$lib/types/spotify";

    //let searchResponse: UserProfile = {};

    async function getUser() {
        let resp = fetchProfile("31ovzh427e7tjogeiw2x26ud5o54")
        let searchResponse = await resp;
        console.log(searchResponse);
    }
</script>

<section>
    <button on:click={getUser}>clcik</button>
</section>

<style>

</style>
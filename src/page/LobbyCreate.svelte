<script>
    import Lobby from './Lobby.svelte'

    export let state = {};
	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();
	function startRoom() {
		dispatch('startRoom');
	}

</script>

<main>
    <div class="container">
        <div class="message">Send this room name to your friends</div>
        <div class="graphic centered">down</div>
        <Lobby {state} />
        <button on:click={startRoom}>start</button>
    </div>
</main>

<style>
    button {
        width: 200px;
        padding: 10px;
    }
    .graphic{
        height: 50px;
        width: 50px;
    }
    .message{
        padding: 20px 0;
    }
    .container {
        flex-direction: column;
    }
</style>

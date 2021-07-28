<script>
    import { createEventDispatcher } from 'svelte';
    import Lobby from './Lobby.svelte'
    import page from 'page'

    export let state = {room: {}}
    let name = state.room.name

    let step = 1;

    let dispatch = createEventDispatcher();
    function joinRoom(e) {
        e.preventDefault();
        let roomId = e.target[0].value
        dispatch('joinRoom', {roomId})
    }

    $: if (state.room.name) {
        step++;
    }
</script>

<main>
    <div class="container">
        {#if step === 1}
        <form on:submit="{joinRoom}" action="">
            <input value="room" type="text">
            <button>join</button>
        </form>
        {:else}
        <Lobby {state} />
        <button>ready</button>
        {/if}

    </div>
</main>


<style>
    form {
        display: flex;
        flex-direction: column;
    }
    input {
        margin-bottom: 10px;
    }
    .container {
        padding-top: 100px;
        flex-direction: column;
    }
</style>
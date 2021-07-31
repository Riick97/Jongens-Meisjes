<script>
    import Lobby from './Lobby.svelte'
    import FloatingArrow from '../components/FloatingArrow.svelte'
    import Success from '../components/Success.svelte'
    import { fade, scale, fly } from 'svelte/transition';

    export let state = {};
	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();
	function startRoom() {
		dispatch('startRoom');
	}

    let justCreated = true
    setTimeout(() => {
        justCreated = false;
    }, 1500)

</script>

<main>
    <div class="container">
        <div class="header">
            {#if justCreated}
            <div class="wrapper-create">
                <div in:fly class="message">Room Created</div>
                <Success />
            </div>
            {:else}
            <div class="message">Send this room name to your friends</div>
            <FloatingArrow />
            {/if}
        </div>
        <Lobby {state} />
        <button on:click={startRoom}>start</button>
    </div>
</main>

<style>
    main {
        padding-top: 100px;
        height: 100vh;
        background-color: #f3f7fa;
    }
    button {
        width: 200px;
        min-height: 40px;
        padding: 10px;
        margin-top: 20px;
        background-color: hsl(196, 77%, 61%);
        border: none;
        border-radius: 5px;
        color: white;
    }
    .header{
        height: 140px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        border: #f3f7fa solid 3px;
        border-radius: 10px;
    }
    .message{
        padding: 20px 0;
        margin: 10px;
    }
    .container {
        flex-direction: column;
        padding: 10px;
        background-color: #fcfdff;
        border-radius: 10px;
        box-shadow: 0px 0px 5px 1px #00000027;
    }
    .wrapper-create{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>

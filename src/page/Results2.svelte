<script>
	import { createEventDispatcher } from 'svelte';
    import page from 'page'

    export let state = {};
    debugger;


	let dispatch = createEventDispatcher();

	function restart() {
        dispatch('restartRoom')
        
        if (state.room.uid === state.user.uid) {
            page('/lobbycreate')
        }else {
            page('/lobbyjoin')
        }
    }
</script>

<div class="container">
    <div class="wrapper-members">
        <!-- {#each state.room.finishedMembers as member, i}
        <div class="place">
            {i + 1}. {member.displayName} {#if state.user.uid === member.uid} (me) {/if} - time: {member.time}
        </div>
        {/each} -->
    </div>
    <div class="wrapper-restart">
        <button on:click={restart}>restart</button>
    </div>
</div>

<style>
    .container{
        flex-direction: column;
    }
    .wrapper-members{
        height: 200px;
    }
    .wrapper-restart{
        padding: 10px;
    }
</style>

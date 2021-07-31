<script>
	import { createEventDispatcher } from 'svelte';
	import MemberResult from '../components/MemberResult.svelte';

	import page from 'page';

	export let state = {};

	let dispatch = createEventDispatcher();

	function restart() {
		dispatch('restartRoom');

		if (state.room.uid === state.user.uid) {
			page('/lobbyjoin');
		} else {
			page('/lobbyjoin');
		}
	}
</script>

<div class="container">
	<div class="wrapper-members">
		{#each state.room.finishedMembers as member, i}
			<MemberResult {member} {state} {i} />
		{/each}
	</div>
	<div class="wrapper-restart">
		<button class="btnBlue" on:click={restart}>restart</button>
	</div>
</div>

<style>
	.container {
		flex-direction: column;
		padding-top: 100px;
	}
	.wrapper-members {
		height: 400px;
		width: 100%;
		padding: 10px;
		background-color: #f3f7fa;
        border-radius: 10px;
        box-shadow: 0px 0px 5px 1px #00000027;
        overflow-y: scroll;
	}

	.wrapper-restart {
		padding: 10px;
	}
	.btnBlue {
		width: 200px;
		min-height: 40px;
		padding: 10px;
		margin-top: 20px;
		background-color: hsl(196, 77%, 61%);
		border: none;
		border-radius: 5px;
		color: white;
	}
</style>

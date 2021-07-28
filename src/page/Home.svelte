<script>
	import { createEventDispatcher } from 'svelte';
	import page from 'page';

	let dispatch = createEventDispatcher();

	function createRoom() {
		dispatch('createRoom');
		page('/lobbycreate');
	}

	function joinRoom() {
		page('/lobbyjoin');
	}
</script>

<div class="container">
	<div class="logo centered">
		<h1>Jongens & Meisjes</h1>
	</div>
	<div class="wrapper-buttons">
		<button on:click={createRoom}>
			<div class="graphic" />
			<div class="name">create lobby</div>
		</button>
		<button on:click={joinRoom}> 
			<div class="graphic" />
			<div class="name">join lobby</div>
		</button>
	</div>
</div>

<style>
	button {
		width: 130px;
		margin: 4px;
		padding: 5px;
	}

	.graphic {
		height: 100px;
	}
	.container {
		flex-direction: column;
	}
	.logo {
		height: 400px;
	}
	.wrapper-buttons {
		display: flex;
	}
</style>

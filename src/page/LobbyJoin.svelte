<script>
	import { createEventDispatcher } from 'svelte';
	import Lobby from './Lobby.svelte';
	import FloatingArrow from '../components/FloatingArrow.svelte'
	import page from 'page';

	export let state = { room: {} };

	let step = 1;

	let dispatch = createEventDispatcher();
	function joinRoom(e) {
		e.preventDefault();
		let roomId = (e.target[0].value).toLowerCase();
		dispatch('joinRoom', { roomId });
	}

	function userReady() {
		dispatch('userReady');
	}

	function startRoom() {
		dispatch('startRoom');
	}

	$: if (state.room.name) {
		step++;
	}
</script>

<main>
	<div class="container">
		{#if step === 1}
			<form on:submit={joinRoom} action="">
				<div class="wrapper-up">
					<div class="message">Enter room name below</div>
					<FloatingArrow />
				</div>
				<input class="room" placeholder="room..." type="text" />
				<button class="btnBlue">join</button>
			</form>
		{:else}
		<div class="wrapper-down">
			<Lobby {state} />
			{#if state.room.uid === state.user.uid} 
			<button class="btnBlue" on:click={startRoom}>start</button>
			{:else}
			<button class="btnBlue" on:click={userReady}>ready</button>
			{/if}
		</div>
		{/if}
	</div>
</main>

<style>
	
	main {
		background-color: #f3f7fa;
		height: 100vh;
	}
	form {
		display: flex;
		height: 400px;
		width: 100%;
		padding: 10px;
		border-radius: 10px;
		background-color: white;
		flex-direction: column;
		box-shadow: 0px 0px 5px 1px #00000027;
	}
	input {
		margin-bottom: 10px;
	}
	.container {
		padding-top: 150px;
		flex-direction: column;
	}
	.wrapper-up {
		height: 150px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.wrapper-down {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 10px;
		border-radius: 10px;
		box-shadow: 0px 0px 5px 1px #00000027;
		background-color: #fcfdff;
	}
	.room {
		width: 100%;
		height: 40px;
		padding: 5px;
		font-size: 1.2rem;
	}
	.btnBlue {
		min-height: 40px;
		min-width: 200px;
		padding: 10px;
		margin-top: 20px;
		background-color: hsl(196, 77%, 61%);
		border: none;
		border-radius: 5px;
		color: white;
	}
</style>

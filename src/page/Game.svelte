<script>
	import { createEventDispatcher } from 'svelte';
	import page from 'page';
	import Counter from '../components/Countdown.svelte';
	import Letter from '../components/Letter.svelte';
	import WordInput from '../components/WordInput.svelte';
	import { fade, scale, fly } from 'svelte/transition';

	export let state = {};

	let letter = state.game.letter;
	let words = [];
	for (const property in state.game.words) {
		words.push({ property: property, word: state.game.words[property] });
	}

	let finished = false;
	let show = false;

	let dispatch = createEventDispatcher();

	function finishGame() {
		dispatch('finishGame');
		page('/results');
	}
</script>

<main>
	{#if !show}
		<div class="counter">
			<Counter on:ready={() => (show = true)} />
		</div>
	{/if}
	<form action="">
		<div transition:fly={{ y: 200, duration: 500 }} class="header centered">
			{#if finished}
				<button
					in:scale
					on:click={(e) => {
						e.preventDefault();
						finishGame();
					}}>finished</button
				>
			{:else}
				<Letter {letter} {show} />
			{/if}
		</div>
		{#if show}
			<div transition:fly={{ y: 200, duration: 500 }} class="container">
				{#each words as word}
					<WordInput
						{state}
						{word}
						on:submitWord
						on:finished={() => {
							finished = true;
						}}
					/>
				{/each}
			</div>
		{/if}
	</form>
</main>

<style>
	main {
		background-color: #f3f7fa;
		height: 100vh;
	}

	form {
		width: 100%;
	}

	button {
		height: 40px;
		width: 200px;
		border: none;
		border-radius: 10px;
		background-color: hsla(0, 0%, 100%, 80%);
	}
	.header {
		padding-top: 100px;
		padding-bottom: 50px;
		min-height: 200px;
		background-color: hsl(196, 77%, 61%);
		color: white;
		transition: ease 1000ms;
		box-shadow: 0px 0px 5px 1px #00000027;
		position: sticky;
		top: 0;
		left: 0;
		z-index: 1;
	}

	.container {
		flex-direction: column;
		padding-top: 20px;
	}
	.counter {
		padding-top: 100px;
		height: 300px;
	}
</style>

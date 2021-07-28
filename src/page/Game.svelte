<script>
	import { createEventDispatcher } from 'svelte';
	import page from 'page';
	import Counter from '../components/Countdown.svelte'
	import Letter from '../components/Letter.svelte'

	export let state = {};
	let letter = state.game.letter;

	let words = state.game.words;
	let finished = false;
	let show = false;

	function check() {
		let every = true;
		for (const property in state.game.words) {
			if (state.game.words[property] === '') every = false;
		}
		if (every) finished = true;
	}

	let dispatch = createEventDispatcher();
	function submitWord(word, category) {
		let letters = word.trim().split('')
		let same = letters[0].toLowerCase() === letter.toLowerCase()
		if (!same) return
		dispatch('submitWord', { word, category });
		check();
	}

	function finishGame() {
		dispatch('finishGame');
		page('/results');
	}
</script>

<main>
	{#if !show}
	<div class="counter">
		<Counter on:ready={() => show = true} />
	</div>
	{/if}
	<form action="">
		<div class="header centered">
			{#if finished}
				<button on:click={finishGame}>finished</button>
			{:else}
				<Letter {letter} {show} />
			{/if}
		</div>
		{#if show}
		<div class="container">
			<div class="wrapper-input">
				<label for="Boy">Boy</label>
				<input
					on:blur={(event) => {
						submitWord(event.target.value, 'boy');
					}}
					type="text"
					value="{letter}"
				/>
			</div>
			<div class="wrapper-input">
				<label for="Girl">Girl</label>
				<input
					on:blur={(event) => {
						submitWord(event.target.value, 'girl');
					}}
					type="text"
					value="{letter}"
				/>
			</div>
		</div>
		{/if}
	</form>
</main>

<style>
	label {
		display: block;
	}
	form {
		width: 100%;
	}
	.header {
		height: 100px;
	}
	.wrapper-input {
		padding: 10px 0;
		width: 100%;
	}
	.container {
		flex-direction: column;
	}
	.counter {
		height: 300px;
	}
</style>

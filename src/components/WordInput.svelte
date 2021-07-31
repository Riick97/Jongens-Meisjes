<script>
	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();

	export let state = {};
	export let word = {};
	let letter = state.game.letter;

	function hideKeyboard() {
		document.activeElement.blur();
	}

	function submitWord(word, category) {
		let letters = word.trim().split('');
		let same = letters[0].toLowerCase() === letter.toLowerCase();
		if (!same) return;
		dispatch('submitWord', { word, category });
		check();
	}

	function check() {
		let every = true;
		for (const property in state.game.words) {
			if (state.game.words[property] === '') every = false;
		}
		if (every) {
			dispatch('finished');
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}
</script>

<div class="wrapper-input">
	<label for={word.property}>{word.property.charAt(0).toUpperCase() + word.property.slice(1)}</label>
	<input
		on:keyup={(e) => {
			if (e.key === 'Enter' || e.keyCode === 13) {
				e.preventDefault();
				hideKeyboard();
			}
		}}
		on:blur={(event) => {
			event.preventDefault();
			submitWord(event.target.value, word.property);
		}}
		type="text"
		placeholder="{letter}..."
	/>
</div>

<style>
	.wrapper-input {
		padding: 20px;
		margin-bottom: 15px;
		border-radius: 10px;
		width: 100%;
		background-color: #fcfdff;
		box-shadow: 0px 0px 5px 1px #00000027;
	}

	input {
		padding: 5px;
		height: 40px;
		width: 100%;
		font-size: 1.2rem;
		margin-top: 5px;
		border-radius: 20px;
		border: 3px #f3f7fa;
	}

	label {
		display: block;
	}
</style>

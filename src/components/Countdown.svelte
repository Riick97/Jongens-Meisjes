<script>
    import {createEventDispatcher} from 'svelte'

    let dispatch = createEventDispatcher();

	let showNum = true;
    let showMessage = true;
	let number = 3;
	let message = '';

	function changeNumber() {
		if (number > 0) number--;
		else if (number >= 0 && message === '' && showMessage) {
			showNum = false;
            dispatch('ready')
			message = 'Ready';
		} else {
            message = ''
            showMessage = false
		}
	}

	setInterval(() => {
		changeNumber();
	}, 1000);
</script>

<div class="counter centered">
	{#if showNum}
		<h3 class="time">{number}</h3>
	{:else}
		<h3 class="message">{message}</h3>
	{/if}
</div>

<style>
	.time {
		font-size: 8rem;
	}
	.message {
		font-size: 5rem;
	}
</style>

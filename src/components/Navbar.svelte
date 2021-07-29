<script>
	import page from 'page';

	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();

	let location = window.location.pathname;

	window.onclick = recalculate;
	function recalculate() {
		location = window.location.pathname;
	}


</script>

<nav>
	<div class="container">
		{#if location !== '/'}
			<div on:click={() => {page('/'); dispatch('leaveRoom')}} class="left">home</div>
		{/if}
		<div class="right" />
	</div>
</nav>

<style>
	nav {
		height: 50px;
	}
	.container {
		justify-content: space-between;
		height: 100%;
	}
</style>

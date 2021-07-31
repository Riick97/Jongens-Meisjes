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
			<div on:click={() => {page('/'); dispatch('leaveRoom')}} class="left"><i class="fas fa-home"></i></div>
		{/if}
		<div class="right" />
	</div>
</nav>

<style>
	nav {
		height: 50px;
		width: 100%;
		position: fixed;
		z-index: 2;
		top: 0;
		right: 0;
		background-color: white;
		box-shadow: 0px 0px 5px 1px #00000027;
	}
	.left {
		font-size: 1.6rem;
	}
	.container {
		justify-content: space-between;
		height: 100%;
	}
</style>

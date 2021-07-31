<script>
	import { fade, scale, fly } from 'svelte/transition';
	export let member;
	export let state;
    export let i;
	let open = false;
	function setOpen() {
		open = !open;
	}
</script>

<div in:scale class="member" class:marginBottom='{!open}' >
	<div class="place centered">
		{i + 1}.
	</div>
	<div class="description">
		<div class="name">
			{member.displayName}
			{#if state.user.uid === member.uid} (me) {/if}
		</div>
		<div class="time">
			time: {member.time}
		</div>
	</div>
	<div class="words">
		<button on:click={setOpen} class="btnWords">words</button>
	</div>
</div>
{#if open}
	<div transition:fly={{ y: -20, duration: 200 }} class="dropdown">
		{#each member.words as word}
			<div class="answer">
				{word.property}: {word.word}
			</div>
		{/each}
	</div>
{/if}

<style>
	.member {
		background-color: #fcfdff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
        box-shadow: 0px 0px 5px 1px #00000027;
        border-radius: 10px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        transition: ease-in-out 200ms;
	}
	.place {
		width: 40px;
	}
	.time {
		padding-top: 10px;
	}
	.answer {
		padding: 10px;
	}
	.dropdown {
		background-color: #fcfdff;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
        margin-bottom: 10px;
        box-shadow: 0px 2px 5px 1px #00000027;
	}
	.btnWords {
		width: 100px;
		height: 50px;
		border: none;
		border-radius: 10px;
        background-color: hsl(196, 77%, 61%);
        color: white;
	}
    .marginBottom {
        margin-bottom: 10px;
        border-radius: 10px;
    }
</style>

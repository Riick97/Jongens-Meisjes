<script>
	export let state = {};
    let members

    $: {members = state.room.members; console.log(members)}
</script>

<div class="container">
	<div class="title">{state.room.name}</div>
	<div class="wrapper-members">
		<h3>Members</h3>
        <div class="wrapper-items">
            {#each members as member}
                <div class="member">
                    User{member}
                </div>
            {/each}
        </div>
	</div>
</div>

<style>
	h3 {
		margin-bottom: 10px;
	}
	.title {
		padding: 20px;
	}
	.container {
		flex-direction: column;
	}
	.wrapper-members {
		width: 100%;
		min-height: 200px;
		margin-top: 20px;
	}
    .wrapper-items {
        height: 200px;
        overflow-y: scroll;
    }
	.member {
		padding: 10px;
	}
</style>

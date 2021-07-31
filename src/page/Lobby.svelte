<script>
	export let state = {};


</script>

<div class="container">
	<div class="title"> <h2>{state.room.name}</h2> </div>
	<div class="wrapper-members">
		<h3>Members</h3>
        <div class="wrapper-items">
            {#each state.room.members as member}
                <div class="member">
                    <div class="left"> <p>{member.displayName} {#if member.uid === state.user.uid} (me) {/if}</p></div>
                    <div class="right">
                        {#if state.room.uid === member.uid}
                        <i class="fas fa-crown"></i>
                        {:else if !member.isReady}
                         <p>waiting</p>
                        {:else}
                         <p>ready</p>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
	</div>
</div>

<style>
	h3 {
		margin: 10px;
	}
    .fa-crown {
        font-size: 1.4rem;
    }
	.title {
		padding: 20px;
        width: 100%;
        text-align: center;
        border: #f3f7fa solid 3px;
        font-family: 'Poppins', sans-serif;
        font-weight: bold;
	}
	.container {
		flex-direction: column;
        width: 100%;
        margin-top: 10px;
        border: #f3f7fa solid 3px;
        border-radius: 10px;
	}
	.wrapper-members {
		width: 100%;
		min-height: 200px;
		margin-top: 20px;
	}
    .wrapper-items {
        height: 200px;
        overflow-y: scroll;
        background-color: #f3f7fa;
        padding: 10px;
    }
	.member {
		padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
        height: 50px;
        gap: 5px;
        background-color: #fcfdff;
	}
</style>

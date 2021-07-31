<script>
	import { createEventDispatcher } from 'svelte';
	import page from 'page';

	let dispatch = createEventDispatcher();

	function createRoom() {
		dispatch('createRoom');
		page('/lobbycreate');
	}

	function joinRoom() {
		page('/lobbyjoin');
	}
</script>

<section id="home">
	<div class="backg"></div>
	<div class="container">
		<div class="logo centered">
			<h1>Jongens & Meisjes</h1>
		</div>
		<div class="wrapper-buttons">
			<div class="card boy" on:click={createRoom}>
				<div class="graphic" />
				<div class="name"> <button>create room</button></div>
			</div>
			<div class="card girl" on:click={joinRoom}> 
				<div class="graphic" />
				<div class="name"><button>join room</button></div>
			</div>
		</div>
	</div>
</section>

<style>
	h1 {
		font-size: 2rem;
		font-family: 'Anton', sans-serif;
		color: #252525;
	}
	button {
		min-height: 30px;
		width: 150px;
		padding: 5px;
		border-radius: 15px;
		border: none;
		background-color: hsla(0, 0%, 100%, 80%);
	}
	
	.card {
		width: 270px;
		margin: 15px;
		padding: 5px;
		border-radius: 5px;
		color: white;
		box-shadow: 0px 0px 5px 1px #00000027;
	}
	.name {
		display: flex;
		justify-content: center;
		padding: 5px;
	}
	.backg {
		position: absolute;
		top: 0;
		left: 0;
		background-color: #f3f7fa;
		z-index: -1;
		height: 100vh;
		width: 100vw;
	}
	#home {
		height: 100vh;
		background: linear-gradient(to top, rgba(255,255,255,0.5) 50%,
              rgba(255,255,255,1) 90%), url('gender3.svg');
		background-size: cover;
	}

	.graphic {
		height: 190px;
	}
	.container {
		flex-direction: column;
	}
	.logo {
		height: 150px;
		margin-top: 40px;
	}
	.wrapper-buttons {
		display: flex;
		flex-direction: column;
	}

	.boy {
		background-color: hsl(196, 77%, 61%);
	}
	.boy .graphic {
		background-image: url('boy.png');
		background-size: 70%;
		background-repeat: no-repeat;
		background-position-x: center;

	}
	.girl {
		background-color: #ffc2d4;
	}
	.girl .graphic {
		background-image: url('girl2.png');
		background-size: cover;
		background-repeat: no-repeat;
		background-position-x: center;
		transform: translateX(-10px);
	}
</style>

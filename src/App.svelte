<script>
	import page from 'page';
	import * as jongMeisj from './jongens-meisjes';
	import * as db from './db';
	import Navbar from './components/Navbar.svelte';
	import Home from './page/Home.svelte';
	import LobbyCreate from './page/LobbyCreate.svelte';
	import LobbyJoin from './page/LobbyJoin.svelte';
	import Game from './page/Game.svelte';
	import Results from './page/Results.svelte';

	let state = { room: {} };
	createUser();

	function createUser() {
		state.user = jongMeisj.createUser();
	}

	async function joinRoom(e) {
    let roomId = e.detail.roomId
    let cb = function(dbRoom) {state.room = dbRoom}
    state.room = await db.listenToDB(roomId, state.room, cb)
    jongMeisj.joinRoom(state.room, state.user)
    db.updateRoom(state.room.name, state.room)
	}

	async function createRoom() {
		state.room = jongMeisj.createRoom(state.user, `room${Math.floor(Math.random() * 100000)}`);
    await db.addRoomToDB(state.room.name, state.room)
    let cb = function(dbRoom) {state.room = dbRoom}
    await db.listenToDB(state.room.name, state.room, cb)
	}

	function startRoom() {
		jongMeisj.readyRoom(state.room);
		state.room.started = true;
		db.updateRoom(state.room.name, state.room);
	}

	function restartRoom() {
		jongMeisj.restartRoom(state.room);
    state.game = jongMeisj.createGame(state.room.letter)
	}

	function submitWord(e) {
		jongMeisj.submitWord(state.game, { category: e.detail.category, word: e.detail.word });
	}

	function finishGame() {
		jongMeisj.finishGame(state.game, state.room, state.user);
	}

	$: if (state.room.started) {
		state.game = jongMeisj.createGame(state.room.letter);
    state.game.startTime = Date.now();
		page('/game');
	}

	//routing
	let component;
	page('/', () => (component = Home));
	page('/lobbycreate', () => (component = LobbyCreate));
	page('/lobbyjoin', () => (component = LobbyJoin));
	page('/game', () => (component = Game));
	page('/results', () => (component = Results));
	page.start();
</script>

<Navbar />
{#if component === Home} <Home on:createRoom={createRoom} />{/if}
{#if component === LobbyCreate} <LobbyCreate on:startRoom={startRoom} {state} />{/if}
{#if component === LobbyJoin} <LobbyJoin on:joinRoom={joinRoom} {state} />{/if}
{#if component === Game} <Game on:submitWord={submitWord} on:finishGame={finishGame} {state} />{/if}
{#if component === Results} <Results on:restartRoom={restartRoom} {state} />{/if}

<style>
</style>

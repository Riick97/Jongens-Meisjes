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
	import * as user from './user';


	let state = { room: {} };
	createUser();

	function createUser() {
		state.user = jongMeisj.createUser();
		function cb(authUid) {
			state.user.uid = authUid;
			state.user.displayName = `User-${authUid.substring(0, 6)}`;
		}
		user.signIn(cb);
		user.listen(cb);
	}

	async function joinRoom(e) {
		let roomId = e.detail.roomId;
		let cb = function (dbRoom) {
			state.room = dbRoom;
		};
		await db.listenToDB(roomId, state.room, cb);
		jongMeisj.joinRoom(state.room, state.user);
		db.updateRoom(state.room.name, state.room);
	}

	async function createRoom() {
		state.room = jongMeisj.createRoom(state.user, `room${Math.floor(Math.random() * 100000)}`);
		await db.addRoomToDB(state.room.name, state.room);
		let cb = function (dbRoom) {
			state.room = dbRoom;
		};
		await db.listenToDB(state.room.name, state.room, cb);
	}

	function startRoom() {
		let start = jongMeisj.readyRoom(state.room);
		if (!start) return;

		state.room.started = true;
		state.room.finishedMembers = [];
		db.updateRoom(state.room.name, state.room);
	}

	function restartRoom() {
		jongMeisj.restartRoom(state.room);
		if (state.room.uid !== state.user.uid) {
			jongMeisj.userUnReady(state.room, state.user);
		}
		state.game = jongMeisj.createGame(state.room.letter);
		db.updateRoom(state.room.name, state.room);
	}

	function leaveRoom() {
		if (!state.room.name) return;
		jongMeisj.leaveRoom(state.room, state.user);
		db.updateRoom(state.room.name, state.room);

		if (state.room.uid === state.user.uid) db.deleteRoom(state.room.name);
		else {
			let cb = function (dbRoom) {
				state.room = dbRoom;
			};
			db.listenToDB('null', null, cb);
		}
	}

	function submitWord(e) {
		jongMeisj.submitWord(state.game, { category: e.detail.category, word: e.detail.word });
	}

	function finishGame() {
		jongMeisj.finishGame(state.game, state.room, state.user);
		state.room.started = false;
		db.updateRoom(state.room.name, state.room);
	}

	function userReady() {
		jongMeisj.userReady(state.room, state.user);
		db.updateRoom(state.room.name, state.room);
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

<Navbar on:leaveRoom={leaveRoom} />
{#if component === Home} <Home on:createRoom={createRoom} />{/if}
{#if component === LobbyCreate} <LobbyCreate on:startRoom={startRoom} {state} />{/if}
{#if component === LobbyJoin}
	<LobbyJoin on:joinRoom={joinRoom} on:userReady={userReady} on:startRoom={startRoom} {state} />{/if}
{#if component === Game} <Game on:submitWord={submitWord} on:finishGame={finishGame} {state} />{/if}
{#if component === Results} <Results on:restartRoom={restartRoom} {state} />{/if}

import { uid } from './user'
import * as db from './db'

export function createGame(letter){
    let game = {}
    game.letter = letter
    game.words = {
        boy: '',
        girl: ''
    }
    game.finished = false;  
    
    return game;

}

export function submitWord(game, {category, word}){
    game.words[category] = word;
}

export function finishGame(game, room, user){
    game.finished = true;
    game.finishedTime = Date.now()
    let elapsedTime = (game.finishedTime - game.startTime) / 1000;
    if (room.finishedMembers.length === 0) {user.wins++}
    else {user.losses++}
    room.finishedMembers.push({uid: user.uid, time: elapsedTime.toFixed(1) + ' seconds'})
}

function getRandomLetter() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    function generateString(length) {
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    return generateString(1)
}

export function createRoom(user, name){
    let room = {};
    room.id = Date.now()
    room.name = name
    room.members = [user.uid];
    room.finishedMembers = [];
    room.uid = user.uid;
    room.started = false;
    room.letter = getRandomLetter();
    user.room = room.id;
    return room;
}

export function restartRoom(room){
    room.letter = getRandomLetter();
    room.started = false;
}

export function joinRoom(room, user){
    room.members.push(user.uid);
    user.room = room.id;
}

export function leaveRoom(room, user) {
    room.members = room.members.filter(id => id != user.uid)
    user.room = null
}

export function createUser(){
    let user = {}
    user.uid = Math.floor(Math.random() * 1000)
    user.room = null;
    user.wins = 0;
    user.losses = 0;
    return user;
}

export function readyRoom(room) {
    room.started = true;
}

function story1() {
    
    //Users login
    let user1 = createUser()
    let user2 = createUser()
    let user3 = createUser()
    let user4 = createUser()
    
    //User 1 creates a room
    let state1 = {}
    let room = createRoom(user1, 'myRoom')
    state1.user = user1
    state1.room = room
    db.createListenRoomDB(room)
    
    
    //User 2 joins the room
    let state2 = {}
    let room2 = {}
    db.listenToDB(room.id, room2)
    joinRoom(room2, user2)
    state2.user = user2
    state2.room = room2
    db.updateRoom(room2.name, room)
    
    //User 1 sets the room as ready
    readyRoom(state1.room)
    db.updateRoom(state1.room.name, state1.room)
    
    //User 1 starts playing
    let game1 = createGame(room.letter)
    submitWord(game1, {category: 'boy', word: 'Alex'})
    submitWord(game1, {category: 'girl', word: 'Alexis'})
    
    //User 2 starts playing
    let game2 = createGame(room.letter)
    submitWord(game2, {category: 'boy', word: 'Alec'})
    submitWord(game2, {category: 'girl', word: 'Alemar'})
    
    //User 1 finishes playing
    finishGame(game1, room, user1)
    db.updateRoom(room.name, room)
    
    //User 2 finishes playing
    finishGame(game2, room, user2)
    db.updateRoom(room.name, room)
}    


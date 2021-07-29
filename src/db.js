import {
    db
} from './firebase';

let collectionRef = db.collection('rooms')

export async function createListenRoomDB(room) {
    await addRoomToDB(room.name, room)
    await listenToDB(room.name, room)
}

export function addRoomToDB(roomId, room) {
    return new Promise((res, rej) => {
        collectionRef.doc(roomId).set(room)
            .then(() => {
                console.log("Document successfully written!");
                res()
            })
            .catch(() => {
                console.log('Something went wrong')
                rej()
            });
    })
}

export function listenToDB(roomId, room, cb) {
    return new Promise((res, rej) => {
        collectionRef.doc(roomId).onSnapshot((doc) => {
            console.log("Listening: ", doc.data());
            room = doc.data();
            if (!room) room = {}
            if (cb) cb(room)
            res(room);
        });
    })
}

export function updateRoom(roomId, room) {
    return new Promise((res, rej) => {
        collectionRef.doc(roomId).update(
            room
        )
        res()
    })
}

export function deleteRoom(roomId) {
    return new Promise((res, rej) => {
        collectionRef.doc(roomId).delete()
        res()
    })
}
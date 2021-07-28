import { auth } from './firebase'

export let uid;

auth.signInAnonymously()
    .then((user) => {
        console.log(user)
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });

auth.onAuthStateChanged((user) => {
    if (user) {
        uid = user.uid;
    } else {
        uid = null
    }
});
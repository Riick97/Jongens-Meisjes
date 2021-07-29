import {
    auth
} from './firebase'


export function signIn(cb) {
    auth.signInAnonymously()
        .then((data) => {
            console.log(data)
            cb(data.user.uid)
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
}

export function listen(cb) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            cb(user.uid)
        } else {
            cb(null)
        }
    });
}
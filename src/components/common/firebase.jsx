import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

const firebaseConfig = {
    apiKey: import.meta.env.REACT_APP_APIKEY,
    authDomain: import.meta.env.AUTHDOMAIN,
    projectId: import.meta.env.PROJECTID,
    storageBucket: import.meta.env.STORAGEBUCKET,
    messagingSenderId: import.meta.env.MESSAGINGSENDERID,
    appId: import.meta.env.APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

const auth = getAuth(app)

export const authWithGoogle = async () => {
    let user = null;
    await signInWithPopup(auth, provider)
        .then((result) => {
            user = result.user
        })
        .catch((err) => {
            console.log(err)
        })
    return user
}

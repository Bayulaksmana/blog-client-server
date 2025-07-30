import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCQU6vh6uXAj4y8ERLa_MGTBBTiOQ3Ls70",
    authDomain: "blogapp-f412c.firebaseapp.com",
    projectId: "blogapp-f412c",
    storageBucket: "blogapp-f412c.firebasestorage.app",
    messagingSenderId: "733127438908",
    appId: "1:733127438908:web:33c896a91c918bfb560939"
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

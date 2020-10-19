import firebase from 'firebase/app'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyDIRZf1lOd2bp1txqAPtEf40vjwB99BfSA",
    authDomain: "auth-development-41d20.firebaseapp.com",
    databaseURL: "https://auth-development-41d20.firebaseio.com",
    projectId: "auth-development-41d20",
    storageBucket: "auth-development-41d20.appspot.com",
    messagingSenderId: "720027852780",
    appId: "1:720027852780:web:f5b7be070efa254564aac9"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth()

export default app
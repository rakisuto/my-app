import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCNBgT5bJb91_DZJUYaxoQmDjYIy7PQxf8",
    authDomain: "shrimp-chatapp.firebaseapp.com",
    projectId: "shrimp-chatapp",
    storageBucket: "shrimp-chatapp.appspot.com",
    messagingSenderId: "803304616199",
    appId: "1:803304616199:web:1bdc89474fd375c2aa95a2",
    measurementId: "G-BDS06VSPS5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
import { initializeApp } from 'firebase/app'; 
import { getAuth } from 'firebase/auth'; 
import { collection, getFirestore } from 'firebase/firestore'; 

import config from './config.js'; 

const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId, 
    measurementId: config.measurementId
};


let app = initializeApp(firebaseConfig); 
const auth = getAuth(app); 
const db = getFirestore(app); 

const workoutsDB = collection(db, 'workouts');

export {
    auth,
    db,
    workoutsDB,
}
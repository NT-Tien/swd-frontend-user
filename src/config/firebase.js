import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const app = initializeApp({
    apiKey: 'AIzaSyAKjqYAZczdJ-xdRh1e40uMmrA8I65wRHc',
    authDomain: 'swd-spring2024.firebaseapp.com',
    projectId: 'swd-spring2024',
    storageBucket: 'swd-spring2024.appspot.com',
    messagingSenderId: '4472975611',
    appId: '1:4472975611:web:bdaafd39c6d66c9ec4405e',
})

export const auth = getAuth(app)

export const db = getFirestore(app)

export const storage = getStorage(app)

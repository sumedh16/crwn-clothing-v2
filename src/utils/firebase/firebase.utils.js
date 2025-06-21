import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";

import { getFirestore, getDoc, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4aECHm1aPaj5GeUUGssQnM9NBtw2T9UU",
  authDomain: "fir-project-e436f.firebaseapp.com",
  projectId: "fir-project-e436f",
  storageBucket: "fir-project-e436f.firebasestorage.app",
  messagingSenderId: "119835634066",
  appId: "1:119835634066:web:7e4353e034a04d65c1794b",
  measurementId: "G-RYW5ZWFPM7",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const db = getFirestore(firebaseApp);

export const createUserProfileDocument = async (userAuth) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth?.uid);

  const userSnapshot = await getDoc(userDocRef);
  // If user data does not exist, create it
  if (!userSnapshot.exists()) {
    const { displayName, email, emailVerified } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        emailVerified,
      });
    } catch (error) {
      console.error("Error creating user", error.message);
    }
  }
  return userDocRef;
};

export const signInWithEmailAndPasswordHandler = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  return await signOut(auth);
}

export const onAuthStateChangedListener = (callback) => {
  // this follows observer pattern - on unsubscribe, it will stop listening to auth state changes and call complete callback
  // It will call the callback function whenever the authentication state changes
  onAuthStateChanged(auth, callback);
}

export const updateUserDetails = async (user, displayName) => {
  if (!user || !displayName) return;

  try {
    await updateProfile(user, { displayName });
  } catch (error) {
    console.error("Error updating user details", error.message);
  }
}

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// getFirestore is for getting (a singleton instantiating) the DB
// doc is for getting the Doc
// getDoc and setDoc is for getting and setting the Doc Data
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6tl-xPyxWO8940KkrwH-jKbrRIjuHJxM",
  authDomain: "crwn-clothing-db-19e64.firebaseapp.com",
  projectId: "crwn-clothing-db-19e64",
  storageBucket: "crwn-clothing-db-19e64.appspot.com",
  messagingSenderId: "52263769083",
  appId: "1:52263769083:web:faf1cf89e91ee91d89715e",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

// util methods for access of Doc
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  // if userSnapshot (ie. the Doc for the user) does not exist.
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

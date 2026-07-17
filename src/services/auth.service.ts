import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase"
import type { AuthUser } from "../types/auth.types";

const googleProvider = new GoogleAuthProvider();

export const signupService = async (email: string, password: string) => {
  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  const uid = credentials.user.uid;
  await setDoc(doc(db, 'users', uid), {
    email,
    role: "customer",
  });
};

export const loginService = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const singinWithGoogleService = async () => {
  const credentials = await signInWithPopup(auth, googleProvider);
  const user = credentials.user;

  const userRef = doc(db, 'users', user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(
      userRef,
      {
        email: user.email,
        role: "customer",
      },
      {
        merge: true,
      },
    );
  }
};

export const signoutService = async () => {
  await signOut(auth);
};

export const getUserProfile = async (uid: string): Promise<AuthUser | null> => {
  const snapshot = await getDoc(doc(db, "users", uid));

  if (!snapshot.exists()) {
    return null;
  }
  const data = snapshot.data();

  return {
    uid,
    email: data.email,
    role: data.role,
  };
};
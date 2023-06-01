import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, User, signInWithPopup, browserSessionPersistence, onAuthStateChanged } from "firebase/auth";

import { app } from "utils/db";

type UserContext = {
  user?: User;
  setUser: (u: User) => void;
  signIn: () => void;
  loading: boolean,
}

const initialState: UserContext = {
  user: undefined,
  setUser: () => {},
  signIn: () => {},
  loading: true,
};

export const UserContext = createContext<UserContext>(initialState);

export const useUserContext = () => useContext(UserContext);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(auth.currentUser || undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
      setLoading(false);
    })
  }, []);

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // TODO: display error
        console.error(errorMessage);
      });
  }

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      signIn,
      loading,
    }}>
      {children}
    </UserContext.Provider>
  );
}
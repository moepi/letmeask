import { createContext, ReactNode, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { auth, firebase } from "../services/firebase";

type AuthContextType = {
  user: User | undefined,
  signInWithGoogle: () => Promise<void>,
  signOutGoogle: () => void
}

type User = {
  id: string,
  name: string,
  avatar: string,
  email: string
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, email, uid } = user;

        if (!displayName || !photoURL || !email) {
          throw new Error('Missing information from Google Account.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
          email: email,
        });
      }
    });

    return () => {
      unsubscribe();
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);
    if (result.user) {
      const { displayName, photoURL, uid, email } = result.user;

      if (!displayName || !photoURL || !email) {
        throw new Error('Missing information from Google Account.');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
        email: email
      });
    }
  }

  function signOutGoogle() {
    auth.signOut();
    setUser(undefined);
    history.push('/');
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOutGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
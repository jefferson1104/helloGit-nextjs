import React, { createContext, useState, useEffect} from "react";
import { auth, firebase } from "../services/firebase";

export const AuthContext = createContext();

export function AuthContextProvider(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {

      if (user) {
        const { id, login, avatar_url } = user;

        if (!login || !avatar_url) {
          throw new Error('Missing information from GitHub.');
        }

        setUser({
          id: id,
          login: login,
          avatar: avatar_url
        });
      }
    });

    return () => {
      unsubscribe();
    }
  }, [])

  async function signInWithGithub() {
    const provider = new firebase.auth.GithubAuthProvider();

    const result = await auth.signInWithPopup(provider);
    console.log('DADOS DA API', result.additionalUserInfo.profile)

    if (result.additionalUserInfo.profile) {
      const { id, login, avatar_url } = result.additionalUserInfo.profile

      if (!login || !avatar_url) {
        throw new Error('Missing information from Github Account.');
      }

      setUser({
        id: id,
        login: login,
        avatar: avatar_url
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGithub }}>
      {props.children}
    </AuthContext.Provider>
  )
}
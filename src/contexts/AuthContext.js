import React, { createContext, useState, useEffect} from "react";
import { auth, firebase } from "../services/firebase";
import nookies from 'nookies';

export const AuthContext = createContext();

export function AuthContextProvider(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { id, login, avatar_url } = user;

        if (!login || !avatar_url) {
          throw new Error('Missing information from GitHub account.');
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
  }, []);

  useEffect(() => {
    const cookies = nookies.get().USER_DATA;

    if(!user) {
      setUser(cookies);
    }
  }, []);

  async function signInWithGithub() {
    const provider = new firebase.auth.GithubAuthProvider();
    const result = await auth.signInWithPopup(provider);

    if (result.additionalUserInfo.profile) {
      const { id, login, avatar_url } = result.additionalUserInfo.profile

      if (!login || !avatar_url) {
        throw new Error('Missing information from Github Account.');
      }

      setUser({
        id: id,
        login: login,
        avatar: avatar_url
      });

      const userData = JSON.stringify({
        id: id,
        login: login,
        avatar: avatar_url
      });

      nookies.set(null, 'USER_DATA', userData, {
        path: '/',
        maxAge: 86400 * 7
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGithub }}>
      {props.children}
    </AuthContext.Provider>
  )
}
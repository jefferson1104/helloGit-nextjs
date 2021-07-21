import React, { createContext, useState, useEffect} from "react";
import Router from 'next/router';
import cookie from 'js-cookie';

import firebase from '../services/firebase';

export const AuthContext = createContext();

// funcao para formatar o objeto
const formatUser = async (user) => ({
  uid: user.id,
  login: user.login,
  name: user.name,
  email: user.email,
  avatar: user.avatar_url,
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // funcao para adicionar o usuario formatado no estado
  const handleUser = async (currentUser) => {
    if (currentUser) {
      const formatedUser = await formatUser(currentUser);
      setUser(formatedUser);
      setSession(true);
      return formatedUser.login;
    }
    setUser(false);
    setSession(false);
    return false;
  }

  // funcao para salvar dados nos cookies
  const setSession = (session) => {
    if (session) {
      cookie.set('user-auth', session, {
        expires: 1,
      });
    } else {
      cookie.remove('user-auth');
    }
  }
 
  // funcao para fazer login
  const signin = async () => {
    try {
      setLoading(true);
      const response = await firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider());

      handleUser(response.additionalUserInfo.profile);
      Router.push('/');
    } finally {
      setLoading(false);
    }
  }

  // funcao para fazer logout
  const signout = async () => {
    try {
      Router.push('/login');
      await firebase.auth().signOut();
      handleUser(false);
      
    } finally {
      setLoading(false);
    }
  }

  // Recupera as informacoes do login caso a tela atualizar ou ser redirecionado
  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signin, signout}}>
      { children }
    </AuthContext.Provider>
  );
}

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;
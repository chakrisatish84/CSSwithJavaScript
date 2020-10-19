import { resolveAny } from "dns";
import { User } from "firebase";
import React, { useState, useContext, useEffect } from "react";
import { auth } from "../firebase";

interface IAuthProps {
  currentUser: firebase.User | null;
  signup: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

export const AuthContext = React.createContext<IAuthProps>({
  currentUser: null,
  signup: (email: string = "", password: string = "") => {
    return auth.createUserWithEmailAndPassword(email, password);
  },
  login: (email: string = "", password: string = "") => {
    return auth.signInWithEmailAndPassword(email, password);
  },
  logout: () => {
    return auth.signOut(); // returns promise
  },
  resetPassword: (email: string = "") => {
    return auth.sendPasswordResetEmail(email);
  },
  updateEmail: (email: string = "") => {
    return new Promise<void>((resolve) => resolve());
  },
  updatePassword: (password: string = "") => {
    return Promise.resolve(undefined);
  },
});

export interface IAuthContextProps {
  children: React.ReactNode;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FunctionComponent<IAuthContextProps> = (
  props: React.PropsWithChildren<IAuthContextProps>
) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    //this will be called after createuserWithEmailAndPassword function
    const unSubscribe = auth.onAuthStateChanged(
      (user: firebase.User | null) => {
        setCurrentUser(user);
        setLoading(false);
      }
    );

    return unSubscribe;
  }, []);

  const signup = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password); // returns promise
  };

  const login = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password); // returns promise
  };

  const logout = () => {
    return auth.signOut(); // returns promise
  };

  const resetPassword = (email: string) => {
    return auth.sendPasswordResetEmail(email);
  };

  const updateEmail = (email: string) => {
    return !!currentUser
      ? currentUser.updateEmail(email)
      : new Promise<void>((resolve) => resolve());
  };

  const updatePassword = (password: string) => {
    return !!currentUser
      ? currentUser.updatePassword(password)
      : new Promise<void>((resolve) => resolve());
  };

  const value = {
    currentUser: currentUser,
    signup: signup,
    login: login,
    logout: logout,
    resetPassword: resetPassword,
    updateEmail: updateEmail,
    updatePassword: updatePassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};

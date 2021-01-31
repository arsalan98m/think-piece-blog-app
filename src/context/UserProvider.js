import { createContext, useContext, useState, useEffect } from "react";

import { auth, createUserProfileDocument } from "../firebase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  let unsubscribeFromAuth = null;

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          setUser({ uid: snapshot?.uid, ...snapshot.data() });
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribeFromAuth();
  }, []);

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  return (
    <UserContext.Provider value={{ user, resetPassword }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserProvider = () => useContext(UserContext);

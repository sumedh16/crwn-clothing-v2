import { createContext, useState, useEffect } from "react";
import { createUserProfileDocument, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

export const  userContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setCurrentUser(user);
      createUserProfileDocument(user); // Ensure user profile is created or updated in Firestore
      console.log("sumedh ,User state changed:", user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

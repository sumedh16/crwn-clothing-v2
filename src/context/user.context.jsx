import { createContext, useEffect, useReducer } from "react";
import { createUserProfileDocument, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

export const  userContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
}

const userReducer = (state,action) => {
  const {type, user} = action;
  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: user,
      }
    }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
}

export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  const [state, dispatch] = useReducer(userReducer, { currentUser: null });
  const { currentUser } = state;

  const setCurrentUser = (user) => {
    dispatch({type: 'SET_CURRENT_USER', user})
  }

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log("sumedh auth state changed",user);
      setCurrentUser(user);
      createUserProfileDocument(user); // Ensure user profile is created or updated in Firestore
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

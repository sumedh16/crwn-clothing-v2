import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
  categories: [],
  setCategories: () => null,
});

export const CategoriesContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const value = { categories, setCategories };

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesMap = await getCategoriesAndDocuments();
      setCategories(categoriesMap);
    };

    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories]);
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

import { createContext, useState } from "react";

export const SpinnerContext = createContext({
    isSpinnerOpen: false,
    setIsSpinnerOpen: () => {},
});

export const SpinnerContextProvider = ({ children }) => {

    const [isSpinnerOpen, setIsSpinnerOpen] = useState(false);

    const value = {
        isSpinnerOpen,
        setIsSpinnerOpen,
    };

    return (
        <SpinnerContext.Provider value={value}>
            {children}
        </SpinnerContext.Provider>
    );
}
"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
}
export const AppContextProvider = ({ children }) => {
    const [acceptingFiles, setAcceptingFiles] = useState(false);
    return (
        <AppContext.Provider value={{ 
            acceptingFiles,
            setAcceptingFiles
        }}>
            {children}
        </AppContext.Provider>
    );
}
import { useState, useContext } from 'react';
import { createContext } from 'react';
import { Loader } from '/src/components/Loader/Loader.jsx'

export const LoadingContext = createContext();

export const LoadingContextProvider = ({children}) => {
    const [isLoading, setLoading] = useState(false)

    return (
        <LoadingContext.Provider value={{isLoading, setLoading}} >
            {children}
            {isLoading && <Loader />}
        </LoadingContext.Provider>
    )
}
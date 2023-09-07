import { createContext } from 'react';

export const ScreenSizeContext = createContext();

export const ScreenSizeContextProvider = ({children}) => {
    return (
        <ScreenSizeContext.Provider value={{}}></ScreenSizeContext.Provider>
    ) 
}

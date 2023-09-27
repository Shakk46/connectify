import { createContext, useContext, useEffect, useState } from 'react';

export const ScreenSizeContext = createContext('no value');

export const ScreenSizeContextProvider = ({children}) => {
    const getSize = () => {
        return {
            width:window.screen.width,
            height:window.screen.height
        }
    }

    const [screenSize, setScreenSize] = useState(getSize())
    // console.log(screenSize);

    

    window.onresize = () => {
        setScreenSize(getSize())
    }

    return (
        <ScreenSizeContext.Provider value={screenSize}>
            {children}
        </ScreenSizeContext.Provider>
    ) 
}

export const ScreenContext = () => {
    console.log(useContext(ScreenSizeContext))
    return useContext(ScreenSizeContext)
}
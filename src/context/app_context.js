import { useState, createContext } from 'react';

export const AppContext = createContext();

// we take in props because we want access to the children
const AppContextProvider = (props) => {
    const [pair, setPair] = useState();
    const [stuff, setStuff] = useState("This is some stuff")
    const [activeCat, setActiveCat] = useState('Sandwiches')

    return (
        <AppContext.Provider value={{
            pair, setPair,

            stuff, setStuff,

            activeCat, setActiveCat
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
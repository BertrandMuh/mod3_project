import { useState, createContext } from 'react';

export const AppContext = createContext();

// we take in props because we want access to the children
const AppContextProvider = (props) => {
    const [pairList, setPairList] = useState([]);
    const [user, setUser] = useState(false)
    const [favorite, setFavorite] = useState([])


    return (
        <AppContext.Provider value={{
            pairList, setPairList,
            user, setUser,
            favorite, setFavorite

        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
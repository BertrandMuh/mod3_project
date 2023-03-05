import { useState, createContext } from 'react';

export const AppContext = createContext();

// we take in props because we want access to the children
const AppContextProvider = (props) => {
    const [pairList, setPairList] = useState([]);
    const [user, setUser] = useState(false);
    //trades and favorites
    const [favorite, setFavorite] = useState([]);
    const [openTrade, setOpenTrade] = useState([])


    return (
        <AppContext.Provider value={{
            pairList, setPairList,
            user, setUser,
            favorite, setFavorite,
            openTrade, setOpenTrade

        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
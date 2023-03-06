import { useState, createContext } from 'react';
import { getFavoritesAndTrades, getUserFromSession } from '../components/serverCall';

export const AppContext = createContext();

// we take in props because we want access to the children
const AppContextProvider = (props) => {

    const [pairList, setPairList] = useState([]);
    const [user, setUser] = useState(false);
    //trades and favorites
    const [favorite, setFavorite] = useState();
    const [openTrades, setOpenTrades] = useState()
    const [closeTrades, setCloseTrades] = useState()






    return (
        <AppContext.Provider value={{
            pairList, setPairList,
            user, setUser,
            favorite, setFavorite,
            openTrades, setOpenTrades,
            closeTrades, setCloseTrades

        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
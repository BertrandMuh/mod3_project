import React, { useContext } from 'react'
import { AppContext } from '../../context/app_context'

const Watchlist = () => {

    const { favorite, user } = useContext(AppContext)
    const createAndAddToFavorite = async () => {
        let favoriteList = [...favorite]
        if (favoriteList.length > 0) {
        }
    }
    const getFavoritePairs = async () => {
        console.log(user);
    }
    getFavoritePairs()

    return (
        <div>Watchlist</div>
    )
}

export default Watchlist
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/app_context'
import './index.css'

const Watchlist = () => {
    const { setFavorite, favorite } = useContext(AppContext)
    const addToOrRemoveFromFavorite = (e) => {
        let { id } = e.target
        let favoriteList = [...favorite]
        favoriteList.splice(favoriteList.indexOf(id), 1)
        setFavorite(favoriteList)
    }

    useEffect(() => { }, [favorite])

    let listJSX
    if (favorite !== undefined) {
        let favoriteList = [...favorite]
        listJSX = favoriteList.map((item) => {
            return (
                <div className='favorite-pair' key={item}>
                    <Link to={'/trading-avenue.com/instrument/?pair=' + item.replace(' / ', '_')} className='fav-pair-name'>{item}</Link>
                    <i className="fa fa-trash-o " id={item} onClick={addToOrRemoveFromFavorite}></i>
                </div>
            )
        })
    }
    return (
        <div id='favorite-container'>
            <p className='title'>Favorites</p>
            {listJSX}
        </div>
    )
}

export default Watchlist
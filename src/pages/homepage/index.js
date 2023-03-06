import React, { useContext, useEffect } from 'react'
// import { candlesResquest } from '../../api_request'
import Currency from '../../components/Currency'
import Disclaimer from '../../components/Disclaimer'
import HomeSummary from '../../components/home_summary'
import Loading from '../../components/Loading'
import { getFavoritesAndTrades } from '../../components/serverCall'
import { AppContext } from '../../context/app_context'
// import { getUserFromSession } from '../../functions/useful-functions'
import Auth from '../Auth'
import './index.css'

const Home = () => {

    let { user, setFavorite, setCloseTrades, setOpenTrades, pairList } = useContext(AppContext)
    // if (user) {
    //     getFavoritesAndTrades(user._id)
    // }
    useEffect(() => {
        const makeAServerCall = async () => {
            let response = await getFavoritesAndTrades(user._id)
            setFavorite(response.data.watchList)
            setCloseTrades(response.data.closeTrades)
            setOpenTrades(response.data.openTrades)
        }
        makeAServerCall(user._id)
    }, [])

    // window.history.pushState(null, null, '/trading-avenue.com')
    // let { pairList } = useContext(AppContext)

    // let isFirstRender = useRef(true)
    // useEffect(() => {
    //     const handleFitstLoad = async () => {
    //         if (isFirstRender.current) {
    //             let result = await candlesResquest()
    //             setPairList(result)
    //             isFirstRender.current = false
    //         }
    //     }
    //     handleFitstLoad()

    // }, [setPairList])

    let returnPageComponents = pairList.length !== 0 ?
        <div className='summary-pairs'>
            <HomeSummary />
            <Currency />
            <Disclaimer />
        </div> :
        <Loading />

    return (
        <>
            {user ?
                <div className='homepage'>
                    <h1>Home</h1>
                    {returnPageComponents}
                </div> :
                <Auth />
            }
        </>

    )
}

export default Home
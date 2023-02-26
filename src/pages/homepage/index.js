import React, { useContext, useEffect, useRef } from 'react'
import { candlesResquest } from '../../api_request'
import Currency from '../../components/Currency'
import Disclaimer from '../../components/Disclaimer'
import HomeSummary from '../../components/home_summary'
import Loading from '../../components/Loading'
import { AppContext } from '../../context/app_context'

const Home = () => {

    window.history.pushState(null, null, '/trading-avenue')
    let { pairList, setPairList } = useContext(AppContext)

    let isFirstRender = useRef(true)
    useEffect(() => {
        const handleFitstLoad = async () => {
            if (isFirstRender.current) {
                let result = await candlesResquest()
                setPairList(result)
                isFirstRender.current = false
            }
        }
        handleFitstLoad()

    }, [setPairList])

    let returnPageComponents = pairList.length !== 0 ?
        <> <HomeSummary />
            <Currency />
            <Disclaimer />
        </> :
        <Loading />

    return (
        <div>
            <h1>Home</h1>
            {returnPageComponents}
        </div>
    )
}

export default Home
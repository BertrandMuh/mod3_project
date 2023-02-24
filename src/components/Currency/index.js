import React, { useContext, useEffect, useRef, useState } from 'react'
import { candlesResquest } from '../../api_request'
import { AppContext } from '../../context/app_context'
import Loading from '../Loading'
import Pair from '../Pair'
import './index.css'

const Currency = () => {

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
    // console.log(pairList);

    const pairJSX = pairList.map((item, index) => {
        let closePrice = item.candles[0].mid.c
        let openPrice = item.candles[0].mid.o
        let highPrice = item.candles[0].mid.h
        let lowPrice = item.candles[0].mid.l
        if (item) {
            return (
                <div key={index} className="fx-pair">
                    <p>{item.instrument}</p>
                    <p>{openPrice}</p>
                    <p>{highPrice}</p>
                    <p>{lowPrice}</p>
                    <p>{closePrice}</p>
                </div>
            )
        }
        else {
            return null
        }
    })
    console.log(pairJSX.length, pairList[0].candles[0].mid);





    return (
        <div>
            <h1>
                Currency
            </h1>
            <p>
                What is this page about?
            </p>
            <div className='home-price-detail'>
                <h3>Previous day</h3>
                <div className='fx-pair header'>
                    <h3>Pairs</h3>
                    <h3>Open</h3>
                    <h3>High</h3>
                    <h3>Low</h3>
                    <h3>Close</h3>
                </div>
                {pairJSX}
            </div>
        </div>
    )
}

export default Currency
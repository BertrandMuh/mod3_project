import React, { useContext, useEffect, useRef, useState } from 'react'
import { candlesResquest } from '../../api_request'
import { AppContext } from '../../context/app_context'

const Currency = () => {

    let { pair, setPair } = useContext(AppContext)
    let isFirstRender = useRef(true)
    useEffect(() => {
        const handleFitstLoad = async () => {
            if (isFirstRender.current) {
                let result = await candlesResquest()
                setPair(result)
                isFirstRender.current = false
            }
        }
        handleFitstLoad()

    }, [setPair])
    console.log(pair);
    // let result = candlesResquest()
    // console.log(result);
    // setPairs(candlesResquest())
    // console.log(pairs);
    return (
        <div>
            <h1>
                Currency
            </h1>
            <p>
                What is this page about?
            </p>
            <div>

            </div>
        </div>
    )
}

export default Currency
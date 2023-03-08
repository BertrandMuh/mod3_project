import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { candlesResquest } from '../../api_request'
import { AppContext } from '../../context/app_context'

import './index.css'

const OpenTrades = () => {
    let { pairList, openTrades, setOpenTrades, closeTrades, setCloseTrades } = useContext(AppContext)

    let netProfit = 0;

    useEffect(() => { }, [openTrades])

    const closeTrade = async (e) => {
        let { className } = e.target
        let exitPrice
        let candles

        let response = await candlesResquest()
        response.forEach(obj => {
            candles = [...obj.candles].reverse()

            if (className === obj.instrument) {
                exitPrice = candles[0].mid.c
            }
        })

        let { id } = e.target
        let openTradesList = [...openTrades]
        let closeTradesList = [...closeTrades]
        let instrument = openTradesList[id]
        let profit = instrument.position === 'Sell' ? ((+instrument.entry - +candles[0].mid.c) * (instrument.pair.includes('JPY') ? 100 : 10000)).toFixed(1) : ((+candles[0].mid.c - +instrument.entry) * (instrument.pair.includes('JPY') ? 100 : 10000));

        let tradeUpdateData = {
            exitPrice,
            profit: profit,
            exitDate: new Date().toUTCString(),
        }

        let closeTradeData = { ...instrument, ...tradeUpdateData }
        console.log(closeTradeData.entry, exitPrice, instrument.entry - exitPrice, closeTradeData);
        openTradesList.splice(id, 1)
        setOpenTrades(openTradesList)
        closeTradesList.push(instrument)
        setCloseTrades(closeTradesList)
    }

    let tradeJSX = openTrades !== undefined ? openTrades.map((trade, idx) => {
        let profitLoss = 0
        let candles
        pairList.forEach(obj => {
            if (obj.instrument === trade.pair) {
                candles = [...obj.candles].reverse()
                profitLoss = trade.position === 'Sell' ? ((+trade.entry - +candles[0].mid.c) * (trade.pair.includes('JPY') ? 100 : 10000)).toFixed(1) : ((+candles[0].mid.c - +trade.entry) * (trade.pair.includes('JPY') ? 100 : 10000))
                netProfit = +netProfit + +Number(profitLoss).toFixed(1)
            }
        })

        let className = +profitLoss > 0 ? 'up' : 'down'

        return (
            <div key={trade.pair} className='open-trades rows'>
                <Link to={'/trading-avenue.com/instrument/?pair=' + trade.pair}>{trade.pair.replace('_', ' / ')}
                </Link>
                <p>{trade.position}</p>
                <p>{trade.entry}</p>
                <p>{trade.tp}</p>
                <p>{trade.sl}</p>
                <p className={className}>{Number(profitLoss).toFixed(1)}</p>
                <p className='action'>
                    {/* <span title='edit' className='fa fa-pencil'></span> */}
                    <span title='close' id={idx} className={trade.pair} onClick={(evt) => closeTrade(evt)}>X</span>
                </p>
            </div>
        )
    }) :
        null

    return (
        <div className='open-trades-container' >
            <div className='open-trades-table'>
                <div className='open-trades thead'>
                    <p>Pair</p>
                    <p>position</p>
                    <p>Entry</p>
                    <p>TP</p>
                    <p>SL</p>
                    <p>P/L</p>
                    <p className='action thead'>Action</p>
                </div>
                {tradeJSX}
            </div>
        </div >
    )
}

export default OpenTrades
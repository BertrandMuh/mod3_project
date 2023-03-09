import React, { useContext } from 'react'
import { AppContext } from '../../context/app_context'
import './index.css'
const Performance = () => {
    const { closeTrades } = useContext(AppContext)
    let summaryJSX
    if (closeTrades !== undefined) {
        let closeTradesList = [...closeTrades]
        summaryJSX = closeTradesList.map((data, idx) => {
            let className
            let profit
            if (data.position === 'Sell') {
                className = +data.entry > +data.exitPrice ? 'profit' : 'loss'
                profit = +data.entry - (+data.exitPrice)
            }
            else {
                className = +data.entry < +data.exitPrice ? 'profit' : 'loss'
                profit = +data.exitPrice - (+data.entry)
            }
            if (data.pair.includes('JPY')) {
                profit *= 100
                let x = profit.toFixed(1)
                profit = x
            }
            else {
                profit *= 10000
                let x = profit.toFixed(1)
                profit = x
            }
            return (
                <div key={idx} className={className + ' closed'}>
                    <p>{data.pair}</p>
                    <p>{data.position}</p>
                    <p>{data.entry}</p>
                    <p>{data.sl}</p>
                    <p>{data.tp}</p>
                    <p>{data.exitPrice}</p>
                    <p className='date'>{data.date}</p>
                    <p className='date'>{data.exitDate}</p>
                    <p >{profit}</p>

                </div>
            )
        })
    }


    return (
        <div id='outcome'>
            <div className='closed thead'>
                <p>Pair</p>
                <p>Position</p>
                <p>Entry</p>
                <p>Sl</p>
                <p>Tp</p>
                <p>Exit</p>
                <p className='date'>Entry date</p>
                <p className='date'>Exit date</p>
                <p>Profit(pips)</p>


            </div>
            {summaryJSX}
        </div>
    )
}

export default Performance
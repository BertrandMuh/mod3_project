import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/app_context'

import './index.css'

const TradeButtons = (props) => {
    let { item } = props
    let pair = new URLSearchParams(window.location.search).get('pair')

    let { setOpenTrades, openTrades } = useContext(AppContext)
    // console.log(pair);
    const [tradeAction, setTradeAction] = useState('Sell')
    const [tpAndSL, setTpAndSL] = useState({ tp: '', sl: '' })
    const [disabled, setDisabled] = useState(false)

    const handleClick = (el) => {
        let { textContent } = el.target
        let authTabChildren = Array.from(document.getElementsByClassName('buy-sell-container')[0].children)
        authTabChildren.forEach(child => {
            if (child.textContent === textContent) {
                child.classList.add('trade-position')
                setTradeAction(textContent)
            }
            else {
                child.classList.remove('trade-position')
            }
        })
        handleChange(el)
    }

    const handleChange = (el) => {

        let borderColorWhenInvalid = '1px solid red'
        let borderColorWhenValid = '1px solid black'

        let { name, value, style } = el.target
        setTpAndSL({
            ...tpAndSL,
            [name]: value
        })

        if (tradeAction === 'Sell') {
            if (value !== '' && value >= Number(item[0].mid.c) && name === 'tp') {
                style.border = borderColorWhenInvalid
                setDisabled(true)

            }
            else if (value !== '' && value <= Number(item[0].mid.c) && name === 'sl') {
                style.border = borderColorWhenInvalid
                setDisabled(true)
            }
            else {
                style.border = borderColorWhenValid
                style.border = borderColorWhenValid
                setDisabled(false)
            }
        }
        else if (tradeAction === 'Buy') {
            if (value !== '' && value <= Number(item[0].mid.c) && name === 'tp') {
                style.border = borderColorWhenInvalid
                setDisabled(true)
            }
            else if (value !== '' && value >= Number(item[0].mid.c) && name === 'sl') {
                style.border = borderColorWhenInvalid
                setDisabled(true)
            }
            else {
                style.border = borderColorWhenValid
                style.border = borderColorWhenValid
                setDisabled(false)
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            pair,
            position: tradeAction,
            entry: item[0].mid.c,
            tp: Number(tpAndSL.tp).toFixed(pair.includes('JPY') ? 3 : 5),
            sl: Number(tpAndSL.sl).toFixed(pair.includes('JPY') ? 3 : 5),
            date: new Date().toUTCString()
        }

        let newOpenTradesList = [...openTrades]
        newOpenTradesList.push(data)
        setOpenTrades(newOpenTradesList)
        e.target.querySelectorAll('input').forEach(input => {
            input.value = ''
        })
    }

    let step = pair.includes('JPY') ? '0.001' : '0.00001'

    return (
        <div className='trade-btn container'>

            <form className='position' onSubmit={(evt) => handleSubmit(evt)}>
                <div>
                    <div className='flex-center order'>
                        <p>New Trade</p>

                    </div>
                </div>
                <div>

                    <div className='flex-space-btw sl-tp'>
                        <p className='input-label'>Stop Loss <span>(price)</span></p>
                        <input type="number" className='trade-input' name='sl' step={step} value={tpAndSL.sl} onChange={(e) => handleChange(e)} />

                    </div>
                    <div className='flex-space-btw sl-tp'>
                        <p className='input-label'>Take Profit <span>(price)</span></p>
                        <input type="number" className='trade-input' name='tp' step={step} value={tpAndSL.tp} onChange={(e) => handleChange(e)} />
                    </div>
                </div>
                <div className='flex-center buy-sell-container'>
                    <button type='button' className='sell btn trade-position' onClick={(evt) => handleClick(evt)}>Sell</button>
                    <button type='button' className='buy btn' onClick={(evt) => handleClick(evt)}>Buy</button>
                </div>
                <div className='submit-btn-container'>
                    <button className='submit btn' type='submit' disabled={disabled}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default TradeButtons
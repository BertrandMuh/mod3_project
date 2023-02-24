import React from 'react'

const Pair = (props) => {
    // console.log(index);
    let { pair, index } = props

    console.log(index);
    return (
        <>
            <p>{pair.instrument}</p>
            <p>d</p>
        </>
    )
}

export default Pair
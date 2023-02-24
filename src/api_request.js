import axios from 'axios'

// make a server call to the /get_candle_data route to get the candles data
export const candlesResquest = async () => {
    let response = await axios('/get_candle_data')
    return response.data;
}

// make a api call and get data for all the pair in the arr
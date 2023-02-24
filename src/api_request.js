import axios from 'axios'

export const candlesResquest = async () => {
    let response = await axios('/get_candle_data')
    return response.data;
}

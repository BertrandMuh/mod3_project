const express = require('express');
const path = require('path');
const logger = require('morgan');
// cross origin access 
const cors = require('cors');
const axios = require('axios');

require('dotenv').config()


const app = express();

// access
app.use(cors({
    origin: "*"
}));

// logs the different requests to our server
app.use(logger('dev'))

//parse stringified objects (JSON)
app.use(express.json())

// server build folder
app.use(express.static(path.join(__dirname, 'build')));

app.get('/test_route', (req, res) => {
    res.send("good route!")
})

app.get('/get_candle_data', async (req, res) => {

    const makeApiCall = async (arr) => {
        let additionalParams = '/candles?count=1&price=MBA&granularity=D'
        let apiResponse = []
        for (const pair of arr) {
            const url = process.env.oanda_url + pair + additionalParams
            let response = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${process.env.api_key}`,
                    "Content-Type": "application/json"
                }
            });
            apiResponse.push(response.data)
        }
        console.log(apiResponse);
        return apiResponse
    }

    const pairsList = ['EUR_USD', 'USD_JPY', 'GBP_USD', 'AUD_USD', 'USD_CAD']

    let finalApiResponse = await makeApiCall(pairsList)
    console.log(finalApiResponse);
    res.send(finalApiResponse)
})




app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
});
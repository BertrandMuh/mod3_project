import axios from "axios";

export const candlesResquest = async (pair) => {

    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Authorization": "Bearer d16cb5dd3d3a7ac57891f50ca7ab3ff5-46a44e916a30fc93afe8b733f33f4493",
        "Content-Type": "application/json"
    }

    let reqOptions = {
        url: "https://api-fxtrade.oanda.com/v3/accounts",
        method: "GET",
        headers: headersList,
    }

    let response = await axios.request(reqOptions);
    console.log(response.data);
}

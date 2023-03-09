
import axios from 'axios'

export const signUp = async (formData) => {
    let response = await axios({
        method: "POST",
        url: "/user/sign_up", // route to do signup
        data: formData
    }
    )
    return response
}

export const logIn = async (formData) => {
    let response = await axios({
        method: "PUT",
        url: '/user/login',
        data: formData
    })
    return response
}

export const logOut = () => {
    axios('/user/logout')
    window.location.href = '/'
}

export const getUserFromSession = async () => {
    let response = await axios('/session-info')
    // WE HAVE THE LOGGED IN USER! :)
    if (response.data.session.passport) {
        let user = response.data.session.passport.user;
        return user;
    } else {
        return false
    }
}

export const getFavoritesAndTrades = async (userId) => {
    let response = await axios(`/get_favorite_and_trades/${userId}`)
    return response;
}
export const createOrAddToFavorite = async (favorite, userId, pair) => {
    let dataFromDatabase = await getFavoritesAndTrades(userId)
    console.log(pair, userId);
    if (dataFromDatabase.data === '') {
        let response = await axios({
            method: "POST",
            url: "/create_favorite_list",
            data: { pair, userId }
        })
        console.log(response);
    }
}



export const updateTradesLists = async (pairData, user) => {
    let response = await axios({
        method: 'PUT',
        url: '/update_trades_favorite_lists/' + user._id,
        data: pairData
    })
    return response;
}
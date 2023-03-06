const express = require('express');
const path = require('path');
const logger = require('morgan');
// cross origin access 
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const userModel = require('./models/user')

const passport = require('passport');
const session = require('express-session');
const initializePassport = require('./config/passport-config.js')
const bcrypt = require('bcrypt');

require('dotenv').config()
require('./config/mongoDatabase')


const app = express();

// access
app.use(cors({
    origin: "*"
}));

// logs the different requests to our server
app.use(logger('dev'))

//parse stringified objects (JSON)
app.use(express.json())

initializePassport(
    passport,
    // passport tells us that they want a function that will return the correct user given an email
    async email => {
        let user = userModel.User.findOne({ email: email })
        return user;
    },
    async id => {
        let user = userModel.User.findById(id);
        return user;
    },
);

app.use(session({
    secure: true,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { originalMaxAge: 3600000 }
}))

// server build folder
app.use(express.static(path.join(__dirname, 'build')));

app.get('/test_route', (req, res) => {
    res.send("good route!")
})

app.get('/session-info', (req, res) => {
    res.json({
        session: req.session
    });
});


app.get('/get_candle_data', async (req, res) => {
    let additionalParams = '/candles?count=21&price=MBA&granularity=D'
    const pairsList = ['EUR_USD', 'USD_JPY', 'GBP_USD', 'AUD_USD', 'USD_CAD']
    let apiResponse = []

    for (const pair of pairsList) {
        const url = process.env.oanda_url + pair + additionalParams
        let response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${process.env.api_key}`,
                "Content-Type": "application/json"
            }
        });
        apiResponse.push(response.data)
    }
    res.send(apiResponse)
})

app.post('/user/sign_up', async (req, res) => {
    delete req.body.confirmPassword
    let hashedPassword = await bcrypt.hash(req.body.password, 10)
    let user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }
    console.log(hashedPassword);
    console.log(user.email);
    try {
        let check = await userModel.User.findOne({ email: user.email })
        // console.log(check.status);
        if (check !== null) {
            res.send('Email already exists')
        }
        else if (check === null) {
            let userResponse = await userModel.User.create(user)
            let favoriteAndTradeResponse = await userModel.tradeAndWatchlist.create({ user: userResponse._id })
            res.send('created')
        }

    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

// login route
app.put('/user/login', async (req, res, next) => {
    console.log(req.body);
    // passport authentication
    // let passport do the authentification
    // passport.authenticate will grab the login form infos from req.body and use them to perform the authentification
    passport.authenticate("local", (err, user, message) => {
        console.log(message);
        // handle the error
        if (err) throw err;
        if (!user) {
            res.json({
                message: "login failed",
                user: false
            })
        } else {
            // delete user.password
            req.logIn(user, err => {
                if (err) throw err;
                res.json({
                    message: "successfully authenticated",
                    // remove user
                })
            })
        }
    })(req, res, next);
})

app.get('/get_favorite_and_trades/:userId', async (req, res) => {
    console.log(req.params.userId);
    let response = await userModel.tradeAndWatchlist.findOne({ user: req.params.userId })
    console.log(response);
    res.send(response)
})


app.put('/update_trades_favorite_lists/:userId', async (req, res) => {
    console.log(req.body, req.params.userId, 'jjjj');
    // let response = await userModel.tradeAndWatchlist.findOneAndUpdate({ user: req.params.userId }, req.body, { new: true })
    // console.log(response, 1);
    res.send('update')
})



app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
});
/*
* This is the main file for initializing your server
*/
require('dotenv').config({
    path: './config.env'
});

const initializeApp = require('./app');

initializeApp.listen(process.env.RUNNING_PORT, () => {
    console.log(`Server running @ http://localhost:${process.env.RUNNING_PORT}`)
});
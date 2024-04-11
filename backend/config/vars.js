const path = require('path');

// import .env variables
require('dotenv-safe').config({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example'),
    allowEmptyValues: true  //.env에 값이 채워지면 불필요
});

module.exports = {
    env: process.env.NODE_ENV,
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',

    // mongo: {
    //     uri: process.env.NODE_ENV === 'test'
    //         ? process.env.MONGO_URI_TESTS
    //         : process.env.MONGO_URI,
    // },

    // jwt ..
}
const data = require('../../lib/apiFunction')
// module scaffolding
const handler = {};
const apiKey = "zorVeAKFHFB2FKSauzZP4mLm";

handler.checkingStatus = (requestProperties, callback) => {
    data.detectionStatus(apiKey)
        .then(response => callback(200, response))
        .catch(err => console.log(err))    
};

module.exports = handler;

const data = require('../../lib/apiFunction')
// module scaffolding
const handler = {};
const apiKey = "zorVeAKFHFB2FKSauzZP4mLm";



handler.languageChecking = (requestProperties, callback) => {
    const languageQuery = requestProperties.queryStringObject.q;
    var nameList = languageQuery.replace(/\, /g, ',').replace(/\. /g, ',').replace(/\./g, ',').split(",");
    if (nameList.length === 1) {
        data.singleDetection(requestProperties.queryStringObject.q, apiKey)
            .then(response => callback(200, response))
            .catch(err => console.log(err))
    }
    else {
        
        data.bulkDetection(nameList, apiKey)
            .then(response => callback(200, response))
            .catch(err => console.log(err))
    }
};

module.exports = handler;

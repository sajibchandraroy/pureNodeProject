const data = require('../../lib/apiFunction')
// module scaffolding
const handler = {};

handler.languages = (requestProperties, callback) => {    
    data.languages()
        .then(response => callback(200, response))
        .catch(err => console.log(err))

    // callback(200, {
    //     message: 'This is a languages url',
    // });
};

module.exports = handler;

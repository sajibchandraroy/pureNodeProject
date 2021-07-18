const handler = {};

handler.languageChecking = (requestProperties, callback) => {
    console.log(requestProperties);

    callback(200, {
        message: 'This is a home url',
    });
};

module.exports = handler;
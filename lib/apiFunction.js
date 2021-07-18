const https = require('https');
const data = {}

data.languages = () => {
    const promise = new Promise((resolve, reject) => {
        https.get('https://api.linguin.ai/v1/languages', (resp) => {
            let data = '';
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(JSON.parse(data));
            });

        }).on("error", (err) => {
            reject("Error: " + err.message);
        });

    })
    return promise
}

data.singleDetection = (queryData, APIKey) => {
    const query = encodeURI(queryData)
    const promise = new Promise((resolve, reject) => {
        // prepare the header
        var postheaders = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${APIKey}`,
        };

        // the post options
        var optionspost = {
            host: 'api.linguin.ai',
            port: 443,
            path: `/v1/detect?q=${query}`,
            method: 'POST',
            headers: postheaders
        };

        // do the POST call
        var reqPost = https.request(optionspost, function (res) {
            res.on('data', function (d) {
                resolve(JSON.parse(d));
            });
        });

        // write the json data
        // reqPost.write(jsonObject);
        reqPost.end();
        reqPost.on('error', function (err) {
            reject("Error: " + err);
        });


    })
    return promise
}

data.detectionStatus = (APIKey) => {
    const promise = new Promise((resolve, reject) => {
        // prepare the header
        var postheaders = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${APIKey}`,
        };

        // the post options
        var optionspost = {
            host: 'api.linguin.ai',
            port: 443,
            path: `/v1/status`,
            method: 'GET',
            headers: postheaders
        };

        // do the POST call
        var reqGet = https.request(optionspost, function (res) {
            res.on('data', function (d) {
                resolve(JSON.parse(d));
            });
        });

        // write the json data
        // reqPost.write(jsonObject);
        reqGet.end();
        reqGet.on('error', function (err) {
            reject("Error: " + err);
        });
    })
    return promise
}

data.bulkDetection = (query, APIKey) => {
    const copyItems = []
    query.forEach(function (item) {
        const encodedItem = encodeURI(item)
        copyItems.push(`q[]=${encodedItem}`)
    })
    const querryData = copyItems.join('&')
    const promise = new Promise((resolve, reject) => {

        // prepare the header
        var postheaders = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${APIKey}`,
        };
        // the post options
        var optionspost = {
            host: 'api.linguin.ai',
            port: 443,
            path: `/v1/bulk?${querryData}`,
            method: 'POST',
            headers: postheaders
        };

        // do the POST call
        var reqPost = https.request(optionspost, function (res) {
            res.on('data', function (d) {                
                resolve(JSON.parse(d));
            });
        });

        // write the json data
        // reqPost.write(jsonObject);
        reqPost.end();
        reqPost.on('error', function (err) {
            reject("Error: " + err);
        });
    })
    return promise
}



module.exports = data;
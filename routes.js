const { languageChecking } = require('./handlers/routeHandlers/languageChecking');
const { checkingStatus } = require('./handlers/routeHandlers/checkingStatus');
const { languages } = require('./handlers/routeHandlers/languages');

const routes = {
    languageChecking: languageChecking,
    checkingStatus: checkingStatus,
    languages: languages,
};

module.exports = routes;
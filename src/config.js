const Logger = require('./logger');
const fs = require('fs');

module.exports.Configuration = {
    token: 'TOKEN HERE',
    playing: 'P0wining James with speed and accuracy'
};

module.exports.load = async function() {
    if (!fs.existsSync('./config')) {
        try {
            fs.mkdirSync('./config/');
            fs.writeFileSync('./config/config.json', JSON.stringify(module.exports.Configuration, false, 4));
            Logger.panic('NO CONFIG FILE FOUND, CREATING...');
        } catch (e) {
            Logger.panic('ERROR CREATING CONFIG FILE');
        }
    }

    if (!fs.existsSync('./config/config.json')) {
        try {
            fs.writeFileSync('./config/config.json', JSON.stringify(module.exports.Configuration, false, 4));
            Logger.panic('NO CONFIG FILE FOUND, CREATING...');
        } catch (e) {
            Logger.panic('ERROR CREATING CONFIG FILE');
        }
    }

    let tempConfig = fs.readFileSync('./config/config.json');
    try {
        tempConfig = JSON.parse(tempConfig);
    } catch (e) {
        Logger.panic('ERRORS EXIST IN CONFIG FILE');
    }

    if (!tempConfig.token)      Logger.panic('NO TOKEN IN CONFIG FILE');
    if (!tempConfig.playing)    Logger.panic('NO PLAYING IN CONFIG FILE')

    module.exports.Configuration = tempConfig;
    Logger.info('Config loaded');
}

module.exports.loadGuilds = async function() {
    
}

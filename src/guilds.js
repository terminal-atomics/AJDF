const Config = require('./config');

module.exports.init = async function(client) {
    client.guilds.array().forEach((guild) => {
        // Check in guilds config 
        console.log(guild.id);
    });
}



const Logger = require('./logger');
const Config = require('./config');
const MemberProfiler = require('./memberprofiler');

module.exports.startup = async function(client) {
    client.on('ready', async () => {
        client.user.setPresence({
            game: {
                name: Config.Configuration.playing
            }
        });
        Logger.info(`Logged in as ${client.user.tag}`);

        // Loop through every server the bot is on and if it isnt present in
        //guilds.json then set it up as defined below in guildCreate
        //a seperate method would be required to set up a guild in such a way
    });

    client.on('guildCreate', async (guild) => {
        // Set up server with trusted and untrusted roles
        //notify owners how to set permissions on every other channel
        //create 3 channels, for flaged members info, flaged 
        //members validate, and one to notify trusted members of the reason
        //a user was flagged

        // Also add the server to guilds.json and the IDs of every channel related
    });

    client.on('guildMemberAdd', async (member) => {
        let isSafe = await MemberProfiler.newMember(member);
        if (isSafe == true) return;

        // If it's !true isSafe will be a string to define
        //the reason the profiler flagged them

        // Add user to quarantene and give reason in the trusted members channel
    });
}

const Logger = require('./logger');
const Config = require('./config');
const EventHandler = require('./eventhandler');

const Discord = require('discord.js');

const Scorer = require("./scorer");

module.exports.client = {};

module.exports.main = async function() {
    Logger.SetLevel(Logger.VERBOSE_LOGS);
    Logger.init();

    await Config.load();
    await Config.loadGuilds();

    module.exports.client = new Discord.Client();
    EventHandler.startup(module.exports.client);
    module.exports.client.login(Config.Configuration.token);
}
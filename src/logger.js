const colours = require('colors/safe');
const moment = require('moment');
const fs = require('fs');

let LogLevel = 1;
let logPath = 'logs.log';
let dateFormat = 'DD-MM-YY HH:mm:ss'

module.exports.init = (path) => {
    if (path) logPath = path;

    if (!fs.existsSync(logPath)) {
        fs.writeFileSync(logPath, '');
    }
    fs.appendFileSync(logPath, '[SYSTEM STARTING UP] \n');


    console.log(colours.rainbow('AJDS - Automated James Detection System'));
}

module.exports.SetLevel = (level) => {
    LogLevel = level;
}

module.exports.SetDialect = (dialect) => {
    Dialect = dialect;
}

module.exports.SetDateFormat = (format) => {
    dateFormat = format;
}

module.exports.VERBOSE_LOGS = 0;
module.exports.DEBUG_LOGS = 1;
module.exports.INFO_LOGS = 2;
module.exports.WARN_LOGS = 3;

module.exports.middleware = (message) => {
    let d = moment().format(dateFormat);
    fs.appendFileSync(logPath, `[${d.toLocaleString()}] [MIDDLEWARE] ${message} \n`);
    if (LogLevel > 0) return; 
    console.log('[' + d.toLocaleString() + '] [' 
        + colours.blue('MIDDLEWARE') + '] ' + message);
}

module.exports.debug = (message) => {
    let d = moment().format(dateFormat);
    fs.appendFileSync(logPath, `[${d.toLocaleString()}] [DEBUG] ${message} \n`);
    if (LogLevel > 1) return; 
    console.log('[' + d.toLocaleString() + '] [' 
        + colours.cyan('DEBUG') + '] ' + message);
}

module.exports.ready = () => {
    let d = moment().format(dateFormat);
    fs.appendFileSync(logPath, `[${d.toLocaleString()}] [READY] \n`);
    console.log('[' + d.toLocaleString() + '] ['
        + colours.rainbow('READY') + ']');
}

module.exports.info = (message) => {
    let d = moment().format(dateFormat);
    fs.appendFileSync(logPath, `[${d.toLocaleString()}] [INFO] ${message} \n`);
    if (LogLevel > 2) return; 
    console.log('[' + d.toLocaleString() + '] [' 
        + colours.green('INFO') + '] ' + message);
}

module.exports.warn = (message) => {
    let d = moment().format(dateFormat);
    fs.appendFileSync(logPath, `[${d.toLocaleString()}] [WARN] ${message} \n`);
    if (LogLevel > 3) return; 
    console.log('[' + d.toLocaleString() + '] [' 
        + colours.yellow('WARN') + '] ' + message);
}

module.exports.error = (message) => {
    let d = moment().format(dateFormat);
    fs.appendFileSync(logPath, `[${d.toLocaleString()}] [ERROR] ${message} \n`);
    console.log('[' + d.toLocaleString() + '] [' 
        + colours.red('ERROR') + '] ' + message);
}

module.exports.panic = (message) => {
    let d = moment().format(dateFormat);
    fs.appendFileSync(logPath, `[${d.toLocaleString()}] [PANIC] ${message} \n`);
    console.log('[' + d.toLocaleString() + '] [' 
        + colours.red('PANIC') + '] ' + message);
    process.exit();
}

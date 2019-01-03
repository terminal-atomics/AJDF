const Logger = require('./logger');

module.exports.newMember = async function(member) {
    let isSafe = true;
    let reason;

    // Check members account age
    let memberAccountAge = await isAccountOldEnough(member);
    if (!memberAccountAge) 
        reason += 'users account is less than 5 days old '; isSafe = false;

    // Do more tests

    if (isSafe) return isSafe;
    return reason;
}

async function isAccountOldEnough(member) {
    return true;
}

// Put longer validation checks in another file
//with banned words implient a l33t speak check

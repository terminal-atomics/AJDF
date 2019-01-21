const Logger = require('./logger');
const fs = require("fs");
const jimp = require("jimp");
const fetch = require("node-fetch");
const badWords = fs.readFileSync("src/data/badwords.txt").toString().split("\n");

function hasBadWords(name) {
	for (let word of badWords) {
		if (name.toLowerCase().indexOf(word.trim()) != -1) {
			Logger.info("Username contains profanity");
			return true;
		}
	}
	return false;
}

async function getColorDistance(user) {
	let avatar = await jimp.read(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`);
	let min = {
		r: 255,
		g: 255,
		b: 255
	};
	let max = {
		r: 0,
		g: 0,
		b: 0
	};
	avatar.scan(0, 0, avatar.bitmap.width, avatar.bitmap.height, function (x, y, idx) {
		let r = this.bitmap.data[idx + 0];
		let g = this.bitmap.data[idx + 1];
		let b = this.bitmap.data[idx + 2];

		if (r < min.r) min.r = r;
		if (g < min.g) min.g = g;
		if (b < min.b) min.b = b;

		if (r > max.r) max.r = r;
		if (g > max.g) max.g = g;
		if (b > max.b) max.b = b;
	});

	let r = max.r - min.r;
	let g = max.g - min.g;
	let b = max.b - min.b;
	let dist = Math.round(Math.sqrt(r * r + g * g + b * b));
	Logger.info(`Avatar had color distance of ${dist}.`);
	return dist;
}

//This function actually scores the user based on data
module.exports.score = async function (user, connections) {
	Logger.info(`Scoring user ${user.username}#${user.discriminator} (${user.id})...`);
	if (user.bot) {
		Logger.warn("This user is a bot. Scoring a 65/65.");
		return 65;
	}
	let score = 0;

	//Account
	if (user.verified) score += 5
	if (user.mfa_enabled) score += 4
	let age = new Date().getTime() - ((user.id >> 22) + 1420070400000);
	age = Math.floor(age / 1000 / 60 / 60 / 24);
	Logger.info(`Account aged ${age} days.`);
	score += Math.min(10, Math.max(0, (age - 2) / 2));

	//Nitro
	if (user.premium_type != 0) score += 8;
	if (user.premium_type == 2) score += 5;

	//Hypesquad
	if (user.flags != 0) score += 4;

	//Username
	score += Math.max(0, 4 - Math.floor(user.username.length / 4));
	if (!hasBadWords(user.username)) score += 6;

	//Connections
	score += Math.min(10, connections.length * 2);

	//Avatar
	if (user.avatar != null) {
		score += 5;
		let dist = await getColorDistance(user);
		dist = dist / 330 * 4;
		score += Math.min(dist, 4);
	}



	Logger.info(`User was scored ${score}/65.`);
	return Math.round(score);
};
module.exports.config = {
	name: "memevn",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Jukie~",
	description: "Xem meme",
	commandCategory: "Phương tiện",
	usages: "",
	cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	axios.get('https://nguyenmanh.name.vn/api/meme?apikey=GhvsGFjg').then(res => {
	let ext = res.data.result.url;
	let callback = function () {
					api.sendMessage({
						body: `Meme nè! 🥴🥴`,
						attachment: fs.createReadStream(__dirname + `/cache/boy.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boy.${ext}`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/boy.${ext}`)).on("close", callback);
			})
}
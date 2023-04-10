module.exports.config = {
  name: "\n",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "",
  description: "Random ảnh loli khi sai lệnh",
  commandCategory: "Hình ảnh",
  usages: "noprefix",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
 //const threadSetting = (await Threads.getData(String(event.threadID))).data || {};
		 // const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  const prefix = data.PREFIX || global.config.PREFIX;
  axios.get('https://api-music.bitmdg.repl.co/chill/?apikey=xyz').then(res => {
  let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let count = res.data.count;
  let callback = function () {
          api.sendMessage({
            body: `☍ Lệnh bạn nhập không tồn tại, tất cả lệnh được ghi trên lệnh ${prefix}menu\n➙ Trong lúc bạn đang tìm lệnh thì hãy chill cùng bot nhé :>`,
            attachment: fs.createReadStream(__dirname + `/cache/sailenh.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/sailenh.${ext}`), event.messageID);
        };
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/sailenh.${ext}`)).on("close", callback);
      })
}

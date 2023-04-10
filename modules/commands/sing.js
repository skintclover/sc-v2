const fs = require('fs');
const ytdl = require('ytdl-core');
const { resolve } = require('path');
async function downloadMusicFromYoutube(link, path) {
  var timestart = Date.now();
  if(!link) return 'Thiếu link'
  var resolveFunc = function () { };
  var rejectFunc = function () { };
  var returnPromise = new Promise(function (resolve, reject) {
    resolveFunc = resolve;
    rejectFunc = reject;
  });
    ytdl(link, {
            filter: format =>
                format.quality == 'tiny' && format.audioBitrate == 48 && format.hasAudio == true
        }).pipe(fs.createWriteStream(path))
        .on("close", async () => {
            var data = await ytdl.getInfo(link)
            var result = {
                title: data.videoDetails.title,
                dur: Number(data.videoDetails.lengthSeconds),
                viewCount: data.videoDetails.viewCount,
                likes: data.videoDetails.likes,
                author: data.videoDetails.author.name,
                timestart: timestart
            }
            resolveFunc(result)
        })
  return returnPromise
}
module.exports.config = {
    name: "sing",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Phát nhạc thông qua link YouTube hoặc từ khoá tìm kiếm",
    commandCategory: "Youtube",
    usages: "[searchMusic]",
    cooldowns: 0
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
    const moment = require("moment-timezone"); 
    var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
    const axios = require('axios')
    const { createReadStream, unlinkSync, statSync } = require("fs-extra")
    try {
        var path = `${__dirname}/cache/sing-${event.senderID}.mp3`
        var data = await downloadMusicFromYoutube('https://www.youtube.com/watch?v=' + handleReply.link[event.body -1], path);
        if (fs.statSync(path).size > 26214400) return api.sendMessage('Không thể gửi file vì dung lượng lớn hơn 25MB.', event.threadID, () => fs.unlinkSync(path), event.messageID);
        api.unsendMessage(handleReply.messageID)
        return api.sendMessage({ 
            body: `[🎵] Title: ${data.title}\n[⏱️] Thời lượng video: ${this.convertHMS(data.dur)}\n[😳] Tên kênh: ${data.author}\n[📈] Số view: ${data.viewCount}\n[🔰] Số like: ${data.likes}\n[⏱️] Thời gian xử lý: ${Math.floor((Date.now()- data.timestart)/1000)} giây\n[👀]=== BOT GjneSs ===[👀]\n\n===「${timeNow}」===`,
            attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
         event.messageID)
            
    }
    catch (e) { return console.log(e) }
}
module.exports.convertHMS = function(value) {
    const sec = parseInt(value, 10); 
    let hours   = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60); 
    let seconds = sec - (hours * 3600) - (minutes * 60); 
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return (hours != '00' ? hours +':': '') + minutes+':'+seconds;
}
module.exports.run = async function ({ api, event, args }) {
    if (args.length == 0 || !args) return api.sendMessage('# 𝗩𝘂𝗶 𝗟𝗼̀𝗻𝗴 𝗡𝗵𝗮̣̂𝗽 𝗧𝗲̂𝗻 𝗕𝗮̀𝗶 𝗗𝗲̂̉ 𝗧𝗶̀𝗺 !', event.threadID, event.messageID);
    const keywordSearch = args.join(" ");
    const moment = require("moment-timezone"); 
    var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
    var path = `${__dirname}/cache/sing-${event.senderID}.mp3`
    if (fs.existsSync(path)) { 
        fs.unlinkSync(path)
    }
    if (args.join(" ").indexOf("https://") == 0) {
        try {
            var data = await downloadMusicFromYoutube(args.join(" "), path);
            if (fs.statSync(path).size > 26214400) return api.sendMessage('Không thể gửi file vì dung lượng lớn hơn 25MB.', event.threadID, () => fs.unlinkSync(path), event.messageID);
            return api.sendMessage({ 
                body: `[🎵] Title: ${data.title}\n[⏱️] Thời lượng video: ${this.convertHMS(data.dur)}\n[😳] Tên kênh: ${data.author}\n[📈] Số view: ${data.viewCount}\n[🔰] Số like: ${data.likes}\n[⏱️] Thời gian xử lý: ${Math.floor((Date.now()- data.timestart)/1000)} giây\n[👀]=== BOT GjneSs ===[👀]\n\n===「${timeNow}」===`,
                attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
            event.messageID)
            
        }
        catch (e) { return console.log(e) }
    } else {
          try {
            var link = [],
                msg = "",
                num = 0
            const Youtube = require('youtube-search-api');
            var data = (await Youtube.GetListByKeyword(keywordSearch, false,10)).items;
            for (let value of data) {
              link.push(value.id);
              num = num+=1
              msg += (`${num} → 🎬 Title ${value.title}\n⏰ Thời lượng: ${value.length.simpleText}\n\n`);
            }
            var body = `»🔎 𝗖𝗼́ ${link.length} 𝗸𝗲̂́𝘁 𝗾𝘂𝗮̉ 𝘁𝗿𝘂̀𝗻𝗴 𝘃𝗼̛́𝗶 𝘁𝘂̛̀ 𝗸𝗵𝗼𝗮́ 𝘁𝗶̀𝗺 𝗸𝗶𝗲̂́𝗺 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻:\n\n${msg}\n[👻] 𝗛𝗮̃𝘆 𝗿𝗲𝗽𝗹𝘆 (𝗽𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶) 𝗰𝗵𝗼̣𝗻 𝗺𝗼̣̂𝘁 𝘁𝗿𝗼𝗻𝗴 𝗻𝗵𝘂̛̃𝗻𝗴 𝘁𝗶̀𝗺 𝗸𝗶𝗲̂́𝗺 𝘁𝗿𝗲̂𝗻\n\n===「${timeNow}」===`
            return api.sendMessage({
              body: body
            }, event.threadID, (error, info) => global.client.handleReply.push({
              type: 'reply',
              name: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              link
            }), event.messageID);
          } catch(e) {
            return api.sendMessage('𝗗𝗮̃ 𝘅𝗮̉𝘆 𝗿𝗮 𝗹𝗼̂̃𝗶, 𝘃𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝘁𝗵𝘂̛̉ 𝗹𝗮̣𝗶 𝘁𝗿𝗼𝗻𝗴 𝗴𝗶𝗮̂𝘆 𝗹𝗮́𝘁!!\n' + e, event.threadID, event.messageID);
        }
    }
}
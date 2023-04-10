module.exports.config = {
  name: "chatgpt",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "npham",
  description: "Chat với chatgpt",
  commandCategory: "Search",
  cooldowns: 0,
  dependencies: {
    "axios": ""
  }
};

module.exports.run = async ({ api, event, args }) => {
  try {
    const axios = global.nodemodule["axios"];
    const { threadID, messageID} = event;
    const text = args.join(" ");
    if (!text) return api.sendMessage('[⚜️] Cậu vui lòng nhập câu hỏi cần trả lời!', event.threadID, event.messageID);
    const headers = {
  'Authorization': 'Bearer pk-OAMpdXeMgotlwPFVqVfIdRgrMmQOIIeVlIAUNmwnIcwzVpRf',
  'Content-Type': 'application/json'
};
const data = JSON.stringify({
    "model": "gpt-3.5-turbo",
    "max_tokens": 4000,
    "messages": [
      {
        "role": "user",
        "content": text
      }
    ]
  });

    
    const res = await axios.post('https://api.pawan.krd/v1/chat/completions', data, { headers });
    api.sendMessage(res.data.choices[0].message.content, event.threadID, event.messageID);
  } catch (err) {
    console.log(err)
    return api.sendMessage("[⚜️] Không thể xử lý yêu cầu của cậu!", event.threadID);
  }
}

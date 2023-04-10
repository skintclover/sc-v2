module.exports.config = {
  name: "textgpt",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "npham",
  description: "Chat với textgpt",
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
    const data = {
  prompt: text,
  temperature: 0.7,
  max_tokens: 4000,
  top_p: 0.9,
  frequency_penalty: 0,
  presence_penalty: 0,
  model: 'text-davinci-003'
};    
    const res = await axios.post('https://api.pawan.krd/v1/completions', data, { headers });
    api.sendMessage(res.data.choices[0].text, event.threadID, event.messageID);
  } catch (err) {
    console.log(err)
    return api.sendMessage("[⚜️] Không thể xử lý yêu cầu của cậu!", event.threadID);
  }
}

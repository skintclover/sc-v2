module.exports.config = {
  name: "chatgpt2",
  version: "1.0.2",
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
  'User-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.0.0',
  'Content-Type': 'application/json',
  'Cookie':'supabase-auth-token=%5B%22eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjgxNjEzMTk1LCJzdWIiOiI1ODQzYjE0NS00YTM5LTQ5ODQtYmJjZC00YmE1NDZhY2NmZTAiLCJlbWFpbCI6ImZyZWVhY2MuMjcwODg4QGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZ2l0aHViIiwicHJvdmlkZXJzIjpbImdpdGh1YiJdfSwidXNlcl9tZXRhZGF0YSI6eyJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzkwNjAwNzYzP3Y9NCIsImVtYWlsIjoiZnJlZWFjYy4yNzA4ODhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IlNraW50Q2xvdmVyNDQ1NCIsImlzcyI6Imh0dHBzOi8vYXBpLmdpdGh1Yi5jb20iLCJuYW1lIjoiU2tpbnRDbG92ZXI0NDU0IiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2tpbnRjbG92ZXIiLCJwcm92aWRlcl9pZCI6IjkwNjAwNzYzIiwic3ViIjoiOTA2MDA3NjMiLCJ1c2VyX25hbWUiOiJza2ludGNsb3ZlciJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im9hdXRoIiwidGltZXN0YW1wIjoxNjgxMDA4Mzk1fV0sInNlc3Npb25faWQiOiIyYzcyNTk4Ny1lZTA4LTQ4NWYtYWFkOS02OTIyMWFkYjNjZDUifQ.aEgHc52wR1yfNTpl6ulQllilBX14rCyLrIpfXmk_RwA%22%2C%22iuS2DWOkyhCYuLHLY-_mIQ%22%2C%22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%22%2Cnull%2Cnull%5D'
};
const data = JSON.stringify({"messages":[{"role":"user","content":"Hãy nhớ rằng \"tớ\"=\"tôi\" và \"cậu\"=\"bạn\",Và hãy xưng hô là tớ với cậu thay vì tôi với bạn khi trả lời câu hỏi của tớ nhé!"},{"role":"assistant","content":"Chào cậu! Tớ có thể giúp gì cho cậu hôm nay?"},{"role":"user","content":text}]});
 
 
    const res = await axios.post('https://openprompt.co/api/chat2', data, { headers });
    api.sendMessage(res.data, event.threadID, event.messageID);
  } catch (err) {
    console.log(err)
    return api.sendMessage("[⚜️] Không thể xử lý yêu cầu của cậu!", event.threadID);
  }
}

module.exports.config = {
    name: "spotify",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "npham",
    description: "Phát nhạc thông qua link Spotify hoặc từ khoá tìm kiếm",
    commandCategory: "Phương tiện",
    usages: "[search]",
    cooldowns: 5,
    envConfig: {
        "API_KEY": "GhvsGFjg"
    }
};
var timeSearch = 7; // Tìm kiếm theo thời gian, ví dụ: 4, 5, 6,...,<= 9

module.exports.run = async function({
    event: e,
    api: t,
    args: a,
    body: s
}) {
    const n = require("axios"),
        {
            createReadStream: r,
            statSync: i,
            writeFileSync: o,
            createWriteStream: d,
            unlinkSync: u
        } = require("fs-extra"),
        {
            threadID: c,
            senderID: l,
            messageID: g
        } = e,
        {
            API_KEY: h
        } = global.configModule[this.config.name];
    try {
        if (0 == a.length || !a) return t.sendMessage("Nhập ký tự cần tìm kiếm!", c, g);
        if (0 == a.join(" ").indexOf("https://")) {
            const e = a.join(" ").trim();
            try {
                let {
                    data: a
                } = await n.get(`https://nguyenmanh.name.vn/api/spDL?url=https://open.spotify.com/${e}&apikey=${h}`);
                if (a.error) return t.sendMessage(a.error, c);
                if (t.sendMessage("Đang tải, cậu vui lòng chờ", c, ((e, a) => setTimeout((() => {
                        t.unsendMessage(a.messageID)
                    }), 3e4))), "200" != a.status) return t.sendMessage("Đã có lỗi api khiến tớ không thể tải nhạc cho cậu!", c, g);
                let s = a.result.name,
                    d = a.result.preview_audio;
                var m = __dirname + `/cache/sp.mp3`;
                const l = (await n.get(d.trim(), {
                    responseType: "arraybuffer"
                })).data;
                if (o(m, Buffer.from(l, "utf-8")), i(m).size > 1164e6) return t.sendMessage("Tớ không thể gửi file vì nó quá lớn:((", c, (() => u(m)), g);
                return await t.sendMessage({
                    body: s,
                    attachment: r(m)
                }, c, (() => u(m)), g)
            } catch (e) {
                return console.log(e), t.sendMessage("Đã có lỗi khiến tớ không thể tải nhạc cho cậu!" + e, c, g)
            }
        } else try {
            var y, f, p = [],
                M = "",
                b = 0;
            const r = encodeURIComponent(a.join(" "));
            var {
                data: v
            } = await n.get(`https://nguyenmanh.name.vn/api/spSearch?query=${r}&apikey=${h}`);
            if (v.error) return t.sendMessage(v.error, c);
            y = v.result;
            for (let e in y)
                if (null != y[e] && (f = y[e]).duration <= timeSearch && "Live" != f.duration) {
                    b = b += 1, p.push(f.id), M += `${b}.《${f.duration}》 ${f.title}\n\n`
                } s = `»🔎 Có ${p.length} kết quả trùng khớp với từ khóa của cậu!:\n\n${M}» Hãy reply (feedback) chọn 1 trong số đó để tớ còn biết.`;
            return void t.sendMessage({
                body: s
            }, c, ((t, a) => {
                client.handleReply.push({
                    name: this.config.name,
                    messageID: a.messageID,
                    author: e.senderID,
                    idSp: p
                })
            }), g)
        } catch (e) {
            return t.sendMessage("Đã có lỗi khiến tớ không thể tải nhạc cho cậu! " + e.message, c, g)
        }
    } catch (e) {
        return void console.log(e)
    }
}, module.exports.handleReply = async function({
    event: e,
    api: t,
    handleReply: a
}) {
    const s = require("axios"),
        {
            createReadStream: n,
            statSync: r,
            writeFileSync: i,
            readdirSync: o,
            unlinkSync: d
        } = require("fs-extra"),
        {
            threadID: u,
            senderID: c,
            messageID: l,
            body: g
        } = e,
        {
            API_KEY: h
        } = global.configModule[this.config.name];
    if (m = g, isNaN(m) || (m < 1 || m > 20)) return t.sendMessage("Chọn từ 1 -> 20, baby. love uwu ❤️", u, l);
    var m;
    t.unsendMessage(a.messageID), t.sendMessage("Đang tải, cậu vui lòng đợi...", u, ((e, a) => setTimeout((() => {
        t.unsendMessage(a.messageID)
    }), 3e4)));
    try {
        let {
            data: o
        } = await s.get(`https://nguyenmanh.name.vn/api/spDL?url=${a.idSp[e.body-1]}&apikey=${h}`);
        if (o.error) return t.sendMessage(o.error, u);
        let c = o.result.name,
            g = o.result.preview_audio;
        var y = __dirname + `/cache/sp.mp3`;
        const m = (await s.get(g, {
            responseType: "arraybuffer"
        })).data;
        if (i(y, Buffer.from(m, "utf-8")), r(y).size > 1164e6) return t.sendMessage("Tớ không thể gửi file vì nó quá lớn:((.", u, (() => d(y)), l);
        return await t.sendMessage({
            body: c,
            attachment: n(y)
        }, u, (() => d(y)), l)
    } catch (e) {
        return console.log(e), t.sendMessage("Đã có lỗi khiến tớ không thể tải nhạc cho cậu!" + e, u, l)
    }
};
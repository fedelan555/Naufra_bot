import { sticker} from '../lib/sticker.js'
// import uploadFile from '../lib/uploadFile.js'
// import uploadImage from '../lib/uploadImage.js'
// import { webp2png} from '../lib/webp2mp4.js'

let handler = async (m, { conn, args, usedPrefix, command}) => {
  let stiker = false

  try {
    let q = m.quoted? m.quoted: m
    let mime = (q.msg || q).mimetype || q.mediaType || ''

    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime) && (q.msg || q).seconds> 8)
        return m.reply(`🧣 *¡¡𝖾𝗅 𝗏𝗂𝖽𝖾𝗈 𝗇𝗈 𝗉𝗎𝖾𝖽𝖾 𝖽𝗎𝗋𝖺𝗋 𝗆𝖺́𝗌 𝖽𝖾 𝟪 𝗌𝖾𝗀𝗎𝗇𝖽𝗈𝗌!*`)

      let img = await q.download?.()
      if (!img)
        return conn.reply(m.chat, `🧣  *𝖯𝗈𝗋 𝖿𝖺𝗏𝗈𝗋, 𝖾𝗇𝗏𝗂́𝖺 𝗉𝗋𝗂𝗆𝖾𝗋𝗈 𝗎𝗇𝖺 𝗂𝗆𝖺𝗀𝖾𝗇, 𝗏𝗂𝖽𝖾𝗈 𝗈 𝖦𝗂𝖿...*`, m, rcanal)

      let out
      try {
        stiker = await sticker(img, false, global.packsticker, global.author)
} catch (e) {
        console.error(e)
} finally {
        if (!stiker) {
          if (/webp/g.test(mime)) out = await webp2png(img)
          else if (/image/g.test(mime)) out = await uploadImage(img)
          else if (/video/g.test(mime)) out = await uploadFile(img)
          if (typeof out!== 'string') out = await uploadImage(img)
          stiker = await sticker(false, out, global.packsticker, global.author)
}
}

} else if (args[0]) {
      if (isUrl(args[0]))
        stiker = await sticker(false, args[0], global.packsticker, global.author)
      else
        return m.reply(`🥀 *La URL enviada no es válida.*`)
}

} catch (e) {
    console.error(e)
    if (!stiker) stiker = e
} finally {
    if (stiker) {
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, {
        contextInfo: {
          forwardingScore: 200,
          isForwarded: false,
          externalAdReply: {
            showAdAttribution: false,
            title: '𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍',
            body: '🌙 Sistema de Respiraciones • Fedexyz',
            mediaType: 2,
            thumbnail: icons
}
}
}, { quoted: m})
} else {
      return conn.reply(m.chat, '🧣  *𝖯𝗈𝗋 𝖿𝖺𝗏𝗈𝗋, 𝖾𝗇𝗏𝗂́𝖺 𝗉𝗋𝗂𝗆𝖾𝗋𝗈 𝗎𝗇𝖺 𝗂𝗆𝖺𝗀𝖾𝗇, 𝗏𝗂𝖽𝖾𝗈 𝗈 𝖦𝗂𝖿...*', m, rcanal)
}
}
}

handler.help = ['stiker <img>', 'sticker <url>']
handler.tags = ['sticker']
handler.group = false
handler.register = true
handler.command = ['s', 'sticker', 'stiker']

export default handler

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}

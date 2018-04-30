const TelegramBot = require('node-telegram-bot-api');
const moment = require('moment')
const fs = require('fs');

const maxFiles = 1
const patch = '/tmp/sata/'
const _path = patch + moment().format('YYYY-MM-DD') + '/'
const token = '251203343:AAEm-r5PujHF2sryLdEAcRnyBdvDoVAChDI';

 const bot = new TelegramBot(token, {polling: true});


fs.readdir(_path, (err, items)=>{
    if(err) {
        console.log('Path not found: ' + _path)
        //sendPhoto(null, 'Path not found: ' + _path)
        return false
    }
    items.sort((a,b)=>(a<b) ? 1 : -1).slice(0, maxFiles).forEach((item) => {
      sendPhoto(_path + item, 'File name : ' + item, 300810156) // my group
      sendPhoto(_path + item, 'File name : ' + item, -189280924) //DoorBell Group
    })
})

bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1] + ' ' + chatId; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//   console.log('chatId:', msg.chat)
//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, 'Received your message: ' + chatId);
// });
function sendPhoto(name, message, chatId){
    if(name) {
        return bot.sendPhoto({
            chat_id : chatId,
            caption: message,
            photo: name
        })
    }
    return bot.sendMessage(chatId, message)
}

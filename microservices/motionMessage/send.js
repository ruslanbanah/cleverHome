const TelegramBot = require('node-telegram-bot-api');
const moment = require('moment')
const fs = require('fs');

const maxFiles = 1
const patch = '/tmp/sata/'
const _path = patch + moment().format('YYYY-MM-DD') + '/'
const token = '251203343:AAEm-r5PujHF2sryLdEAcRnyBdvDoVAChDI';

 const bot = new TelegramBot(token);


fs.readdir(_path, (err, items)=>{
    if(err) {
        console.log('Path not found: ' + _path)
        //sendPhoto(null, 'Path not found: ' + _path)
        return false
    }
    items.sort((a,b)=>(a<b) ? 1 : -1).slice(0, maxFiles).forEach((item) => {
      sendPhoto(_path + item, 'File name : ' + item, 300810156) // my group
    })
})

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

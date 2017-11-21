const telegram = require('telegram-bot-api');
const moment = require('moment')
const fs = require('fs');

const maxFiles = 2
const patch = '/tmp/sata/'
const _path = patch + moment().format('YYYY-MM-DD') + '/'

fs.readdir(_path, (err, items)=>{
    if(err) {
        console.log('Path not found: ' + _path)
        //sendPhoto(null, 'Path not found: ' + _path)
        return false
    }
    items.sort((a,b)=>(a<b) ? 1 : -1).slice(0, maxFiles).forEach((item) => {
      sendPhoto(_path + item, 'File name : ' + item)
    })
})

function sendPhoto(name, message){
   const api = new telegram({
        token: '251203343:AAEm-r5PujHF2sryLdEAcRnyBdvDoVAChDI',
    }); 
   const chatId = 300810156
    if(name) {
        return api.sendPhoto({
            chat_id : chatId,
            caption: message,
            photo: name
        })
    }
    return api.sendMessage(chatId, message)
}


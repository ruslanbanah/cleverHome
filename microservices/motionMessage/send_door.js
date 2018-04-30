const telegram = require('telegram-bot-api');
const moment = require('moment')
const fs = require('fs');

const maxFiles = 1
const patch = '/tmp/doorBell/'
const _path = patch + moment().format('YYYY-MM-DD') + '/'

const api = new telegram({
     token: '251203343:AAEm-r5PujHF2sryLdEAcRnyBdvDoVAChDI',
 });

fs.readdir(_path, (err, items)=>{
    if(err) {
        console.log('Path not found: ' + _path)
        //sendPhoto(null, 'Path not found: ' + _path)
        return false
    }
    items.sort((a,b)=>(a<b) ? 1 : -1).slice(0, maxFiles).forEach((item) => {
      sendPhoto(_path + item, 'File name : ' + item, 300810156) //Home
      sendPhoto(_path + item, 'File name : ' + item, -189280924) //DoorBell
    })
})
//
// api.on('message', function(message)
// {
// 	var chat_id = message.chat.id;
//
// 	// It'd be good to check received message type here
// 	// And react accordingly
// 	// We consider that only text messages can be received here
//
// 	api.sendMessage({
// 		chat_id: message.chat.id,
// 		text: message.text ? message.text : 'This message doesn\'t contain text :('
// 	})
// 	.then(function(message)
// 	{
// 		console.log(message);
// 	})
// 	.catch(function(err)
// 	{
// 		console.log(err);
// 	});
// });

function sendPhoto(name, message, chatId){
    if(name) {
        return api.sendPhoto({
            chat_id : chatId,
            caption: message,
            photo: name
        })
    }
    return api.sendMessage(chatId, message)
}

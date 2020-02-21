const {ChatModel} = require('../db/models')
module.exports = function (server) {
    const io = require('socket.io')(server)
    io.on('connection', function (socket) {
        socket.on('sendMsg', function({from, to, content}){
            console.log('服务器接收消息:',{from, to, content})
            const chat_id = [from, to].sort().join('_')
            const create_time = Date.now()
            new ChatModel({from, to, chat_id, create_time, content}).save(function(error, chatMsg){
                if (chatMsg) {
                    io.emit('receiveMsg', chatMsg)
                }
            })
        })
    })
}
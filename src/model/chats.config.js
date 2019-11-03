const Message = require("./Message");

class Chats {
    constructor() {
    }

    /**
     * Iniciar canales
     * @param io
     */
    static startChat(io) {
        this._general(io);
    }

    /**
     * Chat general
     * @param io Socket
     * @private
     */
    static _general(io) {
        let general = io.of('/general')
        // Acciones cuando se haga la conexión
            .on('connection', socket => {
                console.log('GENERAL', 'CONNECTION', 'Alguien ingresó al canal general');
                general.emit('message', Message.normal('Bot', 'Alguien más ingresó al canal.'));

                // Mensaje de bienvenida
                socket.emit('message', Message.normal('Bot', 'Bienvenido al chat general! :smile:'));

                socket.on('message', data => {
                    general.emit('message', Message.normal(data['data']['username'], data['data']['text']));
                    console.log('GENERAL', 'MESSAGE', data);
                })
            });
    }
}

module.exports = Chats;
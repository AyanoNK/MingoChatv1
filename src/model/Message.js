class Message {

    /**
     * Mensaje estandar
     * @param username
     * @param text
     * @returns {{data: {text: *, username: *}}}
     */
    static normal(username, text) {
        return {
            data: {
                username: username,
                text: text
            }
        }
    }
}

module.exports = Message;
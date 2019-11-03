(function () {

})();

let general = io.connect(app.get('port'));
console.log(app.get('port'), 'perico');

general.on('message', data => {
    addMessage(data);
    console.log(data);
});

let addMessage = data => {
    
    
    let box = document.getElementById('chat-box');
    let node = document.createElement('div');
    let username = document.createElement('span');
    username.setAttribute('class', 'username');
    username.innerText = data['data']['username'];
    let message = document.createElement('span');
    message.setAttribute('class', 'message');
    message.innerText = data['data']['text'];
    node.appendChild(username);
    node.appendChild(message);

    box.appendChild(node);
};

let sendMessage = () => {
    let mess = document.getElementById('do-message');

    general.emit('message', {data: {username: 'Visitante', text: mess.value}});

    mess.value = '';
};

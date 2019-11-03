let socket = io.connect(app.get('port') ||'http://localhost:4000/general');

socket.on('news', data => {
    console.log(data);
});
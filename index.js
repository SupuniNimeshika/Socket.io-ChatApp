var app =require('express')();//Express initializes app to be a function handler that you can supply to an HTTP server
var http = require('http').Server(app);
var io = require('socket.io')(http);//initialize a new instance of socket.io by passing the http (the HTTP server) object

//define a route handler / that gets called when we hit our website home
/*app.get('/', function(req, res){

  //we’re calling res.send and pass it a HTML string. It is much difficult and should serve as another html
  res.send('<h1>Hello world</h1>');
});
*/

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);// display msg in console log
        io.emit('chat message', msg);//emit the event from the server to the rest of the users using emit event

        });


    socket.on('disconnect', function(){
        console.log('user disconnected');

    });
});

//refactor our route handler to use sendFile
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//make the http server listen on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});

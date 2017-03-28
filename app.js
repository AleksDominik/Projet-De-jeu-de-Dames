/*
** pour utiliser ce serveur, il faut charger la page /ioclient.html
*/
var connect = require('connect')
  , serveStatic = require('serve-static')
  , app = connect()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  , port = 8080
;

/*
** static resource server middleware
*/
app.use(serveStatic('htdocs'));


/*
** start server
*/
server.listen(port);
var user_count = 0;

/*
** socket connection listener
*/
io.on('connection', function (socket) {

  socket.on('add user', function (username) {
    socket.username = username;
    console.log("new user:"+username+" logged.");
    io.emit('add user',{
      username: socket.username
    });
  });
  
  socket.on('disconnect',function(){
    console.log(socket.username+" left.");
    io.emit('user left',{
      username:socket.username
    });
  });

  socket.on('chat message', function (data) {
    io.emit('chat message', {
      username: socket.username,
      message: data
    });
  });

  socket.on('deplacer', function (data) {
    io.emit('deplacer', {
      message: data,
    });
  });

});

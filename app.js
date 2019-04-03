  
/*
** pour utiliser ce serveur, il faut charger la page /ioclient.html
*/
var connect = require('connect')
  , serveStatic = require('serve-static'),
  express=require('express')
  ,app=express()
 /* //, app = connect().use(serveStatic('htdocs', {'index':['pagedacceuill.html']})) // middleware de gestion de pages statiques
.use(function(request,response) { // middleware maison pour gestion 404
response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf8' });
response.end('Désolé, le document demandé est introuvable...');
})*/
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  , port = 8080
;
app.use(express.static(__dirname + '/htdocs',{index:"pagedacceuill.html"}));

/*
** static resource server middleware
*/
//app.use(serveStatic('htdocs'));


/*
** start server
*/
/*app.all("/app", function (req, res, next) {
 console.log("requete envoye a une la page principe");
res.sendFile('index.html', { root: __dirname + "/htdocs" } );

});*/
app.listen(port);

var user_count = 0;


/*
** socket connection listener
*/
io.on('connection', function (socket) {
  console.log('client connected');

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

  socket.on('game message', function (data) {
    io.emit('game message', {
      message: data
    });
  });

  socket.on('deplacer', function (data) {
    io.emit('deplacer', {
      message: data,
    });
  });

});
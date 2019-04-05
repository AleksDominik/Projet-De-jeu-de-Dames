  
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

server.listen(port);


var user_count = 0;
function VerifieCoup(Position, tabCoup){//prend la position que le serveur connait et le tableau case depart -case arrive est valable

//prise en compte de la validiter et des reggggggggles.
if((tabCoup[1][0]%2==0 && tabCoup[1][1]%2==0)|| ((tabCoup[1][0]%2==0 && tabCoup[1][1]%2==0))){   //il faut etre sur les case valide



}


}

function CreerUnjeu(){

  this.Listedespion=[];
   this.temps1;
    this.temps1;
  this.debut=function(){
    for (var i = 0; i < 10; i++) {
      for (var j = 0;j< 10; j++) {
        if ((i%2==0) &&( j%2==0) && (i<4)) {
         this.Listedespion.push([]);
          console.log("pion du joueur 1op1",this.Listedespion);
          this.Listedespion[i].push(1);
        }
        else if ((i%2==0 )&& (j%2==0)&& (i>5)) {
          
          this.Listedespion[i].push(2);

          console.log("pion du joueur 2");

        }
        else if ((i%2==1) && (j%2==1) && (i<4)) {
          //this.Listedespion[i][j]=1;
          this.Listedespion[i].push(1);
          console.log("pion du joueur 1op2");
            
        }
        else if ((i%2==1) && (j%2==1) && (i>5)) {
          //this.Listedespion[i][j]=2;
          this.Listedespion[i].push(2);
          console.log("pion du joueur 2");

        }
        else{
          this.Listedespion[i].push(3);
        }

            }
      
  }





}
return this
}
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
  
  socket.on("debutdepartie",function(){
      lejeu=CreerUnjeu();
       lejeu.debut();
       console.log(lejeu.Listedespion);
    io.emit("positioninitial",{
      position:lejeu.Listedespion})
  })

socket.on("coupjouer",function(data){
console.log("coup joue",data);




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
  
/*
** pour utiliser ce serveur, il faut charger la page /ioclient.html
*/
var connect = require('connect')
  , serveStatic = require('serve-static')
  ,url = require('url')
  ,express=require('express')
  ,app=express()
  ,fs = require('fs')
//  , http = require('http')
  , server =app.listen(8080) //http.createServer(app)
  , io = require('socket.io').listen(server)
  , port = 8080
;
//app.set('port', process.env.PORT || 8080);

app.use(express.static(__dirname + '/htdocs',{index:"pagedacceuill.html"}));
//;express.static(__dirname + '/htdocs',{index:"pagedacceuill.html"})
app.get("/index", function(req, res){
  res.type('text/plain');
  
  express.static(__dirname + '/htdocs',{index:"index.html"});
  //res.redirect("./htdocs/pagedacceuill.html");console.log("requetedeindex");


});
/*app.listen(port, function(){
  console.log( 'Express started on http://localhost:' +    port + '; press Ctrl-C to terminate.' );
});*/

function ChercheCoup(Pion, Position,joueur){//coordonne du pion analyser Position des pions sur le tableau et indice du joueur
 tabpos=[]; 
 //console.log(Pion);
  if((Pion[0]+2<10 && Pion[1]+2<10)&& (Position[Pion[0]+1][Pion[1]+1]!==3 &&Position[Pion[0]+1][Pion[1]+1]!==joueur && Position[Pion[0]][Pion[1]]==joueur && Position[Pion[0]+2][Pion[1]+2]==3)){//en bas /a droite
    console.log("en bas /a droite");
tabpos.push([Pion,[Pion[0]+1,Pion[1]+1],[Pion[0]+2,Pion[1]+2]]);

  }
  if((Pion[0]+2<10 && Pion[1]-2>0  )  &&(Position[Pion[0]+1][Pion[1]-1]!=3 &&Position[Pion[0]+1][Pion[1]-1]!=joueur&& Position[Pion[0]][Pion[1]]==joueur  && Position[Pion[0]+2][Pion[1]-2]==3)){// en bas a gauche
tabpos.push([Pion,[Pion[0]+1,Pion[1]-1],[Pion[0]+2,Pion[1]-2]]);
 console.log("en bas a gauche");
  }
  if((Pion[0]-2>0 && Pion[1]+2<10) &&(Position[Pion[0]-1][Pion[1]+1]!=3 &&Position[Pion[0]-1][Pion[1]+1]!=joueur&& Position[Pion[0]][Pion[1]]==joueur  && Position[Pion[0]-2][Pion[1]+2]==3)){// en haut a droite
tabpos.push([Pion,[Pion[0]-1,Pion[1]+1],[Pion[0]-2,Pion[1]+2]]);
 console.log("en haut a droite");
  }
  if((Pion[0]-2>0 && Pion[1]-2>0)&&(Position[Pion[0]-1][Pion[1]-1]!=3 &&Position[Pion[0]-1][Pion[1]-1]!=joueur && Position[Pion[0]][Pion[1]]==joueur  && Position[Pion[0]-2][Pion[1]-2]==3)){// en haut a gauche
tabpos.push([Pion,[Pion[0]-1,Pion[1]-1],[Pion[0]-2,Pion[1]-2]]);
 console.log("en haut a gauche");
  }
return tabpos


}
//server.listen(port);




var user_count = 0;

function RecherchePosition(Position,joueur){
  var Positionfinal=clone2D(Position);
 listedespositionpossibles=[];
  for (var i = 0 ; i <= 9; i++) {
    for (var j = 0 ;j< 9; j++) {
      temp=ChercheCoup([i,j], Positionfinal,joueur); //temp peut contenir plusieur coup possibles pour une position
     if(temp.length!=0){
     listedescoupspossibles.push(temp);
     }


      // console.log(ChercheCoup(Positionfinal[i][j], Positionfinal,1));
     }     
    }
    if (listedescoupspossibles.length!=0) {
      console.log("coup possible detecte",listedescoupspossibles);
      for (var i = 0; i<listedescoupspossibles.length; i++) {
  Positionfinal=clone2D(Position);
  temp=listedescoupspossibles[i];

  for (var j = 0; j<temp.length; j++) {
    temp2=clone2D(temp[j]);
    console.log("la variable temp2",temp2);
    pion=Positionfinal[temp2[0][0]][temp2[0][1]];
     Positionfinal[temp2[0][0]][temp2[0][1]]=3;
     Positionfinal[temp2[1][0]][temp2[1][1]]=3;
     Positionfinal[temp2[2][0]][temp2[2][1]]=pion;
    listedespositionpossibles.push(Positionfinal);

  }

  

  }
   console.log("les positions possibles",listedespositionpossibles);
    }

 
return listedespositionpossibles;
}
function clone2D(a) {
  return a.map(o => [...o]);
}
function VerifieCoup(Position, tabCoup, joueur){//prend la position que le serveur connait et le tableau case depart -case arrive est valable
var tableaudesposibles;

var Positionfinal=clone2D(Position);
/*if(Position[tabCoup[0][0]][tabCoup[0][1]]==joueur){
  return {Posit:Position,error: "case errone"};
}*/
//prise en compte de la validiter et des reggggggggles.
console.log("tabCoup",tabCoup);
if( ( (tabCoup[1][0]%2==0 && tabCoup[1][1]%2==0)|| (tabCoup[1][0]%2==1 && tabCoup[1][1]%2==1) )&&( (tabCoup[0][0]%2==0 && tabCoup[0][1]%2==0)|| ((tabCoup[0][0]%2==1 && tabCoup[0][1]%2==1)))   ){   //il faut etre sur les case valide

if(Positionfinal[tabCoup[1][0]][tabCoup[1][1]]==3){ //arrive vide
//supp case depart;
listedescoupspossibles=[];
Posi1=RecherchePosition(Position,joueur);
while(Posi1.length>0){
  for (var h = 0; h<Posi1.length; h++) {
    
  }
}
 /* for (var i = 0 ; i <= 9; i++) {
    for (var j = 0 ;j< 9; j++) {
      temp=ChercheCoup([i,j], Positionfinal,joueur);
     if(temp.length!=0){
     listedescoupspossibles.push(temp);
     }
     // console.log(ChercheCoup(Positionfinal[i][j], Positionfinal,1));
     }     
    }*/
   
    //console.log("les prises possibles sont:",listedescoupspossibles);
   // if(listedescoupspossibles.length==0) {
      pion=Positionfinal[tabCoup[0][0]][tabCoup[0][1]];
      Positionfinal[tabCoup[0][0]][tabCoup[0][1]]=3;
      Positionfinal[tabCoup[1][0]][tabCoup[1][1]]=pion;
     //}
  
  }

}


return Positionfinal;
}


function CreerUnjeu(){

  this.Listedespion=[];
  this.tour;
     this.temps1;
    this.temps1;
    this.ajouer=function(){
      if (this.tour==1) {
        this.tour=2;
      }
      else this.tour=1;
    }
  this.debut=function(){
    this.tour=1;
    for (var i = 0; i < 10; i++) {
      for (var j = 0;j< 10; j++) {
        if ((i%2==0) &&( j%2==0) && (i<4)) {
         this.Listedespion.push([]);
          //console.log("pion du joueur 1op1",this.Listedespion);
          this.Listedespion[i].push(1);
        }
        else if ((i%2==0 )&& (j%2==0)&& (i>5)) {
          
          this.Listedespion[i].push(2);

          //console.log("pion du joueur 2");

        }
        else if ((i%2==1) && (j%2==1) && (i<4)) {
          //this.Listedespion[i][j]=1;
          this.Listedespion[i].push(1);
         // console.log("pion du joueur 1op2");
            
        }
        else if ((i%2==1) && (j%2==1) && (i>5)) {
          //this.Listedespion[i][j]=2;
          this.Listedespion[i].push(2);
        //  console.log("pion du joueur 2");

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
  
  
  var lejeu=CreerUnjeu();

/*fs.writeFile('./Public/Basedesparties.json', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});
*/


  socket.on('add user', function (username) {
    socket.username = username;
    console.log("new user:"+username+" logged.");
    io.emit('add user',{
      username: socket.username
    });
  });
  
  socket.on("debutdepartie",function(){
      
       lejeu.debut();
       console.log(lejeu.Listedespion);
    io.emit("positioninitial",{
      position:lejeu.Listedespion,tour:lejeu.tour})
  })

socket.on("coupjouer",function(data){
console.log("coup joue",data);

if(lejeu.Listedespion[data[0][0]][data[0][1]]==lejeu.tour && lejeu.Listedespion[data[1][0]][data[1][1]]==3){
lejeu.Listedespion=VerifieCoup(lejeu.Listedespion, data,lejeu.tour);
console.log(lejeu.Listedespion);
lejeu.ajouer();
io.emit("NouvellePosition",{Position:lejeu.Listedespion,tour:lejeu.tour});
}
else{  

io.emit("NouvellePosition",{Position:lejeu.Listedespion,tour:lejeu.tour});
}





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
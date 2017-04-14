
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







function partie()
{
  this.cestaquidejouer=0;// definit le joueur cest a qui de jouer
  this.tableaudecaseclike=new Array;
  this.noeud= [
 d150=["1","6","12","17","23","28","34","39","45","50"],
d510=["5","10"],
d420=["4","9","15","20"],
d330=["3","8","14","19","25","30"],
d240=["2","7","13","18","24","29","35","40"],
d1149=["11","16","22","27","33","38","44","49"],
d2148=["21","26","32","37","43","48"],
d3147=["31","36","42","47"],
d4146=["41","46"],

d211=["2","6","11"],
d321=["3","7","12","16","21"],
d431=["4","8","13","17","22","26","31"],
d541=["5","9","14","18","23","27","32","36","41"],
d1046=["10","15","19","24","28","33","37","42","46"],
d2047=["20","25","29","34","38","43","47"],
d3048=["30","35","39","44","48"],
d4049=["40","45","49"] ];
this.name;
this.pionbouger=[[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],[31,32,33,34,35,36,37,35,39,40,41,42,43,44,45,46,47,48,49,50]]

}

function coupObj(){ 
   this.coup_de_depart;
   this.coup_darrive;
   this.pion_pris=new Array;
      }


function joueur(joueur){this.nom=joueur; this.pion=new Array;}; 
  joueur1= new joueur('joueur1');
  joueur2= new joueur('joueur2');
 
function cherchesurdiago(c,s){

  if (partie.cestaquidejouer%2==0){

                var tabo=[[],[]];

        if(  (typeof partie.noeud[s][c+2] !=="undefined") &&  !$(document.getElementById(partie.noeud[s][c+2])).hasClass("joueur2") && !$(document.getElementById(partie.noeud[s][c+2])).hasClass("joueur1") && $(document.getElementById(partie.noeud[s][c+1])).hasClass("joueur2") )
          {tabo[0].push(partie.noeud[s][c+2]),tabo[1].push(partie.noeud[s][c+1]) } 
       if(typeof partie.noeud[s][c-2]!=="undefined" && !$(document.getElementById(partie.noeud[s][c-2])).hasClass("joueur2") && !$(document.getElementById(partie.noeud[s][c-2]) ).hasClass("joueur1") && $(document.getElementById(partie.noeud[s][c-1])).hasClass("joueur2") ){tabo[0].push(partie.noeud[s][c-2]),tabo[1].push(partie.noeud[s][c-1]) } 
         return tabo
         }             
      else{
        var tabo=[[],[]];
         if(typeof partie.noeud[s][c+2]!=="undefined" &&  !$(document.getElementById(partie.noeud[s][c+2])).hasClass("joueur2") && !$(document.getElementById(partie.noeud[s][c+2])).hasClass("joueur1") && $(document.getElementById(partie.noeud[s][c+1])).hasClass("joueur1") ){tabo[0].push(partie.noeud[s][c+2]),tabo[1].push(partie.noeud[s][c+1]) } 
          if(typeof partie.noeud[s][c-2]!=="undefined" && !$(document.getElementById(partie.noeud[s][c-2])).hasClass("joueur2") && !$(document.getElementById(partie.noeud[s][c-2]) ).hasClass("joueur1") && $(document.getElementById(partie.noeud[s][c-1])).hasClass("joueur1")   ){tabo[0].push(partie.noeud[s][c-2]),tabo[1].push(partie.noeud[s][c-1]) } 
         return tabo
         }             
}


function cherchesurdiago1(c,s){

  if(partie.cestaquidejouer%2==0){
    tabo1=[];

   if((typeof partie.noeud[s][c+1]!=="undefined") &&  !$(document.getElementById(partie.noeud[s][c+1])).hasClass("joueur2") && !$(document.getElementById(partie.noeud[s][c+1])).hasClass("joueur1")) { var tabo1=[];tabo1.push(partie.noeud[s][c+1]) } 
         return tabo1    
                            }
  else {
             if(typeof partie.noeud[s][c-1]!=="undefined" &&  !$(document.getElementById(partie.noeud[s][c-1])).hasClass("joueur2") && !$(document.getElementById(partie.noeud[s][c-1])).hasClass("joueur1")) {var tabo1=[]; tabo1.push(partie.noeud[s][c-1]) } 
          return tabo1    
                            }

      }



function nexttake(coup)
{
 var  tabofmove=[[],[]] ; 
    
           {  for (var s=0; s< partie.noeud.length ;s++ ) 
                    { 
                      if ( partie.noeud[s].includes(coup) && s<=8 ) {h=cherchesurdiago(partie.noeud[s].indexOf(coup),s); tabofmove[0]=tabofmove[0].concat(h[0]); tabofmove[1]=tabofmove[1].concat(h[1])} 
                      if ( partie.noeud[s].includes(coup) && s>8 )  {h=cherchesurdiago(partie.noeud[s].indexOf(coup),s); tabofmove[0]=tabofmove[0].concat(h[0]); tabofmove[1]=tabofmove[1].concat(h[1])} 
                     }
            }
  return tabofmove
  }
                    

function nextstpmov(coup){
var  tabofmove1=[] ; 

           {  
            for (var s=0; s< partie.noeud.length ;s++ ) 
                    { if ( partie.noeud[s].includes(coup) && s<=8 ){tabofmove1=[].concat(cherchesurdiago1(partie.noeud[s].indexOf(coup),s))}
                            
                      if ( partie.noeud[s].includes(coup) && s>8 ){tabofmove1=tabofmove1.concat(cherchesurdiago1(partie.noeud[s].indexOf(coup),s)) }
                     }
          }
 return tabofmove1
 }


function coupajouer(coup)
{  


  if( nexttake(coup)!=0 )
{
   var coupvalable=nexttake(coup);
   var Liste_des_coup=[]; 
for (var i = 0; i< coupvalable[0].length; i++) {
    Liste_des_coup.push(new coupObj()); Liste_des_coup[i].coup_de_depart=coup; Liste_des_coup[i].pion_pris=[coupvalable[1][i]];Liste_des_coup[i].coup_darrive=coupvalable[0][i];
                      }
for (var j=0;j<Liste_des_coup.length;j++){
   var    coupactuel=Liste_des_coup[j];
     var temp=nexttake(coupactuel.coup_darrive);
  if(temp[0].includes(coupactuel.coup_de_depart)){d=temp[1].indexOf(coupactuel.coupdepart);temp[0].splice(d,1);temp[1].splice(d,1)}
    var c=temp[0].length ;
  if(c!=0){
    for( var k=0; k<temp[0].length;k++){ 
     var indi=Liste_des_coup.length
    Liste_des_coup.push(new coupObj()); Liste_des_coup[indi].coup_de_depart=coupactuel.coup_darrive;Liste_des_coup[indi].coup_darrive=temp[0][k];var g=[];
     g=Liste_des_coup[j].pion_pris;temp[1].forEach(function(element){g.push(element)})
    Liste_des_coup[indi].pion_pris=g;$.unique(Liste_des_coup[indi].pion_pris)

       }
     }
  }
   return Liste_des_coup
} 
  else { return nextstpmov(coup).concat([0]);}   

 }



partie=new partie();
c= new coupObj();

















































let express = require('express');
let app = express();

let server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get("/hola-mundo",(req,res) =>{
    res.status(200).send("hola ruta");
});
var messages =[{
    id :1,
    text: 'Bienvenido al char privado',
    nickname: 'Bot --'
}];

io.on('connection', (socket)=>{
    console.log("el cliente con ip: "+socket.handshake.address+ " se ha conectado");
    socket.emit('messages', messages);
    //reciva evento del front
    socket.on('add-message', function(data){
        messages.push(data);
        io.sockets.emit('messages',messages);
    });    

});

server.listen(6677, function(){
    console.log(`server funcionando en :6677`);
});
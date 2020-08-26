let socket = io.connect('http://192.168.1.3:6677', {'forceNew':true});

socket.on('messages',(data)=>{
    console.log(data);
    render(data);
})
function render (data){
    var html = data.map(function(message, index){
        return(`
            <div class="message">
                <strong class="list-group-item list-group-item-primary">${message.nickname}</strong>
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');
    var div_msgs = document.querySelector("#messages").innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e){
    let nuevomensaje = {
        nickname : document.querySelector("#nickname").value,
        text: document.querySelector("#text").value
    };
    document.querySelector("#nickname").style.display = 'none';
    //emitimos un evento del cliente al servidor
    socket.emit('add-message', nuevomensaje);
    return false;
}
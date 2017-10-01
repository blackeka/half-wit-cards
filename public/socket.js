//make connection

const socket = io.connect('http://localhost:3000') 

//query DOM
// const pile = document.getElementById('pile');
// const btn = document.getElementById('play')
// btn.addEventListener('click', () => {
//   socet.emit('play turn', {
//     card: card.value,
    
//   })
// })

var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');
// Emit events
// var handleSend = function(){
//   socket.emit('chat', {
//     message: message.value,
//     handle: handle.value
//     });
//   message.value = "";
// });

// var handleTypin =  () => {
//   socket.emit('typing', handle.value);
// })
// Listen for events
socket.on('chat', function(data){
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', (data) => {
  feedback.innerHTML = '<p><em>' + data + 'is typing a message...</em></p>';
})
{/* <div id="testing">
          <div id="chat-window">
            <div id="output"></div>
            <div id="feedback"></div>
          </div>
          <input id="handle" type="text" placeholder="Handle" onChange={this.handleChange}/>
          <input id="message" type="text" placeholder="Message" onChange={this.messageChange}/>
          <button id="send" onClick={this.sendClick}>Send</button>
        </div>
          */}
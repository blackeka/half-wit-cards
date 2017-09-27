//make connection

const socket = io.connect('http://localhost:3000') 

//query DOM
const pile = document.getElementById('pile');
const btn = document.getElementById('play')
btn.addEventListener('click', () => {
  socet.emit('play turn', {
    card: card.value,
    
  })
})
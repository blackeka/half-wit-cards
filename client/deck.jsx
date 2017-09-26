//start with Stack data-structure
const Deck = () => {
  //empty storage for cards
  this.cards = [];
};

//add methods to Stack.prototype
//make a deck
Deck.prototype.makeDeck = () => {
  //array of card numbers, & faces - ranks (13)  
  const ranks = ["2", "3", "4", "5", "6", "7", "8", "9",
  "10", "J", "Q", "K", "A"];
  //array of suits (4)
  const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
  //create cards array (ranks * suits) 
  //permutation...
  ranks.forEach((rank) => {
    suits.forEach((suit) => {
      let card = {rank, suit};
      this.cards.push(card);
    });
  });
  return this.cards;
}

Deck.prototype.deal = () => {
  //pop off top of cards
  let card = this.cards[this.cards.length - 1];
  this.cards.slice(0, this.cards.length - 1);
  return card;
}

Deck.prototype.shuffle = () => {
  //2500 overhand shuffles to randomize a deck of 52...
  let count = 0;
  let len = this.cards.length;
  while(count < 2500) {
    for(let i = 0; i < len; i++) {
      let index = Math.floor(Math.random() * this.cards.length);
      let temp = this.cards[i];
      this.cards[i] = this.cards[index];
      this.cards[k] = temp;
    }
  }
}


    
    
    
  //shuffle a deck
    //create a temporary storage
    //use Math.random to reorder the deck
  //deal cards
  //draw cards

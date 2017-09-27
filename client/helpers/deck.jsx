
import React from 'react';
//start with Stack data-structure
// const Deck = () => {
//   //empty storage for cards
//   deck = [];
// };

//add methods to Stack.prototype
//make a deck
const makeDeck = () => {
  const deck = [];
  //array of card numbers, & faces - ranks (13)  
  const ranks = ["2", "3", "4", "5", "6", "7", "8", "9",
  "10", "JACK", "QUEEN", "KING", "ACE"];
  //array of suits (4)
  const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
  //create cards array (ranks * suits) 
  //permutation...
  ranks.forEach((rank) => {
    suits.forEach((suit) => {
      let card = {rank, suit};
      deck.push(card);
    });
  });
  return deck;
}

const deal = (deck, n) => {
  //pop off top of cards
  let cards = [];
  for(let i = 1; i <= n; i++) {
    let card = deck[deck.length - 1];
    deck.pop();
    cards.push(card);
  }
  return cards;
}

const shuffle = (deck) => {
  //2500 overhand shuffles to randomize a deck of 52...
 //cut it down to 300
  
  let len = deck.length;
  for(let count = 0; count < 300; count++) {
    for(let i = 0; i < len; i++) {
      let index = Math.floor(Math.random() * deck.length);
      let temp = deck[i];
      deck[i] = deck[index];
      deck[index] = temp;
    }
  }
  return deck;
}

const chooseCard = (pile, n) => {
  let card = undefined;
  if (pile.length && n >= 0) {
    card = pile[n];
    pile.splice(n, 1);
  } 
  return card;
}

const pickupPile = (pile, hand) => {
  return hand.concat(pile);
}

const displayCards = (deck) => {
  // return (
  //   {deck.map((card) => (
  //     <div className="card">
  //       <div className="rank">
  //         {card.value}
  //         <div className={`suit${card.suit}`}>

  //         </div>
  //       </div>
  //     </div>
  //   )
  // )});
}

module.exports = {
  makeDeck,
  deal,
  shuffle
}  
    
    
  //shuffle a deck
    //create a temporary storage
    //use Math.random to reorder the deck
  //deal cards
  //draw cards

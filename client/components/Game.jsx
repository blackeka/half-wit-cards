import React from 'react';
import {makeDeck, shuffle, deal, drawCard, pickupPile} from '../helpers/deck.jsx';
import $ from "jquery";
// import {handleSend, handleTyping} from '../../public/socket.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      p2river: [],
      p2rback: true,
      p2draw: [],
      p2dback: true,
      p2hand: [],
      p2hback: true,
      p1river: [],
      p1rback: true,
      p1draw: [],
      p1dback: true,
      p1hand: [], 
      p1hback: false,
      p1turn: false,
      gameinit: false,
      selected: null,
      selectedRank: '',
      riverTop: [],
      riverTnum: null,
      pile: null
    };
    this.dealClick = this.dealClick.bind(this);
    this.onDraw = this.onDraw.bind(this);
    this.onselect = this.onselect.bind(this);
    this.playClick = this.playClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.messageChange = this.messageChange.bind(this);
    this.sendClick = this.sendClick.bind(this);
    this.onPilePickUp = this.onPilePickUp.bind(this);
  }
  
  componentWillMount() {
    let cards = makeDeck();
    this.setState({
      cards: shuffle(cards),
    });
  }
  
  dealClick() {
    this.setState({
      p2river: deal(this.state.cards, 3),
      // cards: this.state.cards.slice(0, 49)
    }, () => {
      this.setState({
        p1river: deal(this.state.cards, 3),
        // cards: this.state.cards.slice(0, 46)
      }, () => {
        this.setState({
          p2hand: deal(this.state.cards, 6),
          // cards: this.state.cards.slice(0, 40)
        }, () => {
          this.setState({
            p1hand: deal(this.state.cards, 6),
            // cards: this.state.cards.slice(0, 34)
          }, () => {
            this.setState({
              p2draw: deal(this.state.cards, 17),
              // cards: this.state.cards.slice(0, 17)
            }, () => {
              this.setState({
                p1draw: deal(this.state.cards, 16),
                // cards: this.state.cards.slice(0, 0)
              }, () => {
                $('.btn-deal').addClass('remove');
              });
            })
          })
        })
      })
    }) 
  }

  flip() {
    $('.card-back').toggleClass('card-front')
  }

  handleChange(e) {

  } 

  messageChange(e) {
    // handleTyping();
  }

  sendClick() {
    // handleSend();
  }

  onPilePickUp(e) {
    let hand = [];
    let pile = this.state.pile;
    console.log('pileeee', pile)
    for (let i = 0; i < this.state.p1hand.length; i++) {
      let current = this.state.p1hand[i];
      hand.push(current);
    }
    hand = hand.concat(pile);
    this.setState({
      p1hand: hand,
      pile: null
    });
  }

  onDraw(e) {
    var draw = []
    this.state.p1draw.map((card) => {
      draw.push(card)
      return card;
    })
    
    if (draw && this.state.p1hand.length) {
      let card = draw[draw.length - 1];
      let hand = []
      for (let i = 0; i < this.state.p1hand.length; i++) {
        let current = this.state.p1hand[i];
        hand.push(current);
        if (i === this.state.p1hand.length - 1) {
          hand.push(card);
        }
      }
      draw.pop()
      this.setState({
        p1hand: hand,
        p1draw: draw,
      });
    }

  }

  onselect(e) {
    //highlight what cards are selected
    //game is is initialized selected card ranks must ===
    let value = undefined;
    // let id = e.currentTarget;
    $('div.p1hand').on('click', (e) => {     
      value = JSON.parse(e.currentTarget.attributes.value.value);
      // var temp = [];
      // if (this.state.selected.length) {
      //   for (let i = 0; i < this.state.selected.length; i++) {
      //     let current = JSON.stringify(this.state.selected[i]); 
      //     temp.push(JSON.parse(current));
      //     if (i === this.state.selected.length - 1) {
      //       temp.push(value)
      //     }
      //   }
      // } else {
      //   temp.push(value);
      // }
      
      if (this.state.gameinit) {
        //if !selectedRank or rank === selectedRank
        // if (!this.state.selectedRank || value.rank === this.state.selectedRank) {
          this.setState({
            selectedRank: value.rank,
            selected: JSON.stringify(value)
          });
          $(e.currentTarget).toggleClass('highlight');
        // }
      } else {
        // if (temp.length <= 3) {
          this.setState({
            selected: JSON.stringify(value)
          });
          $(e.currentTarget).toggleClass('highlight');
        // }
      }
    })
  }

  playClick() {
    //save selected cards
    let remove = (this.state.selected);
    let card = [JSON.parse(remove)]
    let pile = [];
    if (this.state.pile) {
      this.state.pile.map((card) => {
        pile.push(card)
      })
    }
    
    let temp = [];
    let top = [];
    if (this.state.riverTop.length) {
      this.state.riverTop.map((card) => {
        top.push(card)
      })
    }
    top = top.concat(card)
    this.state.p1hand.map((card) => {
      let tC = JSON.stringify(card) 
      if (JSON.parse(remove).rank !== JSON.parse(tC).rank || JSON.parse(remove).suit !== JSON.parse(tC).suit) {
        temp.push(card);
      }
    })
    $('.highlight').toggleClass()
    if (this.state.gameinit) {
      pile = pile.concat(card);
      let currentPile = this.state.pile;
      let rank = 0;
      if (currentPile !== null) {
        rank = currentPile[currentPile.length -1].rank;
      }
      console.log(card.rank)
      // if (rank < card.rank) {
        this.setState({
          pile: pile,
          p1hand: temp,
          selected: null
        }, () => {
          console.log('pile is: ', pile)
        })
      // }
    } else if (this.state.riverTnum < 3) {
      this.setState({
        riverTop: top,
        p1hand: temp,
        selected: null,
        riverTnum: this.state.riverTnum + 1
      }, () => {
        if (this.state.riverTnum === 3) {
          this.setState({
            gameinit: true,
            selected: null
          })
        }
      })
    }
    //remove from p1hand
    //add to pile
  }

  render() {
    return (
      <div>
        <div className="player2">
          <div className="player2-river">
            {this.state.p2river.length > 0 ? 
              this.state.p2river.map((card) => (
                <div className="card" id="p2river" onClick={this.flip}>
                  
                  <div className="card-back">
                    <div className="rank hidden">
                      <span>{card.rank}</span>
                      <div className="suit" id={card.suit}>
                        <div className={card.suit}>

                        </div>
                      </div>
                      <span className="bottom-right">{card.rank}</span>
                    </div>
                  </div>
                </div>
              )) : <div></div>
            }
          </div>
          <div className="player2-draw">
            {this.state.p2draw.length > 0 ? 
              <div className="card cards-pile card-back" id="p2" >
                
              </div> : <div></div>
              }
          </div>
          <div className="player2-hand">
            {this.state.p2hand.length > 0 ? 
                this.state.p2hand.map((card) => (
                  <div className="card">
                  <div className="card-back">
                    <div className="rank hidden">
                      <span>{card.rank}</span>
                      <div className="suit" id={card.suit}>
                        <div className={card.suit}>

                        </div>
                      </div>
                      <span className="bottom-right">{card.rank}</span>
                    </div>
                  </div>  
                </div>
              )) : <div></div>
              }
          </div>
        </div>
        <div className="middle-board">
          <div className="pile">
            <div className="in-play" data={this.state.pile}>
              {this.state.pile ? 
                <div className="card cards-pile" onClick={this.onPilePickUp}>
                  <span>{this.state.pile[this.state.pile.length - 1].rank}</span>  
                  <div className="suit" id={this.state.pile[this.state.pile.length - 1].suit}>
                    <div className={this.state.pile[this.state.pile.length - 1].suit}>

                    </div>
                  </div>
                  <span className="bottom-right">{this.state.pile[this.state.pile.length - 1].rank}</span>
                </div> : <div></div>
              }
             </div>
          </div>
          <div className="stats"></div>
          <div className="buttons">
            <button className="btn-deal" onClick={this.dealClick}>Deal Cards</button>
          </div>
        </div>
        <div className="player1">
          <div className="player1-river">
          <div className="river-bottom">
            {this.state.p1river.length > 0 ? 
                this.state.p1river.map((card) => (
                  <div className="card">
                  <div className="card-back">
                    <div className="rank hidden">
                      <span>{card.rank}</span>
                      <div className="suit" id={card.suit}>
                        <div className={card.suit}>

                        </div>
                      </div>
                      <span className="bottom-right">{card.rank}</span>
                    </div>
                  </div>  
                </div>
              )) : <div></div>
              }
              </div> 
              <div className="river-top">
            {this.state.riverTop.length > 0 ? 
              this.state.riverTop.map((card) => (
                <div className="card card-front p1hand" id={`${card.rank}-${card.suit}`} value={JSON.stringify(card)} onClick={this.onselect}>
                  <div className="rank">
                    <span>{card.rank}</span>
                    <div className="suit" id={card.suit}>
                      <div className={card.suit}>

                      </div>
                    </div>
                    <span className="bottom-right">{card.rank}</span>
                  </div>
                </div>
              )) : <div></div>
            }
            </div>
          </div>
          <div className="player1-draw">
            {this.state.p1draw.length > 0 ? 
                <div className="card cards-pile card-back">
                  <button value={this.state.p1draw} onClick={this.onDraw}>DRAW</button>
                </div> : <div></div>
              }
          </div>
          <div className="player1-hand">
            {this.state.p1hand.length > 0 ? 
              this.state.p1hand.map((card) => (
                <div className="card card-front p1hand" id={`${card.rank}-${card.suit}`} value={JSON.stringify(card)} onClick={this.onselect}>
                  <div className="rank">
                    <span>{card.rank}</span>
                    <div className="suit" id={card.suit}>
                      <div className={card.suit}>

                      </div>
                    </div>
                    <span className="bottom-right">{card.rank}</span>
                  </div>
                </div>
              )) : <div></div>
            }
            {this.state.selected ? 
              <button onClick={this.playClick}>Play</button> : <div></div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Game;

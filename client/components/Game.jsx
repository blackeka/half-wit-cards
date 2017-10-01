import React from 'react';
import {makeDeck, shuffle, deal, drawCard, pickupPile} from '../helpers/deck.jsx';
import $ from "jquery";
import Nav from './Nav.jsx';
import Hand1 from './Hand1.jsx';
import Hand2 from './Hand2.jsx';
import RiverTop from './RiverTop.jsx';
import RiverBottom from './RiverBottom.jsx';
import Pile from './Pile.jsx';
import River2 from './River2.jsx';
// import {handleSend, handleTyping} from '../../public/socket.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      p2river: [],
      p2draw: [],
      p2hand: [],
      p1river: [],
      p1draw: [],
      p1hand: [], 
      p1turn: false,
      gameinit: false,
      selected: null,
      selectedRankSuit: '',
      riverTop: [],
      riverTnum: null,
      pile: null,
      win: false
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
    let draw = []
    this.state.p1draw.map((card) => {
      draw.push(card)
      return card;
    })
    
    if (draw && this.state.p1hand.length < 3) {
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

  onselect(e, show) {
    //highlight what cards are selected
    //game is is initialized selected card ranks must ===
    let value = undefined;
    // let id = e.currentTarget;
    // $('div.p1hand').on('click', (e) => {   
      show = show || true;  
      value = JSON.parse(e.currentTarget.attributes.value.value);
      // let temp = [];
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
      // let target = e.target;
      e.preventDefault();
      if (this.state.gameinit) {
        //if !selectedRank or rank === selectedRank
        // if (!this.state.selectedRank || value.rank === this.state.selectedRank) {   
          this.setState({    
            selected: JSON.stringify(value),
            selectedRankSuit: ''
          });
          if (show !== "hide") {
            this.setState({
              selectedRankSuit: ('  ---  ' + value.rank + ' of ' + value.suit),
            });
          }
        // }
      } else {
        // if (temp.length <= 3) {
          this.setState({
            selectedRankSuit: '',
            selected: JSON.stringify(value)
          });
          if (show !== "hide") {
            this.setState({
              selectedRankSuit: ('  ---  ' + value.rank + ' of ' + value.suit),
            });
          }
        // }
      }
    // })
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
    let top = [];
    if (this.state.riverTop.length) {
      this.state.riverTop.map((card) => {
        top.push(card)
      })
    }
    top = top.concat(card)
    let temp = [];
    this.state.p1hand.map((card) => {
      let tC = JSON.stringify(card) 
      if (JSON.parse(remove).rank !== JSON.parse(tC).rank || JSON.parse(remove).suit !== JSON.parse(tC).suit) {
        temp.push(card);
      }
    })
    let riverTop = [];
    this.state.riverTop.map((card) => {
      let tC = JSON.stringify(card) 
      if (JSON.parse(remove).rank !== JSON.parse(tC).rank || JSON.parse(remove).suit !== JSON.parse(tC).suit) {
        riverTop.push(card);
      }
    })
    let riverBottom = [];
    this.state.p1river.map((card) => {
      let tC = JSON.stringify(card) 
      if (JSON.parse(remove).rank !== JSON.parse(tC).rank || JSON.parse(remove).suit !== JSON.parse(tC).suit) {
        riverBottom.push(card);
      }
    })
    if (this.state.gameinit) {
      pile = pile.concat(card);
      let currentPile = this.state.pile;
      let topRank = 0;
      if (currentPile !== null) {
        topRank = currentPile[currentPile.length -1].rank;
      }
      let rank = card[0].rank;
      if (rank.length > 2) {
        rank === 'JACK' ? rank = 11 : 
          rank === 'QUEEN' ? rank = 12 :
            rank === 'KING' ? rank = 13 : rank = 14 
      } else {
        rank = Number(rank);
      }
      if (topRank.length > 2) {
        topRank === 'JACK' ? topRank = 11 : 
          topRank === 'QUEEN' ? topRank = 12 :
            topRank === 'KING' ? topRank = 13 : topRank = 14 
      } else {
        topRank = Number(topRank);
      }

      if (rank == 10) {
        this.setState({
          pile: null,
          p1hand: temp,
          selected: null,
          riverTop: riverTop,
          p1river: riverBottom
        });
      } else if (rank >= topRank || rank == 2) {
        this.setState({
          pile: pile,
          p1hand: temp,
          selected: null,
          riverTop: riverTop,
          p1river: riverBottom
        }, () => {
          this.state.p1draw.length === 0 && this.state.p1hand.length === 0 && this.state.p1river.length === 0 ? 
            this.setState({
              win: true
            }) : this.setState({
              win: false
            })
        })
      } else {
        this.setState({
          selected: null,
        });
      }
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
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="player2">
          <div className="player2-river">
            <River2 p2river={this.state.p2river} />
          </div>
          <div className="player2-draw">
            {this.state.p2draw.length > 0 ? 
              <div className="card cards-pile card-back" id="p2" >  
              </div> : <div></div>
            }
          </div>
          <div className="player2-hand">
            <Hand2 p2hand={this.state.p2hand} />
          </div>
        </div>
        <div className="middle-board">
          <div className="pile">
            <Pile pile={this.state.pile} pickUp={this.onPilePickUp} />
          </div>
          <div className="win">
            { this.state.win ? 
              <h1> CONGRATULATIONS! YOU WIN! </h1> : <div></div>
            }
          </div>
          <div className="stats"></div>
          <div className="buttons">
            <button className="btn-deal" onClick={this.dealClick}>Deal Cards</button>
          </div>
        </div>
        <div className="player1">
          <div className="player1-river">
            <div className="river-bottom">
              <RiverBottom p1river={this.state.p1river} select={this.onselect}/>
            </div> 
            <div className="river-top">
              <RiverTop riverTop={this.state.riverTop} select={this.onselect} />
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
            <Hand1 p1hand={this.state.p1hand} select={this.onselect} />
          </div>
          <div className="play-btn">
            {this.state.selected ? 
              <button  onClick={this.playClick}>Play{this.state.selectedRankSuit}</button> : <div></div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Game;

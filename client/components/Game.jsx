import React from 'react';
import {makeDeck, shuffle, deal, drawCard, pickupPile} from '../helpers/deck.jsx';

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
      p1hback: false
    };
    this.dealClick = this.dealClick.bind(this);
    this.onDraw = this.onDraw.bind(this);
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

  onDraw(e) {
    console.log(this.state.p1draw)
    //pop the last one off of Draw,
    var draw = []
    this.state.p1draw.map((card) => {
      draw.push(card)
      return card;
    })
    // console.log(draw, 'hand', hand, "omg it worked")
    
    // let pile = e.target.value;
    // // pile = pile.split(',')
    // let hand = e.target.id + "hand";
    // console.log('pile', pile.split(','))
    if (draw) {
      var card = draw[draw.length - 1];
      var hand = []
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
        p1draw: draw
      }, () => {
        console.log(this.state.p1hand, 'should have 7')
      });
    }

  }

  render() {
    return (
      <div>
        <div className="player2">
          <div className="player2-river">
            {this.state.p2river ? 
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
            {this.state.p2draw ? 
              <div className="card cards-pile" id="p2" >
                
              </div> : <div></div>
              }
          </div>
          <div className="player2-hand">
            {this.state.p2hand ? 
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
          <div className="pile"></div>
          <div className="stats"></div>
          <div className="buttons">
            <button className="btn-deal" onClick={this.dealClick}>Deal Cards</button>
          </div>
        </div>
        <div className="player1">
          <div className="player1-river">
            {this.state.p1river ? 
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
          <div className="player1-draw">
            {this.state.p1draw ? 
                <div className="card cards-pile">
                <button value={this.state.p1draw} onClick={this.onDraw}>DRAW</button>
                </div> : <div></div>
              }
          </div>
          <div className="player1-hand">
            {this.state.p1hand ? 
                this.state.p1hand.map((card) => (
                  <div className="card card-front ">
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
      </div>
    );
  }
}

export default Game;

{/* 
this.state.p1draw.map((card) => (
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
              )) : <div></div> */}
import React from 'react';
import {makeDeck, shuffle, deal} from '../helpers/deck.jsx';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      p2river: [],
      p2draw: null,
      p2hand: null,
      p1river: null,
      p1draw: null,
      p1hand: null
    };
    this.dealClick = this.dealClick.bind(this);
  }
  
  
  componentWillMount() {
    let cards = makeDeck();
    this.setState({
      cards: shuffle(cards),
    });
  }
  
  dealClick() {
    console.log('in click handler')
    console.log(this.state.cards, "begin")
    // console.log(deal(this.state.cards, 3))
    this.setState({
      p2river: deal(this.state.cards, 3),
      // cards: this.state.cards.slice(0, 49)
    }, () => {
      console.log(this.state.cards, "-3")
      this.setState({
        p1river: deal(this.state.cards, 3),
        // cards: this.state.cards.slice(0, 46)
      }, () => {
        console.log(this.state.cards, "-6")
        this.setState({
          p2hand: deal(this.state.cards, 6),
          // cards: this.state.cards.slice(0, 40)
        }, () => {
          console.log(this.state.cards, "-12")
          this.setState({
            p1hand: deal(this.state.cards, 6),
            // cards: this.state.cards.slice(0, 34)
          }, () => {
            console.log(this.state.cards, "-18")
            this.setState({
              p2draw: deal(this.state.cards, 17),
              // cards: this.state.cards.slice(0, 17)
            }, () => {
              console.log(this.state.cards, "17-left")
              this.setState({
                p2draw: deal(this.state.cards, 17),
                // cards: this.state.cards.slice(0, 0)
              });
            })
          })
        })
      })
    }) 
  }

  render() {
    return (
      <div>
        <div className="player2">
          <div className="player2-river">
            {this.state.p2river ? 
              this.state.p2river.map((card) => (
                <div className="card card-back">
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
          <div className="player2-draw">
            {this.state.p2draw ? 
                this.state.p2draw.map((card) => (
                  <div className="card" id="card-back">
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
          <div className="player2-hand">
            {this.state.p2hand ? 
                this.state.p2hand.map((card) => (
                  <div className="card" id="card-back">
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
                  <div className="card" id="card-back">
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
          <div className="player1-draw">
            {this.state.p1draw ? 
                this.state.p1draw.map((card) => (
                  <div className="card" id="card-back">
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
          <div className="player1-hand">
            {this.state.p1hand ? 
                this.state.p1hand.map((card) => (
                  <div className="card">
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

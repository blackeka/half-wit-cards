import React from 'react';
import {makeDeck, shuffle} from '../helpers/deck.jsx';
import Nav from './Nav.jsx';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    }
    this.handleClick = this.handleClick.bind(this)
  }
  
  handleClick () {
    let cards = makeDeck();
    this.setState({
      cards: shuffle(cards),
    }) 
  }

  render() {
    return (
      <div>
        <Nav />
        <button onClick={this.handleClick}>Shuffle</button>
        {
          this.state.cards ? 
          this.state.cards.map((card) => 
            (
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
    )
  }
}

export default Card;

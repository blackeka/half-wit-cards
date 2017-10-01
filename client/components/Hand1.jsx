import React from 'react';
import $ from "jquery";

class Hand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVal: ''
    }
    this.selects = this.selects.bind(this);
  }

  selects(e, card) {
    this.props.select(e)
  }

  render() {
    return (
      <div>
      {
        this.props.p1hand.length > 0 ? 
          this.props.p1hand.map((card) => (
            <div  className="card p1hand"  key={card.rank + card.suit + ((Math.random() * 50) + 1)} value={JSON.stringify(card)} onClick={(e) => this.selects(e)} >
              <div className="rank" key={card.rank + card.suit + ((Math.random() * 100) + 51)}>
                <span>{card.rank}</span>
                <div className="suit" key={card.rank + card.suit + ((Math.random() * 150) + 101)}>
                  <div className={card.suit} key={card.rank + card.suit + ((Math.random() * 200) + 151)}>
                    <div></div>
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

export default Hand;
import React from 'react';

function RiverTop(props) {
  return (
    <div>
      {props.riverTop.length > 0 ? 
        props.riverTop.map((card) => (
          <div  key={card.rank + card.suit + ((Math.random() * 50) + 1)} className="card p1hand" value={JSON.stringify(card)} onClick={(e) => props.select(e)}>
            <div className="rank">
              <span>{card.rank}</span>
              <div className="suit" >
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
};

export default RiverTop;
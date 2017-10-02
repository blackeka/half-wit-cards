import React from 'react';

function River2Top(props) {
  return (
    <div>
      {props.river2Top.length > 0 ? 
        props.river2Top.map((card) => (
          <div  key={card.rank + card.suit + ((Math.random() * 50) + 1)} className="card p2hand" value={JSON.stringify(card)} onClick={(e) => props.select(e)}>
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

export default River2Top;

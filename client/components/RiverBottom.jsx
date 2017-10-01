import React from 'react';

function RiverBottom(props) {
  return (
    <div>
      {props.p1river.length > 0 ? 
          props.p1river.map((card) => (
            <div  key={card.rank + card.suit + ((Math.random() * 50) + 1)} className="card" value={JSON.stringify(card)} onClick={(e) => props.select(e, "hide")}>
            <div className="card-back">
              <div className="rank hidden">
                <span>{card.rank}</span>
                <div className="suit" >
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
  ) 
}

export default RiverBottom;

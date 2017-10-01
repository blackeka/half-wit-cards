import React from 'react';

function RiverBottom(props) {
  return (
    <div>
      {props.p1river.length > 0 ? 
          props.p1river.map((card) => (
            <div className="card" onClick={props.select}>
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

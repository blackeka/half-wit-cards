import React from 'react';

function River2(props) {
  return (
    <div>
      {props.p2river.length > 0 ? 
        props.p2river.map((card) => (
          <div  key={card.rank + card.suit + ((Math.random() * 50) + 1)} className="card">          
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

export default River2;

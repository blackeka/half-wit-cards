import React from 'react';

function RiverTop(props) {
  return (
    <div>
      {props.riverTop.length > 0 ? 
        props.riverTop.map((card) => (
          <div className="card p1hand" value={JSON.stringify(card)} onClick={() => props.select(e)}>
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
import React from 'react';

function Pile(props) {
  return (
    <div className="in-play" data={props.pile}>
      {props.pile ? 
        <div className="card cards-pile" onClick={props.pickUp}>
          <span>{props.pile[props.pile.length - 1].rank}</span>  
          <div className="suit">
            <div className={props.pile[props.pile.length - 1].suit}>

            </div>
          </div>
          <span className="bottom-right">{props.pile[props.pile.length - 1].rank}</span>
        </div> : <div></div>
      }
    </div>
  )
}

export default Pile;

import React from 'react';

function Deal(props) {
  return (
    <button className="btn-deal" onClick={ () => props.dealClick() }>Deal Cards</button>
  )
}

export default Deal;

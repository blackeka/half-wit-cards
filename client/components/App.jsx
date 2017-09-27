import React from 'react';
import Card from './Card.jsx';
import Game from './Game.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
     
    };
  }
 
  render() {
    return (
      <div className="heart">
        <h1 >Half-Wit Cards</h1>
        <Game />
      </div>
    );
  }
}

{/* <Card /> */}
export default App;

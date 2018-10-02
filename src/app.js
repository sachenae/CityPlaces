import React, { Component } from 'react';
import Main from './components/Main'

class App extends Component {
  render() {
    return (
      <div className="App" style={{textAlign: `center`}}>
        <header className="App-header" style={{backgroundColor: `#222`, height:`80px`, padding:`20px`, color:`white`}}>
          <h1 className="App-title"><em>TourFlow</em></h1>
        </header>
        <div>
        <Main />
        </div>
      </div>
    );
  }
}

export default App;

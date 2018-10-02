import React, { Component } from 'react';
import Main from './components/Main';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
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


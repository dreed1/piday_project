import React, { Component } from 'react';
import './App.css';
import NameRegistrar from './NameRegistrar';
import Quiz from './Quiz';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NameRegistrar />
        <Quiz />
      </div>
    );
  }
}

export default App;

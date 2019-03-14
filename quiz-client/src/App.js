import React, { Component } from 'react';
import './App.css';

import NameRegistrar from './NameRegistrar';
import Quiz from './Quiz';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false
    };
  }

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

import React, { Component } from 'react';
import './App.css';

import NameRegistrar from './NameRegistrar';

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
        <div>I will be the quiz soon!</div>
      </div>
    );
  }
}

export default App;

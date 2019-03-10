import React, { Component } from 'react';
import './App.css';

import QuizState from './enums';

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
        Hello world!
      </div>
    );
  }
}

export default App;

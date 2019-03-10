import React, { Component } from 'react';
import './App.css';

import QuizState from './enums';
import NameRegistrar from './NameRegistrar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      quizCompletionState: QuizState.NotStarted
    };
    this.quizBeganCallback = this.quizBeganCallback.bind(this);
    this.quizCompletedCallback = this.quizCompletedCallback.bind(this);
  }

  quizBeganCallback() {
    this.setState({quizCompletionState: QuizState.Ongoing})
  }

  quizCompletedCallback() {
    this.setState({quizCompletionState: QuizState.Completed})
  }

  render() {
    return (
      <div className="App">
        <NameRegistrar quizCompletionState={this.state.quizCompletionState} />
        <div>Hello, I'll eventually be a quiz (though I'm not yet)</div>
      </div>
    );
  }
}

export default App;

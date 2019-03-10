import React, { Component } from 'react';
import './App.css';

import QuizState from './enums';

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
    if (this.state.quizCompletionState == QuizState.NotStarted) {
      return (
        <div className="App">
          <button onClick={this.quizBeganCallback}>Start the quiz</button>
        </div>
      );
    } else if (this.state.quizCompletionState == QuizState.Ongoing) {
      return (
        <div className="App">
          You began the quiz.
          <button onClick={this.quizCompletedCallback}>Finish the quiz</button>
        </div>
      );
    } else {
      return (
        <div className="App">
          You finished!
        </div>
      );
    }
  }
}

export default App;

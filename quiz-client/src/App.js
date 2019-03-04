import React, { Component } from 'react';
import './App.css';
import NameRegistrar from './NameRegistrar';
import Quiz from './Quiz';
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
    console.log("hi i began quiz")
    this.setState({quizCompletionState: QuizState.Ongoing})
  }

  quizCompletedCallback() {
    console.log("hi i finished quiz")
    this.setState({quizCompletionState: QuizState.Completed})
  }

  render() {
    return (
      <div className="App">
        <NameRegistrar quizCompletionState={this.state.quizCompletionState} />
        <Quiz quizBeganCallback={this.quizBeganCallback} quizCompletedCallback={this.quizCompletedCallback}/>
      </div>
    );
  }
}

export default App;

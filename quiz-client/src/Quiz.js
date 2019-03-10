import React, { Component } from 'react';
import Confetti from 'react-confetti';

import APILocation from './Constants';

class Quiz extends Component {
	constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      quizComplete: false,
      questions: [],
      currentQuestion: -1,
      quizBeganCallback: this.props.quizBeganCallback,
      quizCompletedCallback: this.props.quizCompletedCallback
    };
  }

  getNextQuestion() {
    const fetchURL = APILocation + "next_question";
    this.setState({
      isLoaded: false
    })
    fetch(fetchURL)
      .then(res => res.json())
      .then(
        (result) => {
          if (result.question.length > 0) {
            this.setState({
              isLoaded: true,
              questions: this.state.questions.concat([result]),
              currentQuestion: this.state.currentQuestion + 1
            });
          } else {
            this.quizFinished();
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  quizFinished() {
  	this.state.quizCompletedCallback();
    this.setState({quizComplete:true});
  }

	render() {
    //if we didn't complete the quiz, and our current question index is >=0 we must be taking it currently.
    if (!this.state.quizComplete && this.state.currentQuestion >= 0) {
      return (
      	<div>You are taking the quiz, and you'd see a question here normally but we didnt finish that yet.</div>
      );
    // if we don't have a good current question index, we must not have started it yet
    } else if (!this.state.quizComplete) {
      return (
        <div>You havent yet begun to take the quiz.</div>
      )
    //and if we have set the quiz complete flag, we must be done -- let's celebrate.
    } else {
      return (
        <div>
          <Confetti />
          <div className="QuizCompleteTitle">You finished the whole quiz! Congratulations!</div>
        </div>
      );
    }
  }
}

export default Quiz;
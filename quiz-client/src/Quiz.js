import React, { Component } from 'react';
import Confetti from 'react-confetti';

import APILocation from './Constants';
import Question from './Question';
import QuizEmptyState from './QuizEmptyState';

class Quiz extends Component {
	constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      quizComplete: false,
      questions: [],
      currentQuestion: -1
    };
    this.questionAnswered = this.questionAnswered.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
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

  startQuiz() {
    this.getNextQuestion()
  }

  questionAnswered() {
    this.getNextQuestion();
  }

  quizFinished() {
    this.setState({quizComplete:true});
  }

	render() {
    //if we didn't complete the quiz, and our current question index is >=0 we must be taking it currently.
    if (!this.state.quizComplete && this.state.currentQuestion >= 0) {
      const thisQuestion = this.state.questions[this.state.currentQuestion];
      if (thisQuestion) {
        return (
          <Question question={thisQuestion.question}
                    key={thisQuestion.id}
                    id={thisQuestion.id}
                    answers={thisQuestion.answers}
                    questionAnswered={this.questionAnswered} />
        );
      }
    // if we don't have a good current question index, we must not have started it yet
    } else if (!this.state.quizComplete) {
      return (
        <QuizEmptyState clickHandler={this.startQuiz}/>
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
import React, { Component } from 'react';
import QuestionGraph from './QuestionGraph';

import {AnswerCountStateContext} from './ComponentContexts';

class QuizQuestion extends Component {
	constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      questionText: this.props.questionText,
      questionId: this.props.questionId,
      answers: this.props.answers,
      userCount: this.props.userCount
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("telling quiz question to update")
    return true
  }

	render() {
    const _this = this;
		return (
      <div className="QuizQuestion">
        <div className="QuestionText">{this.state.questionText}</div>
          <AnswerCountStateContext.Consumer>
          { answerCounts => (
            <div className="QuestionGraph">
              { 
                <QuestionGraph key={_this.state.questionId} questionId={_this.state.questionId} answers={_this.state.answers} answerCounts={answerCounts} userCount={_this.state.userCount} />
              }
            </div>
          )}
        </AnswerCountStateContext.Consumer>
      </div>
    );
	}
}

export default QuizQuestion;
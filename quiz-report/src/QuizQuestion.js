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

	render() {
    const _this = this;
		return (
      <div className="QuizQuestion">
        <div className="QuestionText">{this.props.questionText}</div>
          <AnswerCountStateContext.Consumer>
          { answerCounts => (
            <div className="QuestionGraph">
              { 
                <QuestionGraph key={_this.props.questionId} questionId={_this.props.questionId} answers={_this.props.answers} answerCounts={answerCounts} userCount={_this.props.userCount} />
              }
            </div>
          )}
        </AnswerCountStateContext.Consumer>
      </div>
    );
	}
}

export default QuizQuestion;
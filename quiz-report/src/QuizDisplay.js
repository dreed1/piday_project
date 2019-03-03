import React, { Component } from 'react';
import { QuizStateContext } from './ComponentContexts';
import QuizQuestion from './QuizQuestion';

class QuizDisplay extends Component {
	constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      questions: []
    };
  }

	render() {
		// const questions = this.state.questions.map((question) => <QuizQuestion key={question.id} questionText={question.question} answers={question.answers}/>);
		return (
			<div className="QuizContainer">
				<QuizStateContext.Consumer>
          {quizState => (
            <div className="QuizDisplay">
              { quizState.map((question) => { return <QuizQuestion key={question.id} questionText={question.question} answers={question.answers}/>})}
            </div>
          )}
        </QuizStateContext.Consumer>
       </div>
    );
	}
}

export default QuizDisplay;
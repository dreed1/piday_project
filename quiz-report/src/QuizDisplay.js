import React, { Component } from 'react';
import { QuizStateContext } from './ComponentContexts';
import QuizQuestion from './QuizQuestion';

class QuizDisplay extends Component {
	constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      userCount: this.props.userCount
    };
    // console.log("quiz display:")
    // console.log(this.state)
  }

	render() {
    const userCount = this.props.userCount;
		return (
			<div className="QuizContainer">
        <div className="QuizDisplay">
				  <QuizStateContext.Consumer>
            {quizState => ( 
              quizState.map((question) => { 
                return <QuizQuestion key={question.id} 
                                     questionId={question.id} 
                                     questionText={question.question} 
                                     answers={question.answers} 
                                     userCount={userCount}/>})
            )}
          </QuizStateContext.Consumer>
        </div>
       </div>
    );
	}
}

export default QuizDisplay;
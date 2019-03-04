import React, { Component } from 'react';
import { QuizStateContext, UserRegistryCountContext } from './ComponentContexts';
import QuizQuestion from './QuizQuestion';

class QuizDisplay extends Component {
	constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false
    };
    // console.log("quiz display:")
    // console.log(this.state)
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("telling quiz display to update")
    return true
  }

	render() {
		return (
			<div className="QuizContainer">
				<QuizStateContext.Consumer>
          {quizState => (
            <UserRegistryCountContext.Consumer>
              { userCount => (              
                <div className="QuizDisplay">
                  { quizState.map((question) => { 
                    return <QuizQuestion key={question.id} questionId={question.id} questionText={question.question} answers={question.answers} userCount={userCount}/>}
                  )}
                </div>
              )}
            </ UserRegistryCountContext.Consumer>
          )}
        </QuizStateContext.Consumer>
       </div>
    );
	}
}

export default QuizDisplay;
import React, { Component } from 'react';
import QuestionGraph from './QuestionGraph';

class QuizQuestion extends Component {
	constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      questionText: this.props.questionText,
      questionId: this.props.id,
      answers: this.props.answers,
      userCount: this.props.userCount
    };
  }

  graphData() {
  	var answersReceived = 0
  	var userAnswers = this.state.answers.map((a) => {
  		var userCountForThisAnswer = a.answers_count
  		answersReceived += userCountForThisAnswer
  		// console.log("I now have more answers:" + answersReceived)
  		// console.log("And I expect: " + this.props.userCount)
  		return ({
  			"id": a.text,
  			"label": a.text,
  			"value": userCountForThisAnswer
  		});
  	});
  	if (answersReceived < this.state.userCount) {
  		// console.log("I didnt get enough answers")
  		userAnswers.push({
  			"id": "Unanswered",
  			"label": "Users without answers",
  			"value": this.state.userCount - answersReceived,
  			"color": "hsl(0, 84%, 58%)"
  		})
  	}
  	return userAnswers;
  }

	render() {
		const graphData = this.graphData();
		return (
      <div className="QuizQuestion">
        <div className="QuestionText">{this.state.questionText}</div>
        <div className="QuestionGraph">
        	<QuestionGraph key={this.state.id} graphData={graphData} />
        </div>
      </div>
    );
	}
}

export default QuizQuestion;
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
  		var userCountForThisAnswer = a.user_ips_with_answer.length
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
		const answersList = this.state.answers.map((a) => <div key={a.id}>{a.text} has {a.user_ips_with_answer.length} answers</div>);
		return (
      <div className="QuestionGraph">
        <div>Im a question in this quiz.</div>
        <div>My question: '{this.state.questionText}'</div>
        <div> Possible Answers:</div>
        <div>{answersList}</div>
        <QuestionGraph key={this.state.id} graphData={graphData} />
      </div>
    );
	}
}

export default QuizQuestion;
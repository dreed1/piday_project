import React, { Component } from 'react';
// import io from 'socket.io-client';
import QuizQuestion from './QuizQuestion';

class QuizDisplay extends Component {
	constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      questions: [],
      userCount: 0
    };
  }

	// componentDidMount() {
	// 	this.socketStuff();
	// }

	// socketStuff() {
	// 	var _this = this;
	// 	const socket = io('http://localhost');
	// 	socket.on('connect', function(){
	// 		console.log("Quiz display is connected to the socket");
	// 	});
 //  	socket.on('quiz state', function(msg){
 //  		const quizResults = msg["quiz_results"]
 //  		if (quizResults) {
 //  			_this.setState({questions: quizResults});
 //  			console.log("Got new quiz state");
 //  			console.log(quizResults);
 //  		}
 //  	});
 //  	socket.on('user registry change', function(msg){
 //  		console.log("quiz display got a user reg change")
 //  		const userCount = msg["user_count"]
 //  		if (userCount) {
 //  			console.log("Quiz display updated use count to " + userCount);
 //  			_this.setState({userCount: userCount});
 //  		}
 //  	});
 //  	// socket.on('disconnect', function(){});
	// }

	render() {
		const userCount = this.state.userCount;
		const questions = this.state.questions.map((question) => <QuizQuestion key={question.id} questionText={question.question} answers={question.answers} userCount={userCount} />);
		return (
      <div className="QuizContainer">
        <div className="QuizDisplay">{questions}</div>
      </div>
    );
	}
}

export default QuizDisplay;
import React, { Component } from 'react';

class QuizEmptyState extends Component {
	constructor(props) {
		super(props)
		this.state = {
			clickHandler: this.props.clickHandler
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.state.clickHandler();
	}

	render() {
		return (
			<div className="StartQuiz">
				<div className="StartQuizDescription">Heloo New friend! This is a quiz. Hit the button!</div>
				<button className="StartQuizButton" onClick={this.handleClick}>Start or resume the quiz!</button>
			</div>
		)
	}
}

export default QuizEmptyState;

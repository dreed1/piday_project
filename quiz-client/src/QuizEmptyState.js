import React, { Component } from 'react';

class QuizEmptyState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      clickHandler: this.props.clickHandler
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.state.clickHandler();
  }

  render() {
    return (
      <div className="StartQuiz">
        <div className="StartQuizDescription">Hello new friend!. This is a short quiz that I will eventually finish describing. Just like, hit the button I guess..</div>
        <button className="StartQuizButton" onClick={this.handleClick}>Start or resume the quiz.</button>
      </div>
    );
  }
}

export default QuizEmptyState;

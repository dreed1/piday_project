import React, { Component } from 'react';

class QuizEmptyState extends Component {
  constructor(props) {
    super(props);
    console.log("Creating a new answer")
    this.state = {
      error: null,
      isLoaded: false,
      clickHandler: this.props.clickHandler
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("You should start/ resume the quiz for this person");
    this.state.clickHandler();
  }

  render() {
    return (
      <div>
        <div className="StartQuizDescription">This short quiz is cool, fun, and will make you a friend. This is the descriptions, blah blah blah.</div>
        <button className="StartQuizButton" onClick={this.handleClick}>Start or resume the quiz.</button>
      </div>
    );
  }
}

export default QuizEmptyState;

import React, { Component } from 'react';

class Answer extends Component {
	constructor(props) {
    super(props);
    console.log("Creating a new answer")
    this.state = {
      error: null,
      isLoaded: false,
      id: props.id,
      question_id: props.question_id,
      text: props.text,
      value: props.value,
      image_url: props.image_url
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("I HAVE BEEN CLICKED, WOO!!!!")
  }

	render() {
    var textContent = <div className="AnswerText">{this.state.text}</div>;
    var imageContent = null;
    if (this.state.image_url) {
      console.log(this.state.image_url)
      imageContent = <img className="AnswerImage" alt={this.state.text} src={this.state.image_url}></img>
    }
    return (
      <div className="QuizAnswer" onClick={this.handleClick}>
        {textContent}
        {imageContent}
      </div>
    );
  }
}

export default Answer;
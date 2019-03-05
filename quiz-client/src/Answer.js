import React, { Component } from 'react';
import APILocation from './constants';

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
      answer_type: props.answer_type,
      image_url: props.image_url
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.answerQuestion();
  }

  answerQuestion() {
    const fetchURL = APILocation + "answer_question";
    fetch(fetchURL,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: this.state.value,
          answer_id: this.state.id,
          question_id: this.state.question_id,
        })
      })
      .then(
        (result) => {
          this.props.questionAnswered();
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
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
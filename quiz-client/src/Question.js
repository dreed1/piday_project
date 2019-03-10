import React, { Component } from 'react';
import Answer from './Answer';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      id: props.id,
      question: props.question,
      answers: props.answers
    };
  }

  render() {
    const question_id = this.props.id;
    const answersUI = this.state.answers.map((a) =>
      <Answer key={a.id}
              id={a.id}
              question_id={question_id}
              text={a.text}
              value={a.value}
              image_url={a.image_url}
              questionAnswered={this.props.questionAnswered} />
    );
    return (
      <div>
        <div className="QuestionText">{this.state.question}</div>
        <div className="QuestionContainer">
          {answersUI}
        </div>
      </div>
    );
  }
}

export default Question;
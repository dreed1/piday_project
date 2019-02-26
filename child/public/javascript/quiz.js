class Answer extends React.Component {
  // {
  //   "text": self.answer_text,
  //   "value": self.answer_value,
  //   "answer_type": self.answer_type.value,
  //   "image_url": self.image_url
  // }
  constructor(props) {
    super(props);
    console.log("Creating a new answer")
    this.state = {
      error: null,
      isLoaded: false,
      id: props.id,
      text: props.text,
      value: props.value,
      answer_type: props.answer_type,
      image_url: props.image_url
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("ding")
    this.answerQuestion();
  }

  answerQuestion() {
    console.log("trying to answer the question");
    fetch("http://0.0.0.0/answer_question", 
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: this.state.value,
        })
      })
      .then(
        (result) => {
          console.log("I answered the question");
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
    return (
      <div className="answer" onClick={this.handleClick}>{this.state.text}</div>
    );
  }
}

class Question extends React.Component {
  constructor(props) {
    super(props);
    var myAnswers = [];
    console.log("Creating a new question")
    console.log(props);
    this.state = {
      error: null,
      isLoaded: false,
      id: props.id,
      question: props.question,
      answers: props.answers
    };
  }

  render() {
    const answersUI = this.state.answers.map((a) => <Answer key={a.id} text={a.text} value={a.value} answer_type={a.answer_type} image_url={a.image_url} questionAnswered={this.props.questionAnswered} />);
    return (
      <div>
        <div className="question">Q: {this.state.question}</div>
        <ul>{answersUI }</ul>
      </div>
    );
  }
}

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      quizComplete: false,
      questions: [],
      currentQuestion: -1
    };
    this.questionAnswered = this.questionAnswered.bind(this);
  }

  componentDidMount() {
    console.log("component mounted")
    this.getNextQuestion()
  }

  getNextQuestion() {
    console.log("asking for next question")
    this.setState({
      isLoaded: false
    }) 
    fetch("http://0.0.0.0/next_question")
      .then(res => res.json())
      .then(
        (result) => {
          if (result.question.length > 0) {
            console.log("got a new question or something")
            this.setState({
              isLoaded: true, 
              questions: this.state.questions.concat([result]),
              currentQuestion: this.state.currentQuestion + 1
            });

          } else {
            console.log("I think the quiz is done")
            this.setState({quizComplete:true});
          }
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

  questionAnswered() {
    this.getNextQuestion();
  }

  quizFinished() {
    console.log("The quiz is done!")
  }

  render() {
    if (!this.state.quizComplete && this.state.currentQuestion >= 0) {
      const thisQuestion = this.state.questions[this.state.currentQuestion];
      console.log("my current question idx: " + this.state.currentQuestion)
      console.log(thisQuestion)
      if (thisQuestion) {
        console.log("rendering the new one")
        return (
          <Question question={thisQuestion.question} key={thisQuestion.id} answers={thisQuestion.answers} questionAnswered={this.questionAnswered} />
        );  
      } 
    }
    return (
      <div key="quizDone">I'm guessing you finished the quiz, or you broke the API.... not exactly sure which.</div>
    );
  }
}

ReactDOM.render(
  <Quiz />,
  document.getElementById('quiz')
);

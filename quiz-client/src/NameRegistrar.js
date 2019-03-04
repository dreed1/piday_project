import React, { Component } from 'react';
import QuizState from './enums';

class NameRegistrar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      myName: "I dont have a name",
      quizCompletionState: this.props.quizCompletionState
    };
  }

  componentDidMount() {
    var _this = this;
    fetch("http://0.0.0.0/whoami")
      .then(res => res.json())
      .then(
        (result) => {
          _this.setState({
            isLoaded: true,
            myName: result.your_name
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          _this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    if (this.props.quizCompletionState === QuizState.NotStarted) {
      return (
        <div class="NameRegistrarContainer">
          <div>Hi New friend! Let me give you a name. I think I'll call you....</div>
          <div className="NameEntry">
            {this.state.myName}
          </div>
          <div>...I bet all your friends call you {this.state.myName}. No, Just me?</div>
          <div>Anyway, this is an app that runs a quiz. At the end there's a small party.</div>
          <div>Click the red button to begin!</div>
        </div>
      );
    } else if (this.props.quizCompletionState === QuizState.Ongoing) {
      return (
        <div class="NameRegistrarContainer">
          <div className="NameEntry">
            How's it going {this.state.myName}? Choose one of the images and click it to vote.
          </div>
        </div>
      );
    } else {
      return (
        <div class="NameRegistrarContainer">
          <div className="NameEntry">
            My new friend {this.state.myName} is absolutely incredible! They finished the whole project AND took the quiz! WOW.
          </div>
        </div>
      );
    }
  }
}

export default NameRegistrar;
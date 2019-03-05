import React, { Component } from 'react';
// import logo from './logo.svg';
import {QuizStateContext, AnswerCountStateContext, UserRegistryNamesContext} from './ComponentContexts';
import RegistryDisplay from './RegistryDisplay';
import QuizDisplay from './QuizDisplay';
import io from 'socket.io-client';
import './App.css';

const socketHost = 'http://localhost';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizState: [],
      allUsernames: [],
      userCount: this.props.userCount,
      allUsers: {},
      answerCounts: {}
    }
    this.socket = io(socketHost);
    this.socketStuff();
  }

  socketStuff() {
    var _this = this;
    // this.socket.on('connect', function(){
    //   console.log("App is connected to the socket");
    // });
    this.socket.on('state_update', function(msg){
      // console.log("App got a state update:")
      // console.log(msg)

      //user state updates
      var stateUpdates = {};
      const allUsernames = msg["user_names"]
      if (allUsernames) {
        stateUpdates.allUsernames = allUsernames;
      }
      const allUsers = msg["all_users"]
      if (allUsers) {
        stateUpdates.allUsers = allUsers;
      }
      const userCount = msg["user_count"]
      if (userCount) {
        stateUpdates.userCount = userCount;
      }
      //quiz state updates
      const quizState = msg["quiz_state"]
      if (quizState) {
        // console.log("App got new quiz state");
        var answerCounts = {}
        for (var questionIndex in quizState) {
          var question = quizState[questionIndex]
          var answers = question["answers"]
          for (var answerIndex in answers) {
            var answer = answers[answerIndex]
            answerCounts[answer["id"]] = answer["answers_count"]
          }
        }
        stateUpdates.answerCounts = answerCounts;
        stateUpdates.quizState = quizState;
      }
      _this.setState(stateUpdates);
    });
    // this.socket.on('disconnect', function(){
    //   console.log("App is disconnected");
    // });
  }

  render() {
    return (
      <div className="App">
        <div className="DisplayContainer">
          <UserRegistryNamesContext.Provider value={this.state.allUsernames}>
            <RegistryDisplay userCount={this.state.userCount}/>
          </UserRegistryNamesContext.Provider>
          <QuizStateContext.Provider value={this.state.quizState}>
            <AnswerCountStateContext.Provider value={this.state.answerCounts}>
              <QuizDisplay userCount={this.state.userCount} />
            </AnswerCountStateContext.Provider>
          </QuizStateContext.Provider>
        </div>
      </div>
    );
  }
}

export default App;

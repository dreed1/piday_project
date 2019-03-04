import React, { Component } from 'react';
// import logo from './logo.svg';
import {QuizStateContext, AnswerCountStateContext, UserRegistryNamesContext, UserRegistryCountContext} from './ComponentContexts';
import RegistryDisplay from './RegistryDisplay';
import QuizDisplay from './QuizDisplay';
import io from 'socket.io-client';
import './App.css';

//https://socket.io/get-started/chat/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizState: [],
      allUsernames: [],
      userCount: 0,
      allUsers: {},
      quizQuestions: [],
      answerCounts: {}
    }
    this.socket = io('http://localhost');
    this.socketStuff();
  }

  socketStuff() {
    var _this = this;
    // this.socket.on('connect', function(){
    //   console.log("App is connected to the socket");
    // });
    this.socket.on('quiz state', function(msg){
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
        _this.answerCountStateUpdated(answerCounts)
        _this.quizStateUpdated(quizState);
      }
    });
    this.socket.on('user registry state', function(msg){
      // console.log("App got a user registry update")
      var userState = {}
      const allUsernames = msg["user_names"]
      if (allUsernames) {
        userState.allUsernames = allUsernames;
        _this.setState({allUsernames: allUsernames});
      }
      const allUsers = msg["all_users"]
      if (allUsers) {
        userState.allUsers = allUsers;
        _this.setState({allUsers: allUsers});
      }
      const userCount = msg["user_count"]
      if (userCount) {
        userState.userCount = userCount;
        _this.userCountUpdated(userCount)
      }
    });
    // this.socket.on('disconnect', function(){
    //   console.log("App is disconnected");
    // });
  }

  userStateUpdated(userState) {
    console.log("App has a new user registry state.")
    console.log(userState)
    this.setState({userState: userState});
  }

  userCountUpdated(userCount) {
    console.log("App has a new user count.")
    console.log(userCount)
    this.setState({userCount: userCount});
  }

  quizStateUpdated(quizState) {
    console.log("App has a new quiz state.")
    console.log(quizState)
    this.setState({quizState: quizState});
  }

  answerCountStateUpdated(answerCounts) {
    console.log("App has a new anser count state.")
    console.log(answerCounts)
    this.setState({answerCounts: answerCounts});
  }

  render() {
    return (
      <div className="App">
        <div className="DisplayContainer">
          <UserRegistryCountContext.Provider value={this.state.userCount}>
            <UserRegistryNamesContext.Provider value={this.state.allUsernames}>
              <RegistryDisplay />
            </UserRegistryNamesContext.Provider>
            <QuizStateContext.Provider value={this.state.quizState}>
              <AnswerCountStateContext.Provider value={this.state.answerCounts}>
                <QuizDisplay />
              </AnswerCountStateContext.Provider>
            </QuizStateContext.Provider>
          </UserRegistryCountContext.Provider>
        </div>
      </div>
    );
  }
}

export default App;

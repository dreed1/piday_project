import React, { Component } from 'react';
// import logo from './logo.svg';
import {QuizStateContext, UserRegistryNamesContext, UserRegistryCountContext} from './ComponentContexts';
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
      quizQuestions: []
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
        _this.setState({userCount: userCount});
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

  quizStateUpdated(quizState) {
    console.log("App has a new quiz state.")
    console.log(quizState)
    this.setState({quizState: quizState});
  }

  render() {
    return (
      <div className="App">
        <div className="DisplayContainer">
          <UserRegistryNamesContext.Provider value={this.state.allUsernames}>
            <UserRegistryCountContext.Provider value={this.state.userCount}>
              <RegistryDisplay />
            </UserRegistryCountContext.Provider>
          </UserRegistryNamesContext.Provider>
          <QuizStateContext.Provider value={this.state.quizState}>
            <QuizDisplay />
          </QuizStateContext.Provider>
        </div>
      </div>
    );
  }
}

export default App;

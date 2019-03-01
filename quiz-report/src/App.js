import React, { Component } from 'react';
// import logo from './logo.svg';
import RegistryDisplay from './RegistryDisplay';
import QuizDisplay from './QuizDisplay';
import './App.css';

//https://socket.io/get-started/chat/

class App extends Component {
  render() {
    return (
      <div className="App">
        <RegistryDisplay />
        <QuizDisplay />
      </div>
    );
  }
}

export default App;

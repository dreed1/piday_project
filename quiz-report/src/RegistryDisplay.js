import React, { Component } from 'react';
import io from 'socket.io-client';

class RegistryDisplay extends Component {
	constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      userNames: []
    };
  }

	componentDidMount() {
		this.socketStuff();
	}

	socketStuff() {
		var _this = this;
		const socket = io('http://localhost');
		// socket.on('connect', function(){
			// console.log("I am connected to the socket");
		// });
  	socket.on('user registry change', function(msg){
      console.log("registry display got user reg change")
  	 	var newUserNames = msg["user_names"]
  	 	// var userToIPMap = msg["all_users"]
  	 	// console.log(userToIPMap)
  	 	if (newUserNames) {
  	 		_this.setState({userNames: newUserNames});
  	 	}
  	});
  	// socket.on('disconnect', function(){});
	}

	render() {
		const userNames = this.state.userNames.map((userName) => <div key={userName}>{userName}</div>);
    return (
      <div className="RegistryDisplay">
        <div>There are currently {this.state.userNames.length} users registered.</div>
        <ul>{ userNames }</ul>
      </div>
    );
  }
}

export default RegistryDisplay;
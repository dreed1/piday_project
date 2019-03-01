import React, { Component } from 'react';
import io from 'socket.io-client';
import UserRegistry from './UserRegistry';

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
    //new_username
  	socket.on('user registry state', function(msg){
      console.log("registry display got user registration state")
  	 	var newUserNames = msg["user_names"]
  	 	// var userToIPMap = msg["all_users"]
  	 	// console.log(userToIPMap)
  	 	if (newUserNames) {
  	 		_this.setState({userNames: newUserNames});
  	 	}
  	});
    socket.on('user registry change', function(msg){
      console.log("registry display got user reg addition")
      var newUsername = msg["new_username"]

      if (newUsername) {
        _this.setState({userNames: [newUsername]});
      }
    });
  	// socket.on('disconnect', function(){});
	}

  // addNewUser(userName) {
  //   var
  // }

	render() {
		const userNames = this.state.userNames.map((userName) => <UserRegistry key={userName} username={userName} />);
    return (
      <div className="RegistryDisplay">
        <div className="RegistryHeader">There are currently {this.state.userNames.length} users registered.</div>
        <div>{ userNames }</div>
      </div>
    );
  }
}

export default RegistryDisplay;
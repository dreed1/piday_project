import React, { Component } from 'react';
// import io from 'socket.io-client';
import UserRegistry from './UserRegistry';
import { UserRegistryNamesContext, UserRegistryCountContext } from './ComponentContexts';

class RegistryDisplay extends Component {
	constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      userNames: []
    };
  }

	render() {
    return (
      <div className="RegistryDisplay">
        <UserRegistryCountContext.Consumer>
          {userCount => (
            <div className="RegistryHeader">There are currently {userCount} users registered.</div>
          )}
        </UserRegistryCountContext.Consumer>
        <UserRegistryNamesContext.Consumer>
          {usernames => (
            <div>
              { usernames.map((userName) => { return <UserRegistry key={userName} username={userName} />})}
            </div>
          )}
        </UserRegistryNamesContext.Consumer>
      </div>
    );
  }
}

export default RegistryDisplay;
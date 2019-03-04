import React, { Component } from 'react';
// import io from 'socket.io-client';
import UserRegistry from './UserRegistry';
import { UserRegistryNamesContext } from './ComponentContexts';

class RegistryDisplay extends Component {
	constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      userCount: this.props.userCount
    };
  }

	render() {
    return (
      <div className="RegistryDisplay">
        <div className="RegistryHeader">There are currently {this.props.userCount} users registered.</div>
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
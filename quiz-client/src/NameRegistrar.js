import React, { Component } from 'react';

import APILocation from './Constants';


class NameRegistrar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      myName: "I dont have a name",

    };
  }

  componentDidMount() {
    var _this = this;
    const fetchURL = APILocation + "whoami";
    fetch(fetchURL)
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
		return (
      <div className="NameRegistrarContainer">
			  <div className="NameEntry">Hi, my name is {this.state.myName}!</div>
      </div>
		);
	}
}

export default NameRegistrar;
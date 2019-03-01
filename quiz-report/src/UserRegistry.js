import React, { Component } from 'react';

class UserRegistry extends Component {
	constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      username: this.props.username,
      className: ""
    };
    this.activeTimeout = null
    this.setCSS("JustCreated");
  }

  //JustCreated, JustVoted, Inactive, QuizComplete

  setCSS(cssClass) {
  	var _this = this;

  	const fullClassName = "UserName " + cssClass
  	this.setState({className: fullClassName});

  	clearTimeout(this.activeTimeout);
  	this.activeTimeout = setTimeout(function() { _this.setCSS("Inactive") }, 5000);
  }

	render() {
  	var classes = ['UserName',this.state.className];
    return (
        <div key={this.state.username} className={classes.join(' ')}>{this.state.username}</div>
    );
  }
}

export default UserRegistry;
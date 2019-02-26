class NameRegistrar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      myName: "I dont have a name"
    };
  }

  componentDidMount() {
    fetch("http://0.0.0.0/whoami")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            myName: result.your_name
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    return (
      <div className="nameRegistrar">
        Hi, I'm {this.state.myName}.
      </div>
    );
  }
}

ReactDOM.render(
  <NameRegistrar />,
  document.getElementById('name')
);
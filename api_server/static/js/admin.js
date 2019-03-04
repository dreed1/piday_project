const testABunchOfUsers = async () => {
  console.log("lemme test those users")
  const response = await fetch('/test_a_bunch_of_users', {
    method: 'GET',
    // body: myBody, // string or object
    headers:{
      'Content-Type': 'application/json'
    }
  });
  const myJson = await response.json(); //extract JSON from the http response
  console.log(myJson);
  // we could do something with myJson
}

const resetQuiz = async () => {
  console.log("asking for a quiz reset")
  const response = await fetch('/reset_quiz', {
    method: 'GET',
    // body: myBody, // string or object
    headers:{
      'Content-Type': 'application/json'
    }
  });
  const myJson = await response.json(); //extract JSON from the http response
  console.log(myJson);
  // we could do something with myJson
}

const resetUsers = async () => {
  console.log("asking for a user reset")
  const response = await fetch('/reset_names', {
    method: 'GET',
    // body: myBody, // string or object
    headers:{
      'Content-Type': 'application/json'
    }
  });
  const myJson = await response.json(); //extract JSON from the http response
  console.log(myJson);
  // we could do something with myJson
}

const resetEverything = () => {
  console.log("asking for a FULL reset")
  resetQuiz();
  resetUsers();
}
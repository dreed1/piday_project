// (function() {
const resetQuiz = async () => {
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


// })();

// function UserAction() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//          if (this.readyState == 4 && this.status == 200) {
//              alert(this.responseText);
//          }
//     };
//     xhttp.open("POST", "Your Rest URL Here", true);
//     xhttp.setRequestHeader("Content-type", "application/json");
//     xhttp.send("Your JSON Data Here");
// }
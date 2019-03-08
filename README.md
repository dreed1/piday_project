
#Pinterest Pi Day Project

##By: Dan Reed

Hi! Welcome to the project, there's 3 parts:
	* API server
	* Quiz Client
	* Quiz Reporting Dashboard

##Installation/Getting started

### Raspi setup
If you're on a raspberry pi zero you'll need 2 things-- node.js and yarn (a node package manager).
The easy way on a raspi is to run `./install_me_first.sh`.

If you're on a macbook, you might already have them... but if not, homebrew is great. Use that!

Once those are installed, reload your shell with `bash`.

### Client setup (If you're at my talk, I did this for you!)

You'll then need to install the project dependencies.
For the quiz client, you can run `./install_client_dependencies.sh` which will have yarn install all the goodies.

### API && Reporting Dashboard setup (not required at the talk, I'm running the server and dashboard for you)

To install everything I've set up routes for python2 and python3.
My macbook can run either without problems, but my Raspberry Pi didn't like python2 so it's better to run python3.

For Python2:
`./install_everything_python2.sh`

For Python3:
`./install_everything_python3.sh`

##Running the servers

####Client
Start the client with `./run_quiz.sh`.
It takes a few minutes to get running on a computer as small as a raspi, but once started it'll automatically reload whenever you make changes.

####Server
This is not needed at my talk, but maybe you want to at home.
Python2: `./run_api_python2.sh`
Python3: `./run_api_python3.sh`

####Reporting Dashboard
You don't have to do this if you're at my talk, but you might want to at home.
Start the dashboard with `./run_report.sh`

### Once you're up and running

##### Quiz client
Figure out the IP of the API server, and change the APILocation constant in `/quiz-client/src/Constants.js`
Navigate to the IP it says on any web browser (i didn't check the CSS for phones, it might look pretty bad) and take the quiz!

##### Quiz report dash
Again, you're going to need the IP of the API server-- change the `socketHost` constant near the top of `/quiz-report/src/App.js`
Navigate to the IP it says on any web browser and watch it update while you take the quiz!

##### API server
You can change the quiz however you'd like -- it's a json file: `/api_server/json_files/quiz.json`.
You can access a simple admin page for resetting/testing at: `SERVER_IP/admin`.

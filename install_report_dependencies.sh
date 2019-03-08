#this script calls yarn and installs all the dev dependencies for the quiz reporting dashboard.
echo "Installing quiz report dependencies"
yarn --cwd ./quiz-report install --network-timeout 1000000
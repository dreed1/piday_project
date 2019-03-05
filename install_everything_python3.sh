echo "Installing quiz report dependencies"
yarn --cwd ./quiz-report install
echo "Installing quiz client dependencies"
yarn --cwd ./quiz-client install
echo "Installing api server dependencies"
pip3 install -r ./api_server/requirements.txt
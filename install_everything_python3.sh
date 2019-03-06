echo "Installing quiz report dependencies"
yarn --cwd ./quiz-report install --network-timeout 1000000
echo "Installing quiz client dependencies"
yarn --cwd ./quiz-client install --network-timeout 1000000
echo "Installing api server dependencies"
pip3 install -r ./api_server/requirements.txt
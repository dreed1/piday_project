echo "Installing node (not installed by default on a raspi zero)"
wget -O - https://raw.githubusercontent.com/sdesalas/node-pi-zero/master/install-node-v8.10.0.sh | bash
echo "Installing Yarn (needed for both servers)"
curl -o- -L https://yarnpkg.com/install.sh | bash
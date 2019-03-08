# this script installs Node through a wget.
# normally, you should NEVER trust a random CURL command though!
# do as I say, not as I do!
echo "Installing node (not installed by default on a raspi zero)"
wget -O - https://raw.githubusercontent.com/sdesalas/node-pi-zero/master/install-node-v8.10.0.sh | bash
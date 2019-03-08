# this script installs Yarn through a curl command.
# normally, you should NEVER trust a random CURL command though!
# do as I say, not as I do!
echo "Installing Yarn (needed for both servers)"
curl -o- -L https://yarnpkg.com/install.sh | bash
#this script installs every dependency you'd need (assuming you use python 3)
./install_report_dependencies.sh
./install_client_dependencies.sh
echo "Installing api server dependencies"
pip3 install -r ./api_server/requirements.txt
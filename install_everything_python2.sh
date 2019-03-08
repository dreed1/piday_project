#this script installs every dependency you'd need (assuming you use python 2)
./install_report_dependencies.sh
./install_client_dependencies.sh
echo "Installing api server dependencies"
pip install -r ./api_server/requirements.txt
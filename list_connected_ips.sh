#this script uses nmap to tell you the mac address and IP of each computer connected on the network.

#make sure you change the IP here to whatever the router says.
sudo nmap -sn 172.16.154.1/24

#arp -a
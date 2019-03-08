# This script runs rsync so that you don't have to program on your remote computer.
# before running, edit the source folder, the destionation folder, and the IP of the remote computer (the Raspberry Pi)

# syntax: rsync -avzhe ssh SOURCE_DIRECTORY pi@YOUR.REM.OTE.IP:DESTINATION_DIRECTORY
rsync -avzhe ssh ~/code/piday_project/ pi@192.168.29.202:~/code/piday_project/
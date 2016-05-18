
# Fixes in case the Rpi freezes during install
sudo dpkg --configure -a

# System Updates
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install xdotool vim htop -y

# NodeJS installs
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs

# create startup script
sudo touch /home/pi/startup.sh
sudo echo 'cd /home/pi/ble-scanner-station-demo' >> /home/pi/startup.sh
sudo echo 'sudo node index.js &' >> /home/pi/startup.sh
sudo echo '(epiphany 127.0.0.1:8080 & sleep 10 & xdotool key F11 )&' >> /home/pi/startup.sh
sudo echo 'sleep 10' >> /home/pi/startup.sh
sudo echo 'xdotool key F11' >> /home/pi/startup.sh

# Enable Kiosk Mode
sudo apt-get install x11-server-utils unclutter -y
sudo echo @xset s off >> /home/pi/.config/lxsession/LXDE-pi/autostart
sudo echo @xset -dpms >> /home/pi/.config/lxsession/LXDE-pi/autostart
sudo echo @xset s noblank >> /home/pi/.config/lxsession/LXDE-pi/autostart
sudo echo @lxterminal >> /home/pi/.config/lxsession/LXDE-pi/autostart
sudo echo @sh /home/pi/startup.sh >> /home/pi/.config/lxsession/LXDE-pi/autostart


# Bluetooth specific installs - no longer necessary since RPI3 installs BLE tools by default
#sudo apt-get install bluetooth -y
#sudo apt-get install libbluetooth-dev -y
#sudo apt-get install libboost-thread-dev -y

# install demo
cd /home/pi
git clone https://github.com/BlackstoneEngineering/ble-scanner-station-demo.git
sudo chown -R pi:pi ble-scanner-station-demo/
cd ble-scanner-station-demo
git checkout dac-demo
sudo npm install

#restart machine to test 
sudo reboot
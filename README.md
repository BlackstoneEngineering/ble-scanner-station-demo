## Intro
This is a booth demo for conferences / events.  This demo consists of two parts:
- **Part 1** - ble beacon advertising a persons name (see code [here](https://developer.mbed.org/users/mbedAustin/code/ble-scanner-demo-beacon/))
- **Part 2** - Raspberry Pi hooked up to a monitor running this nodeJS app. 

## Explanation
The idea is that at your booth users will program their beacons with their names and as they walk around the show floor the Raspberry Pi's at partner booths will pick up the beacons when they come within ~10 feet and display a welcome message on the display. 

## Technicals

#### beacons
The beacons are programmed using [this program](https://developer.mbed.org/users/mbedAustin/code/ble-scanner-demo-beacon/). This program is then compiled using the mbed [compile api](https://developer.mbed.org/handbook/Compile-API) and flashed via over the air firmware update onto a blank beacon. A nice perk is this can all be done on a tablet as the user just has to fill out a web page form, then a binary is automatically generated and downloaded. The beacon is programmed with a TX power that is calibrated to be registered by the Raspberry Pi at ~10 feet. The TX Power will be different between different manufacturers, but usually it is the lowest setting possible, -40dB.

#### Raspberry Pi Scanner
The Raspberry Pi 3 scans for beacons using the NodeJS noble plugin. Displayed on the monitor is a full screen webapp that has a websocked open to the back end. When noble see's a named beacon with acceptable rssi (meaning its close) then it sends the name over the websocket to the web app. The web app then displays the name on the screen, something along the lines of `Welcome __, to the booth of awesome!`, where `__` is filled in with the persons name. 

## media
![Screenshot](https://github.com/BlackstoneEngineering/ble-scanner-station-demo/blob/master/screenshot.PNG)<br>
This is what the demo looks like, the orange text will change based on the most powerful BLE beacon nearby. 

## How to use
1. load [this webapp](https://github.com/ARMmbed/mbed-compile-api-js/tree/dac-demo) onto a tablet to generate the embedded device code.
2. Install Raspbian Noobs on a Raspberry Pi 3 and then run the `Rpi3setup.sh` script on the Raspberry Pi 3, `sudo sh Rpi3setup.sh`. This script will install all the necessary bits to run the demo and setup the RPi to automatically go into kiosk mode on startup. 


#### Customization
All customization happens in the `.env` file.
- `PRE_MESSAGE`: you can customize the message before the beacon names
- `POST_MESSAGE`: you can customize the message after the beacon names. All text is dynamically resized to fit the screen, so the more text you put in the smaller it will be. 
- `LOGO_2`,`LOGO_1` : you can change the logos by changing the logo1.png and logo2.png. You can also remove all logos by commenting out the logo lines in the `.env` file.
- `BACKGROUND_COLOR`: change via hex color code in the `.env` file
- `MESSAGE_COLOR` : hex color code to control the orange text
- `FONT_COLOR`: change via hex color code in the `.env` file
- `RSSI`: You filter beacons by their TX Power, this will allow you to effectively set how close a beacon has to be before it is picked up and displayed.
- `PORT`: this is the port the webapp can be accessed on, the default is 8080

## Liscense
Apache 2.0, feel free to re-use for personal or commercial needs. 



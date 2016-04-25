## Intro
This is a booth demo for conferences / events.  This demo consists of two parts:
- **Part 1** - ble beacon advertising a persons name (see code here: TODO)
- **Part 2** - Raspberry Pi hooked up to a monitor running nodeJS app. 

## Explanation
The idea is that at your booth users will program their beacons with their names and as they walk around the show floor the Raspberry Pi's at partner booths will pick up the beacons when they come within ~10 feet and display a welcome message on the display. 

## Technicals

#### beacons
The beacons are programmed using this program TODO. This program is then compiled using the mbed [compile api](https://developer.mbed.org/handbook/Compile-API) and flashed via over the air firmware update onto a blank beacon. A nice perk is this can all be done on a tablet as the user just has to fill out a web page form, then a binary is automatically generated and downloaded. The beacon is programmed with a TX power that is calibrated to be registered by the Raspberry Pi at ~10 feet. The TX Power will be different between different manufacturers, but usually it is the lowest setting possible, -40.

#### Raspberry Pi Scanner
The Raspberry Pi 3 scans for beacons using the NodeJS noble plugin. Displayed on the monitor is a full screen webapp that has a websocked open to the back end. When noble see's a named beacon with acceptable rssi (meaning its close) then it sends the name over the websocket to the web app. The web app then displays the name on the screen, something along the lines of `Welcome __, to the booth of awesome!`, where `__` is filled in with the persons name. 

## media
![Screenshot](https://github.com/BlackstoneEngineering/ble-scanner-station-demo/blob/master/screenshot.PNG)<br>
This is what the demo looks like, the orange text will change based on the most powerful BLE beacon nearby. 

## How to use
If you would like to duplicate this demo you can use the webapp here : TODO to generate the embedded device code. You can use the NodeJS application in this folder to run on the raspberry pi. There is an auto config script TODO located in this folder that you can run on a stock Raspbian Noobs install to get everything up and ready to go.

#### Customization
Make sure to swap out the logos in the `/public/images` folder for whatever company you are collaborating with. 
You can enable / disable the logos, change the background color, text color and messages in the `.env` file.

## Liscense
Apache 2.0, feel free to re-use for personal or commercial needs. 





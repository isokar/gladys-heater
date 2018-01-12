# Gladys radioemitter

Radio emitter is used to control radio plugs.

## Installation

- First, install the [Serial](https://developer.gladysproject.com/en/modules/serial) module in Gladys
- Then, install this module in Gladys
- Push the [arduino code](https://github.com/GladysProject/gladys-radioemitter/blob/master/arduino-code.ino) to your arduino with the [Arduino IDE](https://www.arduino.cc/en/main/software). You need to have `ArduinoJson` and [`433MHzForArduino`](https://bitbucket.org/fuzzillogic/433mhzforarduino/src) libraries installed. To install the libraries, in the arduino IDE (version > 1.6) go to "Sketch" => "Include Library" => "Manage Libraries". Then search "ArduinoJson" and click on "install".
- Reboot Gladys
- Connect your arduino in USB to your Raspberry Pi
- Click on the "config" button of the "Serial" module in the "Modules" view. 
- Create a device in Gladys in the Device view with the following info => 

### For old fashion

| name | identifier | protocol | service 
| ---| ---| ---| ---| 
| My Switch | YOUR_DECIMAL_CODE_FOR_THIS_SWITCH_OFF | radio | radioemitter 

### For New fashion with non+1 code

| name | identifier | protocol | service 
| ---| ---| ---| ---| 
| My Switch | YOUR_DECIMAL_CODE_FOR_THIS_SWITCH_OFF.YOUR_DECIMAL_CODE_FOR_THIS_SWITCH_ON | diffRF | radioemitter 

### For DIO compatible modules

| name | identifier | protocol | service 
| ---| ---| ---| ---| 
| My Switch | YOUR_DECIMAL_ADRESS.YOUR_DECIMAL_UNIT | DIO | radioemitter 



- Then, inside this device, create a deviceType :

| type | min | max 
| ---| ---| ---|
| binary | 0 | 1

## Credits

Thanks to [Irumi](https://community.gladysproject.com/u/irumi/summary) for the first version of this module :)

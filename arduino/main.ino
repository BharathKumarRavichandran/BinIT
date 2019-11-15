#include <Adafruit_Fingerprint.h>
#include <DFRobot_sim808.h>
#include <SoftwareSerial.h>
#include "HX711.h"

//Mobile phone number,need to change
#define PHONE_NUMBER "+918299850006"

//The content of messages sent
#define MESSAGE  "Smart Bin opened"

#define mySerialFP Serial1
//#define mySerialSim Serial3

#define PIN_TX    10
#define PIN_RX    11
SoftwareSerial mySerialSim(PIN_TX,PIN_RX);

#define DOUT1  6
#define CLK1  5

#define DOUT2 4 
#define CLK2 3

HX711 scale1(DOUT1, CLK1);

HX711 scale2(DOUT2, CLK2);

//Change this calibration factor as per your load cell once it is found you many need to vary it in thousands
float calibration_factor2 = -20387; //-106600 worked for my 40Kg max scale setup
float calibration_factor1 = -20387;

// defines pins numbers
const int trigPin = 9;
const int echoPin = 8;

// defines variables
long duration;
int distance;

//make sure that the baud rate of SIM900 is 9600!
//you can use the AT Command(AT+IPR=9600) to set it through SerialDebug

DFRobot_SIM808 sim808(&mySerialSim);
int ultrasonic_sensor();

int getFingerprintIDez();

// pin #2 is IN from sensor (GREEN wire)
// pin #3 is OUT from arduino  (WHITE wire)
//SoftwareSerial mySerial(4, 5);
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerialFP);

// On Leonardo/Micro or others with hardware serial, use those! #0 is green wire, #1 is white
//Adafruit_Fingerprint finger = Adafruit_Fingerprint(&Serial1);

unsigned long previousMillis = 0;        // will store last time LED was updated
unsigned long currentMillis;
const long lock_interval = 15000; //This is the amount of time I want the lock to remain open
const int lock_pin = 31;

void setup()
{
  mySerialSim.begin(9600);
  pinMode(lock_pin, OUTPUT);
  digitalWrite(lock_pin, LOW);
  //This will keep the latch lock to LOW
  //and keep the door locked (until it goes HIGH)

  Serial.println("lock pin low starting point");

  while (!Serial);  // For Yun/Leo/Micro/Zero/...
  mySerialSim.begin(9600);
  Serial.begin(9600);
  //Serial3.begin(9600);
  Serial.println("Adafruit finger detect test");

  // set the data rate for the sensor serial port
  finger.begin(57600);

  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input

  if (finger.verifyPassword()) {
    Serial.println("Found fingerprint sensor!");
  } else {
    Serial.println("Did not find fingerprint sensor :(");
    while (1);
  }
  //Serial.println("Waiting for valid finger...");
}

void loop()                     // run over and over again
{

  int dist = ultrasonic_sensor();


  if (dist < 37) {
    getFingerprintIDez();
  }
  delay(50);            //don't ned to run this at full speed.

  currentMillis = millis();
  //If enough time has passed since unlocking the door, lock it
  if (currentMillis - previousMillis >= lock_interval) {
    digitalWrite(lock_pin, LOW); //lock the lock
    Serial.println("lock pin low in loop inside if");
  }

}


// returns -1 if failed, otherwise returns ID #
int getFingerprintIDez() {

  //Serial.println("inside getfingerprintidez");
  uint8_t p = finger.getImage();
  if (p != FINGERPRINT_OK)  return -1;

  p = finger.image2Tz();
  if (p != FINGERPRINT_OK)  return -1;

  p = finger.fingerFastSearch();
  if (p != FINGERPRINT_OK)  return -1;

  // found a match!
  Serial.print("Found ID #"); Serial.print(finger.fingerID);
  Serial.print(" with confidence of "); Serial.println(finger.confidence);

  //IF there is a confident match, open the latch lock
  //and keep it open for the unlock interval
  if (finger.confidence > 10)
  {
    previousMillis = millis();
    digitalWrite(lock_pin, HIGH); //open the lock
    Serial.println("***************lock pin high***************");
    int weight = measure_weight();
    if (!sim808.init()) {
      Serial.print("Sim808 init error\r\n");
    } else {
      Serial.println("Sim808 init success");
      Serial.println("Start to send message ...");
      //******** define phone number and text **********
      //weight = 67 + (int)random(-5,5);
      //String msg = "Latitude : " + sim808.GPSdata.lat + "," + "Longitude : " + sim808.GPSdata.lon
      String msg = "Smart bin opened";
      //Serial.println("******************** %s *************************",weight) ;
      //msg.concat(weight);
      sim808.sendSMS(PHONE_NUMBER, MESSAGE);
      //sim808.sendSMS();
    }

  }

  return finger.fingerID;
}

int ultrasonic_sensor() {
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
  // Calculating the distance
  distance = duration * 0.034 / 2;
  // Prints the distance on the Serial Monitor
  Serial.print("Distance: ");
  Serial.println(distance);
  return distance;
}

int measure_weight(){
  scale1.set_scale(calibration_factor1);
  scale1.set_scale(calibration_factor2);

  return scale1.get_units()+scale2.get_units();
}
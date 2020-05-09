#!/bin/bash
echo "Init BDT testing of App: $1 on version: $2 with key: $3 and using device $4 with port: $5 and test $6"
while [ -f "/home/uploads/$4-$5.lock" ]
do
   echo "Wait emulator is free sleep 10"
   sleep 10
done
touch /home/uploads/$4-$5.lock
echo "Init emulator"
./startEmulator.sh $4 $5
echo "gonig to /home/uploads"
cd /home/uploads
echo "copying $1/bdt-$6 to $1/$2/bdt-$6"    
cp -r $1/bdt-$6 $1/$2
echo "copying $1/$2/$1.apk to $1/$2/bdt-$6/$1.apk"
cp $1/$2/$1.apk $1/$2/bdt-$6/
echo "goning to $1/$2/bdt-$6"
cd $1/$2/bdt-$6
echo "singing $1.apk"
calabash-android resign $1.apk
if [ ! -f "results/$4/$3/images" ]; then
    mkdir -p results/$3/$4/images
fi
sleep 30
echo "running tests on $1.apk and saving results on $1/$2/bdt-$6/results/$3/$4/summary.txt"
SCREENSHOT_PATH=results/$3/$4/images/ ADB_DEVICE_ARG=emulator-$5 calabash-android run $1.apk>results/$3/$4/summary.txt
echo "release emulator"
adb -s emulator-$5 emu kill
rm -rf /home/uploads/$4-$5.lock
echo "create ready file"
touch results/$3/$4/ready.lock
#!/bin/bash
echo "Init BDT testing of App: $1 on version: $2 with key: $3 and using device $4 with port: $5 and url $6"
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
mkdir -p $1/$2/e2e
echo "copying $1/$2/$1.apk to $1/$2/rt/$1.apk"
cp $1/$2/$1.apk $1/$2/e2e/
echo "clonning to repo"
cd $1/$2/e2e
git clone $6 repo
echo "going to repo"
mkdir -p results/$3/$4
cd repo
sleep 30
echo "running tests on $1.apk and saving results on $1/$2/bdt-$6/results/$3/$4/summary.txt"
ANDROID_SERIAL=emulator-$5 ./gradlew connectedAndroidTest>../results/$3/$4/summary.txt
echo "release emulator"
adb -s emulator-$5 emu kill
rm -rf /home/uploads/$4-$5.lock
echo "create ready file"
touch ../results/$3/$4/ready.lock
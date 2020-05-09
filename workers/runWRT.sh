#!/bin/bash
echo "Init RT testing of Web App: $1 on version: $2 with url: $3 using browser: $4 and with key: $5 and test $6"
echo "gonig to /home/uploads"
cd /home/uploads
mkdir -p $1/$2/$5
echo "copying $1/rt-$6 to $1/$2/$5/rt-$6"    
cp -r $1/rt-$6 $1/$2/$5
cd $1/$2/$5/rt-$6
cd cypress/integration
sed -i "s|VAR_URL|$3|g" *.js
cd ../..
npx cypress run --headless --browser $4 > run_key.txt
cd ..
mkdir -p runs-rt/$4
cp -r rt-$6/cypress/screenshots runs-rt/$4/
cd rt-$6
touch ready-$4.lock
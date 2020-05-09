#!/bin/bash
echo "Init E2E testing of Web App: $1 on version: $2 with url: $3 using browser: $4 and with key: $5 and test $6"
echo "gonig to /home/uploads"
cd /home/uploads
mkdir -p $1/$2/$5
echo "copying $1/e2e-$6 to $1/$2/$5/e2e-$6"    
cp -r $1/e2e-$6 $1/$2/$5
cd $1/$2/$5/e2e-$6
cd cypress/integration
sed -i "s|VAR_URL|$3|g" *.js
cd ../..
npx cypress run --headless --browser $4 > run_key.txt
cd ..
mkdir -p runs-e2e/$4
cp -r e2e-$6/cypress/screenshots runs-e2e/$4/
cd e2e-$6
touch ready-$4.lock
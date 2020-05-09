#!/bin/bash
echo "Init BDT testing of Web App: $1 on version: $2 with url: $3 using browser: $4 and with key: $5 and test $6"
echo "gonig to /home/uploads"
cd /home/uploads
echo "copying $1/bdt-$6 to $1/$2/bdt-$6"    
cp -r $1/bdt-$6 $1/$2
echo "changing url on config files"
sed -i "s|VAR_URL|$3|g" $1/$2/bdt-$6/wdio.conf.js
echo "changing url and browser on config files"
sed -i "s/VAR_BROWSER/$4/g" $1/$2/bdt-$6/wdio.conf.js
echo "changing app on config files"
sed -i "s/VAR_APP/$1/g" $1/$2/bdt-$6/wdio.conf.js
echo "changing version and browser on config files"
sed -i "s/VAR_VERSION/$2/g" $1/$2/bdt-$6/wdio.conf.js
echo "changing key and browser on config files"
sed -i "s/VAR_KEY/$5/g" $1/$2/bdt-$6/wdio.conf.js
echo "changing url and browser on script files"
cd $1/$2/bdt-$6/features/step-definitions
sed -i "s|VAR_URL|$3|g" *.js
cd ..
sed -i "s|VAR_URL|$3|g" *.feature
cd /home/uploads
echo "goning to $1/$2/bdt"
cd $1/$2/bdt-$6
if [ ! -f "results/$4/$5/images" ]; then
    mkdir -p results/$4/$5/images
fi
npm install
echo "running tests and saving results on $1/$2/bdt-$6/results/$4/$5/summary.txt"
npm test > results/$4/$5/summary.txt
echo "create ready file"
touch results/$4/$5/ready.lock
#!/bin/bash
echo "Create mutations with mDroid+  of App: $1 on version: $2 with key: $3 and using device $4 with port: $5 and url: $6 target (module to mutate): $7 with package: $8"
echo "clonning to repo"
cd $1/$2/mdroid
git clone $6 repo
echo "mutants folder"
mkdir -p mutants/$1
echo "result folder"
mkdir -p results/$3/$4
echo "to root"
cd ..
cd ..
cd ..
echo "running mDroid+ and saving mutants and results"
java -jar mutation/MDroidPlus/target/MDroidPlus-1.0.0.jar mutation/MDroidPlus/libs4ast/ $1/$2/mdroid/repo/$7/src/main/ $8 $1/$2/mdroid/mutants/$1 mutation/MDroidPlus/ false >$1/$2/mdroid/results/$3/$4/summary.txt
echo "go to mutants folder"
cd $1/$2/mdroid/mutants/$1
echo "list mutants"
ls >../../results/$3/$4/summary.txt

#!/bin/bash
cd "$(dirname "$(which emulator)")"
echo $(pwd)
./emulator -port $2 -avd $1 &>/dev/null &
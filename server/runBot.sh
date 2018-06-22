#!/bin/sh
cd ..;
value=$(<./txts/Token.txt)
[ -e './txts/pid.txt' ] && rm './txts/pid.txt'
[ -e './txts/logs.txt' ] && rm './txts/logs.txt'
echo "$value"
touch pid.txt
if (nohup `eval node OverBot.js $value > ./txts/logs.txt`) >> './txts/errors.txt' 2>&1 &
then echo $! >'./txts/pid.txt'
	 echo "Done."
else echo "Error... "
fi
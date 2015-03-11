#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
YUICOMPRESSOR=$DIR/local/yuicompressor-2.4.8.jar
FILE=$DIR/_js.yml
echo $YUICOMPRESSOR
echo "" > $DIR/js/js.js
echo "" > $DIR/js/js.min.js
while read line; do 
    EXT=`echo "$DIR$line" | awk -F . '{print $NF}'`
    if [ ${line: -6} == "min.js" ]; then
        echo  "use -->" $line
        cat $DIR$line >> $DIR/js/js.min.js
    else
        echo  "compress -->" $line
        cat $DIR$line > $DIR/js/js.js
        /usr/bin/java -jar $YUICOMPRESSOR $DIR/js/js.js -o $DIR/js/js.temp.js --charset utf-8 -v
        cat $DIR/js/js.temp.js >> $DIR/js/js.min.js
    fi

done < $FILE
###############################################
FILE=$DIR/_css.yml
echo "" > $DIR/css/css.css
echo "" > $DIR/css/css.min.css

while read line; do 
    EXT=`echo "$DIR$line" | awk -F . '{print $NF}'`
    if [ ${line: -7} == "min.css" ]; then
        echo  "use -->" $line
        cat $DIR$line >> $DIR/css/css.min.css
    else
        echo  "compress -->" $line
        cat $DIR$line > $DIR/css/css.css
        /usr/bin/java -jar $YUICOMPRESSOR $DIR/css/css.css -o $DIR/css/css.temp.css --charset utf-8 -v
        cat $DIR/css/css.temp.css >> $DIR/css/css.min.css
    fi

done < $FILE

#/usr/bin/java -jar $YUICOMPRESSOR $DIR/js/js.js -o $DIR/js/js.min.js --charset utf-8 -v
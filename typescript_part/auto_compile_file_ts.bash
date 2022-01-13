# compile automaticly all typescript files in the current directory
#!bash


while true
do
for file in $(find ../typescript_part -name "*.ts"); do
    last_modification_time=$(stat -c %Y $file)
    current_time=$(date +%s)
    difference=$((current_time - last_modification_time))
    if [ $difference -gt 5 ]; then
        tsc -t es6 $file --outFile ${file%.*}.js >> ts_compile.log
        echo "compiled $file " >> ts_compile.log
    fi
done
sleep 1;
done
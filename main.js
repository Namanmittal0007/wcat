#!/usr/bin/env node
const fs = require("fs");
let inputarr=process.argv.slice(2);
let options=[], files=[];
for(let i=0;i<inputarr.length;i++){
    if(inputarr[i].charAt(0)=='-'){
        options.push(inputarr[i]);
    }
    else{
        files.push(inputarr[i]);
    }
}
if(options.includes("-b") && options.includes("-n")){
    console.log("Select Either -b / -n both can't be select along");
    return;
}
let contentt="";
for(let i=0;i<files.length;i++){
    if(!fs.existsSync(files[i])){
        console.log(files[i]," doesn't exists");
        return;
    }
    let buffer=fs.readFileSync(files[i]);
    if(i==(files.length-1)){
        contentt+=buffer;
        continue;
    }
    contentt+=buffer+"\r\n";
}
let filescontent=contentt.split("\r\n");
if(options.includes("-s")){
    for(let i=1;i<filescontent.length;i++){
        if(filescontent[i]=="" && filescontent[i-1]==""){
            filescontent[i]=null;
        }
        else if(filescontent[i]=="" && filescontent[i-1]==null){
            filescontent[i]=null;
        }
    }
    let tempfilecontent=[];
    for(let i=0;i<filescontent.length;i++){
        if(!(filescontent[i]==null)){
            tempfilecontent.push(filescontent[i]);
        }
    }
    filescontent=tempfilecontent;
}
if(options.includes("-n")){
    for(let i=0;i<filescontent.length;i++){
        filescontent[i]=`${i+1} ${filescontent[i]}`
    }
}
if(options.includes("-b")){
    let count=1;
    for(let i=0;i<filescontent.length;i++){
        if(filescontent[i]!=""){
            filescontent[i]=`${count} ${filescontent[i]}`
            count++;
        }
    }
}
console.log(filescontent.join("\n"));
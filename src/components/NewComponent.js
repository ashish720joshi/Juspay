
import { Promise } from 'q';
import React from 'react';
export default function NewComponent(){

    const keepAPromise=(condition)=>{
        console.log("inside");
       
          return new Promise((resolve,reject)=>{
            setTimeout(() =>{
            if(condition)
        resolve("resolved");
        else reject("reject");
    }, 3000);
          });;
      
      }
      
     keepAPromise(true).then((message)=>{
        console.log(message);
    }).catch((message)=>{
        console.log(message);
    });;


        return (<div>
            ashish
        </div>)
}
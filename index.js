//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended : true }));

const __dirname = dirname(fileURLToPath(import.meta.url));
let logging = false ;


function passwordChecker(req,res,next){
    const password = "ILoveProgramming";
    if(password === req.body["password"]){
        logging = true;
    };  
    next();
}

app.use(passwordChecker);

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check",(req,res)=>{
    console.log(req.body["password"])
    if(logging){
        res.sendFile(__dirname + "/public/secret.html");
        logging = false
    }   
    else
        res.sendFile(__dirname + "/public/index.html")
});

app.listen(port,()=>{
    console.log(`server is running PORT ${port}`)
})
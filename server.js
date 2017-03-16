var express = require('express');
var path = require('path');
var app = express();

var port = process.env.PORT||8080;

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/raw',function(req,res){
    var language = req.headers["accept-language"].toString().slice(0,5);
    var agent = req.headers["user-agent"].match(/\(.+?\)/)[0].slice(1,-1);
    var userIP = req.headers['x-forwarded-for'].toString();
    var userInfo = {"IP address": userIP,"Language":language,"Operating System":agent}
    res.send(userInfo);
})
app.get('/',function(req,res){
    var language = req.headers["accept-language"].toString().slice(0,5);
    var agent = req.headers["user-agent"].match(/\(.+?\)/)[0].slice(1,-1);
    var userIP = req.headers['x-forwarded-for'].toString();
    res.render('view',{
        ipValue:userIP,
        langValue:language,
        osValue:agent
    });
});

app.listen(port,function(){
    console.log("Server running");
});
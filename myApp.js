let express = require('express');
let app = express();
let bodyParser= require('body-parser');

console.log("Hello World")
require('dotenv').config()

//another middlewear
const findip=(req, res, next)=> {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next();
}

app.use(findip,bodyParser.urlencoded({extended: false}))

//Serve an Html file
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
})

//serve static assests
abspath = __dirname +"/public"
app.use("/public", express.static(abspath))

//serve json
app.get("/json", function(req,res){
    if(process.env.MESSAGE_STYLE=="uppercase"){ 
        res.json({message: "HELLO JSON"});
    }
 else
    { res.json({message: "Hello json"}); }
})

// /now path
const tellTime=(req,res,next)=>{
  let nowtime =new Date().toString();
  req.time= nowtime;
  next();
}
const handle =(req,res,next)=>{
  res.json({time: req.time})
}
app.get('/now', tellTime, handle)

// echo server
app.get('/:word/echo',(req,res)=>{
  res.json({echo: req.params.word})
})

// /name path
app.get('/name',(req,res)=>{
  res.json({ name: `${req.query.first} ${req.query.last}`})
})

app.post('/name',(req,res)=>{
  res.json({name: `${req.body.first} ${req.body.last}`})
})




 module.exports = app;

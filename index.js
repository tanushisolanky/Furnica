var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))


mongoose.connect('mongodb://localhost:27017/furniture',{
    useNewUrlParser: true,
    useUnifiedTopology: true

});
var db=mongoose.connection;
app.post("/sign_up",(req,res)=>{
    var name=req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var confirm_password=req.body.confirm_password;


        var data={
            "name": name,
            "email" : email,
            "username": username,
            "password" : password,
            "confirm_password":confirm_password
        }

        db.collection('users').insertOne(data,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log("Inserted");
        });
        return res.redirect('index.html')
})



app.post("/feedback",(req,res)=>{
    
    var name=req.body.name;
    var email=req.body.email;
    var feedback=req.body.feedback;
    
    var data={
        "name": name,
        "email": email,
        "feedback": feedback

       
        }

        db.collection('feedback').insertOne(data,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log("Inserted");
        });
        return res.redirect('index.html')
})



app.post("/add_cart",(req,res)=>{
    var name=req.body.name;
    

        var data_cart={
            "name": name
            }

        db.collection('carts').insertOne(data_cart,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log("Added to Cart");
        });
        return res.redirect('cart.html')
})

//const https = require('https');
/*
app.get('item?_id=_id', (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
*/


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect(index.html)
    }).listen(3000);

console.log("listen from port 3000");
``
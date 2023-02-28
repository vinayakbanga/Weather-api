const express =require("express");
const https= require("https");
const bodyParser=require("body-parser");



const app= express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

    
});
app.post("/",function(req,res){
    
    const query = req.body.cityName;
    console.log( query);
    const unit= "metric";
const apikey="9f6aa2dd29ebfbc1fc4117b20bd0d915";
  https.get("https://api.openweathermap.org/data/2.5/weather?appid="+apikey+"&q="+query+"&units="+unit,function(response){
        console.log(response.statusCode);



        response.on("data",function(data){//this code is for getting the data from api
            const weatherdata=JSON.parse(data);//parsing json
            const temp=weatherdata.main.temp;//extracting the data that we want from json
            const weatherDesc=weatherdata.weather[0].description
            const icon = weatherdata.weather[0].icon
            const imgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            console.log(weatherDesc);
            res.write("<h1>the Temprature in"+query+"is "+ temp+"</h1>");// We can have only one res.send but to print multiple lines we can use res.write
            res.write("<h1> the day is"+weatherDesc+"</h1>");
            res.write("<img src="+imgUrl+">" )
            res.send();
        })
    })

    

})












app.listen(3000,function () {
    console.log("server is running on port 3000");
})

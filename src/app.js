require("dotenv").config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const getWeather = require('./utils/getweather');

//Init app
const app = express();
const port = process.env.SERVER_PORT || 3000

//Define path for express config
const publicDirectoryPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

//Static assets and Handlebars config
app.use(express.static(publicDirectoryPath));
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.get("/",(req,res)=>{
    res.render('index',{ title: "Weather app", name: "Yasar Arafat" });
});

app.get("/about",(req,res)=>{
    res.render('about', { title: "Weather app", name: "Yasar Arafat"});
});

app.get("/help",(req,res)=>{
   res.render('help', 
     {title: "Weather app",
     helptext: "Hope this info may be helpful", 
     name: "Yasar Arafat"});
})

app.get("/weather", async (req,res)=>{
   if(!req.query.address){
       return res.send({
           error:"You must prodvide an address"
       })
   }
    try {
        const { Latitude,Longitude,Location } = await geoCode(req.query.address);
        const message = await getWeather(Latitude, Longitude);
        res.json({
            location:Location,
            forcastData: message,
            address:req.query.address
        })
    } catch (e) {
        res.json({error:e});
    }
});

app.get("*",(req,res)=>{
   res.render('404', 
      {title: "Weather app", 
      name: "Yasar Arafat",
      message: "The page you are looking for is not found"
    });
});




app.listen(port,()=>{
    console.log(`Server is up and Running on port ${port}`);
})

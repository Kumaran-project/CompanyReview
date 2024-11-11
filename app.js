const express=require("express");
const cors=require("cors");
const reviewroute=require("./Routes/reviewroutes")
const  {sequelize}=require("./config/db.js")
const app=express();


app.use(express.json());
app.use(cors());

app.use(reviewroute);


sequelize.sync().then(()=>{
  app.listen(5000);
  }).catch((err)=>{
    console.log(err);
  })

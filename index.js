require('dotenv').config()
const express =require("express")
const app=express()
const mongoose=require("mongoose")
const cors = require('cors');
const Product=require("./models/Product")
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,     
}).then(data=>console.log("Connected to mongo db")).catch(err=>console.log("Error "+err))
app.use(express.json())

const productRoutes=require("./routes/ProductRoutes")
const cartRoutes=require("./routes/CartRoutes")
app.use(cors());
app.use("/",productRoutes)
app.use("/",cartRoutes)
app.listen(process.env.PORT||7500, () => {
        console.log(`Server is listening on port ${PORT}`);
      });
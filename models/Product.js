const mongoose=require("mongoose")
const productSchema=mongoose.Schema({
    id:Number,
    category:String,
    brand: String,
    image: String,
    description: String,
    price:Number,
    discount:String,
    rating:Number,

})
const Product=mongoose.model("Product",productSchema)
module.exports=Product;
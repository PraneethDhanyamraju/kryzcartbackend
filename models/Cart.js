const mongoose=require("mongoose")
const cartSchema=mongoose.Schema({
    id:Number,
    category:String,
    brand: String,
    image: String,
    description: String,
    price:Number,
    discount:String,
    rating:Number,
    quantity:Number

})
const Cart=mongoose.model("Cart",cartSchema)
module.exports=Cart;
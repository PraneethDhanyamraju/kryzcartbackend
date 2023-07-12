const express=require("express")
const router=express.Router();
const Cart=require("../models/Cart")
router.get("/cart",(req,res)=>{
    Cart.find().then((products)=>{
        if(products.length>0) 
            res.json(products)
      else
      res.status(500).send("Error getting products");
          
    }).catch((err)=>{
        console.log(err)
    })  
})

router.post("/cart",(req,res)=>{
    const newCart=Cart(req.body.data);
    console.log(newCart)
    newCart.save().then((data)=>{
        res.status(200).send("Saved a product"+data);
    }).catch((err)=>{
        res.status(500).send("Failed to save a product");
      }) 
 })

 router.get("/cart/:id",(req,res)=>{
    Cart.find({"id":req.params.id}).then((products)=>{
        if(products.length>0) 
        res.json(products)
        else
        res.status(500).send("Error getting product for id "+req.params.id);
          
    }).catch((err)=>{
     console.log(err)   
    })
})

router.get("/cart/increment/:id",(req,res)=>{
    Cart.updateOne({id:req.params.id},  [
        {
          $set: {
            quantity: { $add: ["$quantity", 1] },
            price: { $add: ["$price", { $divide: ["$price", "$quantity"] }] }
          }
        }
      ])
      .then(result => {
        res.status(200).send("Success ")
    })
      .catch(error => {
        console.error(error);
      });

})
router.get("/cart/decrement/:id",(req,res)=>{
    Cart.updateOne({id:req.params.id}, 
    [
      {
        $set: {
          price: {
            $subtract: [
              "$price", // Original price
              { $divide: ["$price", "$quantity"] } // Divide price by quantity and subtract
            ]
          },
          quantity: { $subtract: ["$quantity", 1] } // Decrease quantity by 1
        }
      }
    ]).then(result => {
        res.status(200).send("Success ")
    })
      .catch(error => {
        console.error(error);
      });

})
router.get("/cart/remove/:id",(req,res)=>{
    Cart.deleteOne({id:req.params.id}).then(result => {
        res.status(200).send("Success ")
    })
      .catch(error => {
        console.error(error);
      });

})

router.get("/removeall",(req,res)=>{
    Cart.deleteMany( {id:{$gt:0}} ).then(result => {
        res.status(200).send("Success ",result)
    })
      .catch(error => {
        console.error(error);
      });

})
module.exports=router;
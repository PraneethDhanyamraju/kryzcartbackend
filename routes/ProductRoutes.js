const express=require("express")
const router=express.Router();
const Product=require("../models/Product")
router.get("/products",(req,res)=>{
    Product.find().then((products)=>{
        if(products.length>0) 
            res.json(products)
      else
      res.status(500).send("Error getting products");
          
    }).catch((err)=>{
        console.log(err)
    })  
})
router.get("/products/:category",(req,res)=>{
    Product.find({"category":req.params.category}).then((products)=>{
        if(products.length>0) 
        res.json(products)
        else
        res.status(500).send("Error getting products named "+req.params.category);
          
    }).catch((err)=>{
     console.log(err)   
    })
})

router.get("/products/product/:id",(req,res)=>{
  Product.find({"id":req.params.id}).then((products)=>{
        if(products.length>0) 
        res.json(products)
        else
        res.status(500).send("Error getting products named "+req.params.id);
          
    }).catch((err)=>{
     console.log(err)   
    })
})

module.exports=router;
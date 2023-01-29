const express = require('express');
const { execMap } = require('nodemon/lib/config/defaults');
const router = express.Router();
// importowanie schematów
const Product = require('../models/Product');
const { verifyTokenAndAdmin } = require('./verifyToken');

// zwraca wszystkie posty
// router.get('/', async (req, res) =>{
//     try{
//         const products = await Product.find();
//         res.json(products);
//     }catch(err){
//        res.json({message: err}); 
//     }
// });

// uzywamy post bo chcemy coś wrzucić do bazy danych

router.post('/', verifyTokenAndAdmin, async (req, res)=>{
    const product = new Product({
        product_name: req.body.product_name,
        description: req.body.description,
        price: req.body.price,
        matter: req.body.matter,
        assay: req.body.assay,
        size: req.body.size,
        brand: req.body.brand,
        category: req.body.category,
        product_name: req.body.product_name,
        net_price: req.body.net_price,
        gross_price: req.body.gross_price,
        weight: req.body.weight,
        img: req.body.img,
        vat: req.body.vat,
        short_description: req.body.short_description
    });

// zapisywanie w bazie danych
    try{
    const saveedProduct = await product.save();
    res.json(saveedProduct);
    } catch (err){
        res.json({message: err});
    }
});

//Pobiernie jednego produktu

router.get('/:productId', async (req, res)=>{
    try{
    const product = await Product.findById(req.params.productId)
    
    res.json(product)
    } catch(err){
        res.json({message: err});
    }
});


//Usuwanie

router.delete('/:productId', verifyTokenAndAdmin, async (req,res)=>{
    try{
    const removeProduct =  await Product.remove({_id: req.params.productId});
    res.json(removeProduct);    
    } catch(err){
        res.json({message: err});
    }
});

//Aktualizacja

router.patch('/:productId', verifyTokenAndAdmin, async (req,res)=>{
    try{
        const updateedProduct = await Product.updateMany(
            {_id: req.params.productId},
            {$set: {description: req.body.description,
                    price: req.body.price,
                    matter: req.body.matter,
                    assay: req.body.assay,
                    size: req.body.size,
                    brand: req.body.brand,
                    sex: req.body.sex,
                    img: req.body.img,
                    quantity: req.body.quantity,
                    category: req.body.category,
                    product_name: req.body.product_name,
                    net_price: req.body.net_price,
                    gross_price: req.body.gross_price,
                    weight: req.body.weight,
                    short_description: req.body.short_description
            }},            
        );
        res.json(updateedProduct);
    } catch(err){
        res.json({message: err});
    }
})

// Pobiernie nowych produktów i produktów według kategorii 

router.get('/', async (req, res)=>{
    
    const new_product = req.query.new;
    const product_by_category = req.query.category;

    try{
        let products;

        if(new_product){
            products = await Product.find().sort({createdAt: -1}).limit(5);
        } else if(product_by_category){
            products = await Product.find({
                category:{
                $in: [product_by_category],
            },
        })
        }else{
            products = await Product.find();
        }
    
    res.json(products)
    } catch(err){
        res.json({message: err});
    }
});


module.exports = router;
const express = require('express');
const { execMap } = require('nodemon/lib/config/defaults');
const router = express.Router();
// importowanie schematów
const Product = require('../models/Product');

// zwraca wszystkie posty
router.get('/', async (req, res) =>{
    try{
        const products = await Product.find();
        res.json(products);
    }catch(err){
       res.json({message: err}); 
    }
});

// uzywamy post bo chcemy coś wrzucić do bazy danych

router.post('/', async (req, res)=>{
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        matter: req.body.matter,
        assay: req.body.assay,
        size: req.body.size,
        brand: req.body.brand,
        category: req.body.category,
        // img: req.body.img
    });

// zapisywanie w bazie danych
    try{
    const saveedProduct = await product.save();
    res.json(saveedProduct);
    } catch (err){
        res.json({message: err});
    }
});

//Zwraca jeden, konkretny post

router.get('/:productId', async (req, res)=>{
    try{
    const product = await Product.findById(req.params.productId)
    res.json(product)
    } catch(err){
        res.json({message: err});
    }
});

//Usuwanie

router.delete('/:productId', async (req,res)=>{
    try{
    const removeProduct =  await Product.remove({_id: req.params.productId});
    res.json(removeProduct);    
    } catch(err){
        res.json({message: err});
    }
});

//Aktualizacja

router.patch('/:productId',async (req,res)=>{
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
            }},            
        );
        res.json(updateedProduct);
    } catch(err){
        res.json({message: err});
    }
})

module.exports = router;
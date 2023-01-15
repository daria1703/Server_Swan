const express = require('express');
const router = express.Router();
// importowanie schematów
const Cart = require('../models/Cart');

// zwraca koszyk użytkownika
router.get('/find/:userId', async (req, res) =>{
    try{
        const cart = await Cart.findOne({userId: req.params.userId});
        res.json(cart);
    }catch(err){
       res.json({message: err}); 
    }
});

router.get('/', async (req, res) =>{
    try{
        const carts = await Cart.find();
        res.json(carts);
    }catch(err){
       res.json({message: err}); 
    }
});

// uzywamy post bo chcemy coś wrzucić do bazy danych

router.post('/', async (req, res)=>{
    const cart = new Cart(req.body);

// zapisywanie w bazie danych
    try{
    const saveedCart = await cart.save();
    res.json(saveedCart);
    } catch (err){
        res.json({message: err});
    }
});

//Pobiernie jednego produktu

router.get('/:cartId', async (req, res)=>{
    try{
    const cart = await Cart.findById(req.params.cartId)
    
    res.json(cart)
    } catch(err){
        res.json({message: err});
    }
});

//Usuwanie

router.delete('/:cartId', async (req,res)=>{
    try{
    const removeCart =  await Cart.remove({_id: req.params.cartId});
    res.json(removeCart);    
    } catch(err){
        res.json({message: err});
    }
});

//Aktualizacja

router.patch('/:cartId',async (req,res)=>{
    try{
        const updateedCart = await Cart.updateMany(
            {_id: req.params.cartId},
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
                    weight: req.body.weight
            }},            
        );
        res.json(updateedCart);
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
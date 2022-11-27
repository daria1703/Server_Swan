const express = require('express');
const { execMap } = require('nodemon/lib/config/defaults');
const { regexpToText } = require('nodemon/lib/utils');
const router = express.Router();
// importowanie schematów
const Order = require('../models/Order');

// zwraca wszystkie posty
router.get('/', async (req, res) =>{
    try{
        const orders = await Order.find();
        res.json(orders);
    }catch(err){
       res.json({message: err});
    }
});

// uzywamy post bo chcemy coś wrzucić do bazy danych

router.post('/', async (req, res)=>{
    const order = new Order({
        date_of_order: req.body.date_of_order,
        isAccepted: req.body.isAccepted,
        isCompleted: req.body.isCompleted,
        isVoucher: req.body.isVoucher
    });

// zapisywanie w bazie danych
    try{
    const saveedOrder = await order.save();
    res.json(saveedOrder);
    } catch (err){
        res.json({message: err});
    }
});

//Zwraca jeden, konkretny post

router.get('/:orderId', async (req, res)=>{
    try{
    const order = await Order.findById(req.params.orderId)
    res.json(order)
    } catch(err){
        res.json({message: err});
    }
});

//Usuwanie

router.delete('/:orderId', async (req,res)=>{
    try{
    const removeOrder =  await Order.remove({_id: req.params.orderId});
    res.json(removeOrder);
    } catch(err){
        res.json({message: err});
    }
});

//Aktualizacja

router.patch('/:orderId',async (req,res)=>{
    try{
        const updateedOrder = await Order.updateMany(
            {_id: req.params.orderId},
            {$set: {date_of_order: req.body.date_of_order,
                isAccepted: req.body.isAccepted,
                isCompleted: req.body.isCompleted,
                isVoucher: req.body.isVoucher
            }},
        );
        res.json(updateedOrder);
    } catch(err){
        res.json({message: err});
    }
})

module.exports = router;

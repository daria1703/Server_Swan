const express = require('express');
const { execMap } = require('nodemon/lib/config/defaults');
const { regexpToText } = require('nodemon/lib/utils');
const router = express.Router();
// importowanie schematów
const Voucher = require('../models/Voucher');

// zwraca wszystkie posty
router.get('/', async (req, res) =>{
    try{
        const vouchers = await Voucher.find();
        res.json(vouchers);
    }catch(err){
       res.json({message: err});
    }
});

// uzywamy post bo chcemy coś wrzucić do bazy danych

router.post('/', async (req, res)=>{
    const voucher = new Voucher({
        discount: req.body.discount,
        voucher_name: req.body.voucher_name,
        voucher_code: req.body.voucher_code
    });

// zapisywanie w bazie danych
    try{
    const saveedVoucher = await voucher.save();
    res.json(saveedVoucher);
    } catch (err){
        res.json({message: err});
    }
});

//Zwraca jeden, konkretny post

router.get('/:voucherId', async (req, res)=>{
    try{
    const voucher = await Order.findById(req.params.voucherId)
    res.json(voucher)
    } catch(err){
        res.json({message: err});
    }
});

//Usuwanie

router.delete('/:voucherId', async (req,res)=>{
    try{
    const removeVoucher =  await Voucher.remove({_id: req.params.voucherId});
    res.json(removeVoucher);
    } catch(err){
        res.json({message: err});
    }
});

//Aktualizacja

router.patch('/:voucherId',async (req,res)=>{
    try{
        const updateedVoucher = await Voucher.updateMany(
            {_id: req.params.voucherId},
            {$set: {discount: req.body.discount,
        voucher_name: req.body.voucher_name,
        voucher_code: req.body.voucher_code
            }},
        );
        res.json(updateedVoucher);
    } catch(err){
        res.json({message: err});
    }
})

module.exports = router;

const express = require('express');
const router = express.Router();

const Address = require('../models/Address');

router.get('/', async (req, res) =>{
    try{
        const addresses = await Address.find();
        res.json(addresses);
    }catch(err){
       res.json({message: err});
    }
});


router.post('/', async (req, res)=>{
    const address = new Address({
        locality: req.body.locality,
        zipCode: req.body.zipCodee,
        street: req.body.street,
        houseNumber: req.body.houseNumber,
        apartment_number: req.body.apartment_number
    });

    try{
    const saveedAddress = await address.save();
    res.json(saveedAddress);
    } catch (err){
        res.json({message: err});
    }
});


router.get('/:addressId', async (req, res)=>{
    try{
    const address = await Address.findById(req.params.addressId)
    res.json(address)
    } catch(err){
        res.json({message: err});
    }
});

router.delete('/:addressId', async (req,res)=>{
    try{
    const removeAddress =  await Address.remove({_id: req.params.addressId});
    res.json(removeAddress);
    } catch(err){
        res.json({message: err});
    }
});

router.patch('/:addressId',async (req,res)=>{
    try{
        const updateedAddress = await Address.updateMany(
            {_id: req.params.addressId},
            {$set: {locality: req.body.locality,
                zipCode: req.body.zipCodee,
                street: req.body.street,
                houseNumber: req.body.houseNumber,
                apartment_number: req.body.apartment_number
            }},
        );
        res.json(updateedAddress);
    } catch(err){
        res.json({message: err});
    }
})

module.exports = router;

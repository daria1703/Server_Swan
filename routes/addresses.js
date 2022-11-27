const express = require('express');
const { execMap } = require('nodemon/lib/config/defaults');
const { regexpToText } = require('nodemon/lib/utils');
const User = require('../models/User');
const router = express.Router();
// importowanie schematów
const Address = require('../models/Address');

// zwraca wszystkie posty
router.get('/', async (req, res) =>{
    try{
        const addresses = await Address.find();
        res.json(addresses);
    }catch(err){
       res.json({message: err});
    }
});

// uzywamy post bo chcemy coś wrzucić do bazy danych

router.post('/', async (req, res)=>{
    const address = new Address({
        locality: req.body.locality,
        zipCode: req.body.zipCodee,
        street: req.body.street,
        houseNumber: req.body.houseNumber,
        apartment_number: req.body.apartment_number
    });

// zapisywanie w bazie danych
    try{
    const saveedAddress = await address.save();
    res.json(saveedAddress);
    } catch (err){
        res.json({message: err});
    }
});

//Zwraca jeden, konkretny post

router.get('/:addressId', async (req, res)=>{
    try{
    const address = await Address.findById(req.params.addressId)
    res.json(address)
    } catch(err){
        res.json({message: err});
    }
});

//Usuwanie

router.delete('/:addressId', async (req,res)=>{
    try{
    const removeAddress =  await Address.remove({_id: req.params.addressId});
    res.json(removeAddress);
    } catch(err){
        res.json({message: err});
    }
});

//Aktualizacja

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

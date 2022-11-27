const express = require('express');
const { execMap } = require('nodemon/lib/config/defaults');
const { regexpToText } = require('nodemon/lib/utils');
const User = require('../models/User');
const router = express.Router();
// importowanie schematów
const Wish_list = require('../models/Wish_list');

// zwraca wszystkie posty
router.get('/', async (req, res) =>{
    try{
        const wish_lists = await Wish_list.find();
        res.json(wish_lists);
    }catch(err){
       res.json({message: err});
    }
});

// uzywamy post bo chcemy coś wrzucić do bazy danych

router.post('/', async (req, res)=>{
    const wish_list = new Wish_list({
        wish_list_name: req.body.wish_list_name
    });

// zapisywanie w bazie danych
    try{
    const saveedWish_list = await wish_list.save();
    res.json(saveedWish_list);
    } catch (err){
        res.json({message: err});
    }
});

//Zwraca jeden, konkretny post

router.get('/:wish_listId', async (req, res)=>{
    try{
    const wish_list = await Wish_list.findById(req.params.wish_listId)
    res.json(wish_list)
    } catch(err){
        res.json({message: err});
    }
});

//Usuwanie

router.delete('/:wish_listId', async (req,res)=>{
    try{
    const removeWish_list =  await Wish_list.remove({_id: req.params.wish_listId});
    res.json(removeWish_list);
    } catch(err){
        res.json({message: err});
    }
});

//Aktualizacja

router.patch('/:wish_listId',async (req,res)=>{
    try{
        const updateedWish_list = await Wish_list.updateMany(
            {_id: req.params.wish_listId},
            {$set: {wish_list_name: req.body.wish_list_name
            }},
        );
        res.json(updateedWish_list);
    } catch(err){
        res.json({message: err});
    }
})

module.exports = router;

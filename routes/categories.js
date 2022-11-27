const express = require('express');
const { execMap } = require('nodemon/lib/config/defaults');
const { regexpToText } = require('nodemon/lib/utils');
const router = express.Router();
// importowanie schematów
const Category = require('../models/Category');

// zwraca wszystkie posty
router.get('/', async (req, res) =>{
    try{
        const categories = await Category.find();
        res.json(categories);
    }catch(err){
       res.json({message: err});
    }
});

// uzywamy post bo chcemy coś wrzucić do bazy danych

router.post('/', async (req, res)=>{
    const category = new Category({
        categoryName: req.body.categoryNamey,
        subcategoryName: req.body.subcategoryName
    });

// zapisywanie w bazie danych
    try{
    const saveedCategory = await category.save();
    res.json(saveedCategory);
    } catch (err){
        res.json({message: err});
    }
});

//Zwraca jeden, konkretny post

router.get('/:categoryId', async (req, res)=>{
    try{
    const category = await Category.findById(req.params.categoryId)
    res.json(category)
    } catch(err){
        res.json({message: err});
    }
});

//Usuwanie

router.delete('/:categoryId', async (req,res)=>{
    try{
    const removeCategory =  await Category.remove({_id: req.params.categoryId});
    res.json(removeCategory);
    } catch(err){
        res.json({message: err});
    }
});

//Aktualizacja

router.patch('/:categoryId',async (req,res)=>{
    try{
        const updateedCategory = await Category.updateMany(
            {_id: req.params.categoryId},
            {$set: {lcategoryName: req.body.categoryNamey,
                subcategoryName: req.body.subcategoryName
            }},
        );
        res.json(updateedCategory);
    } catch(err){
        res.json({message: err});
    }
})

module.exports = router;

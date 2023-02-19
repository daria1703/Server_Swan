const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.get('/', async (req, res) =>{
    try{
        const categories = await Category.find();
        res.json(categories);
    }catch(err){
       res.json({message: err});
    }
});

router.post('/', async (req, res)=>{
    const category = new Category({
        categoryName: req.body.categoryName,
        subcategoryName: req.body.subcategoryName
    });

    try{
    const saveedCategory = await category.save();
    res.json(saveedCategory);
    } catch (err){
        res.json({message: err});
    }
});


router.get('/:categoryId', async (req, res)=>{
    try{
    const category = await Category.findById(req.params.categoryId)
    res.json(category)
    } catch(err){
        res.json({message: err});
    }
});

router.delete('/:categoryId', async (req,res)=>{
    try{
    const removeCategory =  await Category.remove({_id: req.params.categoryId});
    res.json(removeCategory);
    } catch(err){
        res.json({message: err});
    }
});


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

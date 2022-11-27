const express = require('express');
const { execMap } = require('nodemon/lib/config/defaults');
const { regexpToText } = require('nodemon/lib/utils');
const User = require('../models/User');
const router = express.Router();
// importowanie schematów
const Comment = require('../models/Comment');

// zwraca wszystkie posty
router.get('/', async (req, res) =>{
    try{
        const comments = await Comment.find();
        res.json(comments);
    }catch(err){
       res.json({message: err});
    }
});

// uzywamy post bo chcemy coś wrzucić do bazy danych

router.post('/', async (req, res)=>{
    const comment = new Comment({
        comment_content: req.body.comment_content
    });

// zapisywanie w bazie danych
    try{
    const saveedComment = await comment.save();
    res.json(saveedComment);
    } catch (err){
        res.json({message: err});
    }
});

//Zwraca jeden, konkretny post

router.get('/:commentId', async (req, res)=>{
    try{
    const comment = await User.findById(req.params.commentId)
    res.json(comment)
    } catch(err){
        res.json({message: err});
    }
});

//Usuwanie

router.delete('/:commentId', async (req,res)=>{
    try{
    const removeComment =  await Comment.remove({_id: req.params.commentId});
    res.json(removeComment);
    } catch(err){
        res.json({message: err});
    }
});

//Aktualizacja

router.patch('/:commentId',async (req,res)=>{
    try{
        const updateedComment = await Comment.updateMany(
            {_id: req.params.commentId},
            {$set: {comment_content: req.body.comment_content
            }},
        );
        res.json(updateedComment);
    } catch(err){
        res.json({message: err});
    }
})

module.exports = router;

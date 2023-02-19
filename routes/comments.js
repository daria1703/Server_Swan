const express = require('express');
const User = require('../models/User');
const router = express.Router();
const Comment = require('../models/Comment');

router.get('/', async (req, res) =>{
    try{
        const comments = await Comment.find();
        res.json(comments);
    }catch(err){
       res.json({message: err});
    }
});


router.post('/', async (req, res)=>{
    const comment = new Comment({
        comment_content: req.body.comment_content
    });

    try{
    const saveedComment = await comment.save();
    res.json(saveedComment);
    } catch (err){
        res.json({message: err});
    }
});


router.get('/:commentId', async (req, res)=>{
    try{
    const comment = await User.findById(req.params.commentId)
    res.json(comment)
    } catch(err){
        res.json({message: err});
    }
});


router.delete('/:commentId', async (req,res)=>{
    try{
    const removeComment =  await Comment.remove({_id: req.params.commentId});
    res.json(removeComment);
    } catch(err){
        res.json({message: err});
    }
});


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

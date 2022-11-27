const express = require('express');
const { execMap } = require('nodemon/lib/config/defaults');
const { regexpToText } = require('nodemon/lib/utils');
const User = require('../models/User');
const router = express.Router();
// importowanie schematów
const Product = require('../models/User');

// zwraca wszystkie posty
router.get('/', async (req, res) =>{
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
       res.json({message: err});
    }
});

// uzywamy post bo chcemy coś wrzucić do bazy danych

router.post('/', async (req, res)=>{
    const {name, lastName, email, password} = req.body

    User.findOne({email: email}, (err, user) =>{
        
    })

    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        sex: req.body.sex,
        isLogged: req.body.isLogged
    });

// zapisywanie w bazie danych
    try{
    const saveedUser = await user.save();
    res.json(saveedUser);
    } catch (err){
        res.json({message: err});
    }
});

// Zwraca jeden, konkretny post

router.get('/:userId', async (req, res)=>{
    try{
    const user = await User.findById(req.params.userId)
    res.json(user)
    } catch(err){
        res.json({message: err});
    }
});

// Usuwanie

router.delete('/:userId', async (req,res)=>{
    try{
    const removeUser =  await User.remove({_id: req.params.userId});
    res.json(removeUser);
    } catch(err){
        res.json({message: err});
    }
});

// Aktualizacja

router.patch('/:userId',async (req,res)=>{
    try{
        const updateedUser = await User.updateMany(
            {_id: req.params.userId},
            {$set: {name: req.body.name,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                    sex: req.body.sex,
                    img: req.body.img,
                    isLogged: req.body.isLogged
            }},
        );
        res.json(updateedUser);
    } catch(err){
        res.json({message: err});
    }
})



module.exports = router;


//Login

// router.post(
//     "/login",
//     asyncHandler(async (req,res)=>{
//         const {email, password} = req.body;
//         const user = await User.findOne({email});

//         if (user && (await user.marchPassword(password))){
//             res.json({
//                 _id: user._id,
//                 name: user.name,
//                 lastName: user.lastName,
//                 email: user.email,
//                 token: null,
//                 createdAt: user.createdAt
//             });
//         } else {
//             res.status(401)
//             throw new Error("Invalid Email or Password")
//         }

//     })
// )


// export default router;
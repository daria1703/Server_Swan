const express = require('express');
const { execMap } = require('nodemon/lib/config/defaults');
const { regexpToText } = require('nodemon/lib/utils');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
var nodemailer = require('nodemailer');

// importowanie schematów
const Product = require('../models/User');

const JWT_SECRET = "aweszxdrtfcygvuhbijnokm"

router.use(express.urlencoded({ extended: false }))

// zwraca wszystkie posty
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});

// uzywamy post bo chcemy coś wrzucić do bazy danych

router.post('/register', async (req, res) => {
    const { name, lastName, password, email, reEnteredPassword, sex } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10)
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User already registered" })
        } else {
            const user = new User({
                name,
                lastName,
                email,
                password: encryptedPassword,
                reEnteredPassword: encryptedPassword
            })
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Successfully Registered" })
                }
            })
        }

    })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: "User not registered" });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET);
        if (res.status(201)) {
            return res.json({ status: "ok", data: token });
        } else {
            return res.json({ status: "error" });
        }
    }
    res.json({ status: "error", error: "Invalid password" });
})

router.post('/userData', async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const userEmail = user.email;
        User.findOne({ email: userEmail })
            .then((data) => {
                res.send({ status: "Ok", data: data });
            })
            .catch((error) => {
                res.send({ status: "error", data: error });
            });
    } catch (error) { }
})

// router.post("/login", async (req, res) => {
//     const {email, password} = req.body
//     User.findOne({email: email}, async (err, user) => {
//         if(user){
//             if(password === user.password){
//                 res.send({message: "Login Successfull", user: user})
//             } else {
//                 res.send({message: "Password didn't match"})
//             }
//         } else {
//             res.send({message: "User not registered"})
//         }
//         if(await bcrypt.compare(password, user.password)){
//             const token = jwt.sign({}, JWT_SECRET);
//                 if(res.status(201)){
//                     return res.json({status: "ok", data: token});
//                 }else {
//                     return res.json({status:"error"});
//                 }
//         }
//     })
// })

// router.post('/', async (req, res)=>{
//     const user = new User({
//         name: req.body.name,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         password: req.body.password,
//         img: req.body.img,
//         sex: req.body.sex,
//     });

// // zapisywanie w bazie danych
//     try{
//     const saveedUser = await user.save();
//     res.json(saveedUser);
//     } catch (err){
//         res.json({message: err});
//     }
// });

// Zwraca jeden, konkretny post

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        res.json(user)
    } catch (err) {
        res.json({ message: err });
    }
});

// Usuwanie

router.delete('/:userId', async (req, res) => {
    try {
        const removeUser = await User.remove({ _id: req.params.userId });
        res.json(removeUser);
    } catch (err) {
        res.json({ message: err });
    }
});

// Aktualizacja

router.patch('/:userId', async (req, res) => {
    try {
        const updateedUser = await User.updateMany(
            { _id: req.params.userId },
            {
                $set: {
                    name: req.body.name,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                    sex: req.body.sex,
                    img: req.body.img,
                    isLogged: req.body.isLogged,
                    reEnteredPassword: req.body.reEnteredPassword
                }
            },
        );
        res.json(updateedUser);
    } catch (err) {
        res.json({ message: err });
    }
})

router.post("/forgetPassword", async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.json({ status: "User Not Exists" });
        }
        const secret = JWT_SECRET + oldUser.password;
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
            expiresIn: "5m",
        });
        const link = `http://localhost:3000/users/resetPassword/${oldUser._id}/${token}`;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'daria.citak1703@gmail.com',
              pass: 'hnlggdkuwlpyzmpd'
            }
          });
          
          var mailOptions = {
            from: 'youremail@gmail.com',
            to: 'daria.citak@webimpuls.pl',
            subject: 'Password Reset',
            text: link,
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        console.log(link)
    } catch (error) { }
});

router.get("/resetPassword/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    console.log(req.params);
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
        const verify = jwt.verify(token, secret);
        res.render("index", { email: verify.email, status: "Not Verified" });
    } catch (error) {
        console.log(error);
        res.send("Not Verified");
    }
});

router.post("/resetPassword/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: "User Not Exsist" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
        const verify = jwt.verify(token, secret);
        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    password: encryptedPassword,
                },
            }
        );
        // res.json({ status: "Password Updated" });
        res.render("index", { email: verify.email, status: "verified" });
    } catch (error) {
        console.log(error);
        res.json({ status: "Something went wrong" });
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
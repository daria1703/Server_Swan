const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    lastName: req.body.lastName,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne(
            {
                email: req.body.email
            }
        );

        !user && res.status(401).json("Wrong User Name");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;
        
        originalPassword != inputPassword && 
            res.status(401).json("Wrong Password");

        const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        );
  
        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err);
    }

});


router.post('/userData', async (req, res) => {
  const { accessToken } = req.body.accessToken;
  try {
      const user = jwt.verify(accessToken, JWT_SEC,(err, res)=>{
          if(err){
              isLogged == false
              return "Token expired"
          }
          return res;
      });
      console.log(user);
      if(user == "Token expired"){
          return res.send({status: "error", data: "Token expired"});
      }
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

module.exports = router;
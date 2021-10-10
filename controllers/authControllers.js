const User = require('../models/authUsers')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const ErrorHandlers = (err)=>{
 
    let errors = {email:  " ", password : " "}
    // console.log(err.message,err.code);

    if(err.message==="Email Do not Exist")
    {
        errors.email ="Invalid Email"
    }
    if(err.message==="Incorrect Password")
    {
        errors.password = "Incorrect Password"
    }
  

    // USER DEFINED VALIDATION ERRORS

    if(err.message.includes("user validation failed"))
    {
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        });
           
        // console.log(errors.email);
        // console.log(errors.password);
       
    }
    return errors;
}

const maxAge = 3*24*60*60;
const createToken = (id)=>{

    return jwt.sign({id},'LIVEFEED',{
        expiresIn:maxAge,
    })
}

module.exports.signup_get = (req,res)=>{

    res.render('signup');
}



module.exports.signup_post = async (req, res)=>{
    const {email,password} = req.body;
    console.log({email,password});

    try{
         const user = await User.create({email,password})
         console.log(user);
         res.status(200).json(user._id);
    }catch(err){
        const errors = ErrorHandlers(err);
        res.status(400).json({errors});
        console.log(errors);
    }
}
module.exports.login_get = (req,res)=>{

    res.render('login');
}

module.exports.login_post = async (req,res)=>{
    
    const {email,password} = req.body;

    try{
      
        const user = await User.login(email,password);
        const token = createToken(user._id);
        res.cookie('auth_jwt',token,{httpOnly: true,maxAge: maxAge})
        res.status(201).json({user:user._id})
    }catch(err){
        const error = ErrorHandlers(err);

        console.log(error)
        res.status(400).json({error})
    }
    
}
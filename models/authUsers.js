const mongoose = require('mongoose');
const {isEmail} = require('validator')
const bcrypt = require('bcrypt');



const authUsersSchema = new mongoose.Schema({
    email: {
        type:String,
        required : [true,'email is required'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please Enter a valid Email']
    },

    password:{
        type:String,
        required:[true,'Please Enter a password'],
        minlength:[6,'Minimum Password Length Is 6 characters']
    },
})

authUsersSchema.pre('save',async function(next) {
  
    const salt = await bcrypt.genSalt();

    console.log(salt);

    this.password = await bcrypt.hash(this.password,salt);
    
    next();
})

authUsersSchema.statics.login = async function(email,password){

    const user = await this.findOne({email:email});

    if(user)
    {
        const auth = await bcrypt.compare(password,user.password)
        if(auth)
        {
            return user;
        }
        throw Error("Incorrect Password")
    }
    throw Error("Email Do not Exist")
}

authUsersSchema.post('save',function (doc,next){

    console.log('new document is saved',doc)
    next();
})


const User = mongoose.model('user',authUsersSchema)

module.exports = User;
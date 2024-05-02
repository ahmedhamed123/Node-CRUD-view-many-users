const mongoose =require('mongoose')
const validator = require('validator')

const userSchema =new mongoose.Schema({
    firstName:{
        type:String,
        Required:true,
        trim:true
    },
    lastName:{
        type:String,
        Required:true,
        trim:true
    },

    email :{
        type: String,
        required:true,
        trim: true,
        lowercase: true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is Invalid ')
            }
        }
    },
    age :{
        type: Number,
        default : 18,
        validate(val){
            if(val<=0){
                throw new Error("age must be positive number")
            }
        }
    },

    phone:{
        type: String,
        required:true,
        trim: true
    },
    gender:{
        type : String
    },
    


},{timestamps:true})

//------------------------------

const User =mongoose.model("User",userSchema)

module.exports=User
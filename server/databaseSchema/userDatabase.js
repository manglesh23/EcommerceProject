const mongoose=require('mongoose');
const bcrypt= require('bcrypt');
// const { use } = require('../auth-router/router');
const jwt=require('jsonwebtoken');

let sellerSchema=mongoose.Schema({
    sellerName:{
        require:true,
        type:String
    },
    sellerMobileNumber:{
        require:true,
        type:String
    },
    sellerLocation:{
        require:true,
        type:String
    }
});

let productSchema=mongoose.Schema({
    sellerMobileNumber:{
        type:String,
        require:true
    },
    productName:{
        type:String,
        require:true
    },
    productCost:{
        type:String,
        require:true
    },
    productCategory:{
        type:String,
        require:true
    }
})

let signUpSchema=mongoose.Schema({
    sellerMobileNumber:{
        require:true,
        type:String
    },
    sellerUserName:{
        require:true,
        type:String
    },
    password:{
        require:true,
        type:String
    }
});

signUpSchema.pre("save",async function(next){
    let user=this;
    console.log("this user is going to be added:-",user);
    if(!user.isModified("password")){
        return next();
    }
    try{
     let hashpassword= await bcrypt.hash(user.password,10);
     console.log("hashpassword:-",hashpassword);
     user.password=hashpassword;
     next();
    }catch(e){
     return{
        error:true,
        details:e
     }
    }
});

// signUpSchema.methods.generateToken=async function(){
//     try{
//         console.log("this from schema:-",this)
//     //   return jwt.sign()
//     }catch(e){
//         return{
//             error:true,
//             details:e
//         }
//     }

// }

let contactInformationSchema=mongoose.Schema({
    name:{
        require:true,
        type:String
    },
    mobileNumber:{
        require:true,
        type:String
    },
    city:{
        require:true,
        type:String
    },
    qualification:{
        require:true,
        type:String
    }
})

let sellerDatabaseCollection=new mongoose.model("sellerCollection",sellerSchema);
let productCollection=new mongoose.model("productCollection",productSchema);
let signUpCollection=new mongoose.model("signUpCollection",signUpSchema);
let contactCollection=new mongoose.model("contactCollection",contactInformationSchema);
module.exports={sellerDatabaseCollection,productCollection,signUpCollection,contactCollection};
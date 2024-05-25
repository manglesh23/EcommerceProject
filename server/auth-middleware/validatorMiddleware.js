const validator= (schema)=>async(req,res,next)=>{
    try{
     let parseBody=  await schema.parseAsync(req.body);
     req.body=parseBody;
     next();
    }catch(e){
        console.log("Validation Fail");
        res.status(400).json({message:e.errors[0].message});
    }
}

module.exports={validator};
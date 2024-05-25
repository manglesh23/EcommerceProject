const {z}=require('zod');

let sellerSchema=z.object({
    sellerName:z.string({required_error:"Seller Name is Required"}).trim().min(3,{message:"Name must be alteast of 3 Char"}).max(250,{message:"max 250 for Name"}),
    sellerMobileNumber:z.string({required_error:"Seller Mobile Number"}).trim().length(10),
    sellerLocation:z.string({required_error:"Seller Lcoation"}).trim()
});

let productSchema=z.object({
    sellerMobileNumber:z.string({required_error:"Required"}).trim().length(10),
    productName:z.string({required_error:"product name chaiye"}).trim().min(3,{message:"must be 3 char"}).max(250,{message:"250 se jyada nahi"}),
    productCost:z.string({required_error:"product cost"}).trim(),
    productCategory:z.string({required_error:"Product Category"}).trim().min(3,{message:"Product Category Min 3"})
});

module.exports={sellerSchema,productSchema};
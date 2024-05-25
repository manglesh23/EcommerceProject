let express=require('express');
let router=express.Router();
const {home,registerSeller,addProduct,searchProduct,signUp,login, updatePassword, sendSMS, cronSchedule, contactInformation, integrateBankVerificationApi}=require('../auth-controller/controller');
const {sellerSchema,productSchema}=require('../zodValidator/zodValidator');
const{validator}=require('../auth-middleware/validatorMiddleware');

console.log("Router");
router.route("/").get(home);
router.route("/registerSeller").post(validator(sellerSchema),registerSeller);
router.route("/addProduct").post(validator(productSchema),addProduct);
router.route("/searchProduct").get(searchProduct);
router.route("/signUp").post(signUp);
router.route("/login").post(login);
router.route("/updatePassword").post(updatePassword);
router.route("/sendSMS").post(sendSMS);
router.route("/cronSchedule").get(cronSchedule);
router.route("/contact").post(contactInformation);
router.route("/bankverification").post(integrateBankVerificationApi);

module.exports=router;
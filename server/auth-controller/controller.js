// const { consumers } = require("nodemailer/lib/xoauth2");
require('dotenv').config();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const {
  sellerDatabaseCollection,
  productCollection,
  signUpCollection,
  contactCollection,
} = require("../databaseSchema/userDatabase");
const bcrypt = require("bcrypt");
const twilio = require("twilio");
const cron = require("node-cron");

let home = async (req, res) => {
  try {
    res.status(200).json({ message: "Home page for E-commerce" });
  } catch (e) {
    return {
      error: true,
      details: e,
    };
  }
};

const registerSeller = async (req, res) => {
  try {
    res.status(200).json({ message: req.body });
    const { sellerName, sellerMobileNumber, sellerLocation } = req.body;
    // console.log(req.body);
    let checkIfExist = await sellerDatabaseCollection.find({
      sellerMobileNumber: sellerMobileNumber,
    });
    console.log("Check:-", checkIfExist);
    if (checkIfExist.length > 0) {
      console.log("Inside IF");
      return res.status(200).json({ message: "Already" });
    } else {
      console.log("Inside Else");
      let sellerAdded = await sellerDatabaseCollection.create({
        sellerName,
        sellerMobileNumber,
        sellerLocation,
      });
      res.status(200).json({ message: sellerAdded });
    }
  } catch (e) {
    return {
      error: true,
      details: e,
    };
  }
};

const addProduct = async (req, res) => {
  try {
    let { sellerMobileNumber, productName, productCost, productCategory } =
      req.body;
    let userExist = await sellerDatabaseCollection.findOne({
      sellerMobileNumber,
    });

    if (userExist) {
      let addProduct = await productCollection.create({
        sellerMobileNumber,
        productCost,
        productName,
        productCategory,
      });
      console.log("add Product:-", addProduct);
      res
        .status(200)
        .json({ message: addProduct, sellerName: userExist.sellerName });
    } else {
      res.status(200).json({
        message: `Seller Not Registered in sellerCollection ${sellerMobileNumber}`,
      });
    }
  } catch (e) {
    return {
      error: true,
      details: e,
    };
  }
};

const searchProduct = async (req, res) => {
  try {
    const { productCategory, productName } = req.body;
    if (!productCategory) {
      return res.status(200).json({ message: "Product Category Daalo" });
    }
    let findProduct = await productCollection.find({
      productCategory: "Mobile",
    });
    console.log("find:-", findProduct);
    if (findProduct.length) {
      res
        .status(200)
        .json({ message: findProduct, totalResultFound: findProduct.length });
    } else {
      res.status(200).json({ message: "Not Available for now" });
    }
  } catch (e) {
    return {
      error: true,
      details: e,
    };
  }
};

const signUp = async (req, res) => {
  try {
    const { sellerMobileNumber, sellerUserName, password } = req.body;
    let checkIfExist = await signUpCollection.findOne({
      sellerMobileNumber: sellerMobileNumber,
    });
    if (checkIfExist) {
      return res.status(200).json({ message: "Already Exist" });
    }
    let adduser = await signUpCollection.create({
      sellerMobileNumber,
      sellerUserName,
      password,
    });
    res.status(201).json({ message: adduser });
  } catch (e) {
    res.status(401).json({ message: "Unauthorized User" });
    // return{
    //     error:true,
    //     details:e
    // }
  }
};

const login = async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;

    let findInDatabase = await signUpCollection.findOne({
      sellerMobileNumber: mobileNumber,
    });

    console.log(findInDatabase);
    if (findInDatabase) {
      let comparePassword = await bcrypt.compare(
        password,
        findInDatabase.password
      );
      if (comparePassword) {
        const payload = {
          userId: findInDatabase._id,
          username: findInDatabase.sellerUserName,
        };

        let token = jwt.sign(payload, "tokenSecreteKey", { expiresIn: "1h" });  //token Generated
        res.status(200).json({
          username: `Welcome ${findInDatabase.sellerUserName}`,
          message: "Login Successfully",
          token: token,
        });
      } else {
        res.status(404).json({ message: "Incorrect Password" });
      }
    } else {
      res.status(404).json({ message: "Not Exist" });
    }
  } catch (e) {
    res.status(404).json({ message: "Internal Sever Error" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { mobileNumber, currentpassword, newpassword } = req.body;
    let findUser = await signUpCollection.findOne({
      sellerMobileNumber: mobileNumber,
    });

    if (findUser) {
      findUser.password = newpassword;
      await findUser.save();
      res.status(200).json({ message: "Password Updated Successfully" });
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (e) {
    res.status(404).json({ message: "Internal Server Error" });
  }
};

const sendSMS = async (req, res) => {
  const { to, text } = req.body;

  const accountSid = process.env.ACCOUT_SID;
  const authToken = process.env.AUTH_TOKEN_FOR_TIWILIO;
  const twilioPhoneNumber = process.env.TIWILIO_PHONE;
  const client = twilio(accountSid, authToken);

  try {
    await client.messages.create({
      body: text,
      from: twilioPhoneNumber,
      to: to,
    });

    res.status(200).json({ message: "SMS sent successfully" });
  } catch (e) {
    res.status(404).json({ message: "Failed to Send SMS" });
    console.log(e);
  }
};

let count = 0;
cron.schedule("*/1 * * * *", () => {
  count++;
  console.log("Running scheduled task every 1 minutes", count);
  //   res.status(200).json({ message: count });
});

const cronSchedule = async (req, res) => {
  try {
    res.status(200).json({ message: count });
  } catch (e) {
    return {
      error: true,
      details: e,
    };
  }
};

const contactInformation = async (req, res) => {
  try {
    //  res.status(200).json({message:"Saved Successfully"});
    const { name, mobileNumber, city, qualification } = req.body;
    let checkIfExist = await contactCollection.findOne({ mobileNumber });
    console.log("Contact Exist:-", checkIfExist);
    if (checkIfExist) {
      res.status(200).json({ message: "Already Exist" });
    } else {
      let passDetails = await contactCollection.create({
        name,
        mobileNumber,
        city,
        qualification,
      });
      res.status(200).json({ message: `Contact Saved For ${passDetails}` });
    }
  } catch (e) {
    res.status(404).json({ message: "Failed to save Information" });
  }
};

const integrateBankVerificationApi = async (req, res) => {
  try {
    let { accountNo, ifscCode } = req.body;
    // const axios = require("axios");
    let data = JSON.stringify({
      id_number: accountNo,
      ifsc: ifscCode,
      ifsc_details: true,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://kyc-api.surepass.io/api/v1/bank-verification/",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.AUTH_TOKEN,
      },
      data: data,
    };

    let response = await axios(config);
    console.log(response.data.data.full_name);
    res.status(200).json({ message: response.data.data.full_name });
  } catch (e) {
    return {
      error: true,
      details: e,
    };
  }
};

module.exports = {
  home,
  registerSeller,
  addProduct,
  searchProduct,
  signUp,
  login,
  updatePassword,
  sendSMS,
  cronSchedule,
  contactInformation,
  integrateBankVerificationApi,
};

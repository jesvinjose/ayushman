const express=require('express');
const contactDetailsRoute=express.Router();

const  { uploadSingleImage } = require("../uploadImageConfig");
const { uploadMultipleImages } = require("../uploadImageConfig");


const contactDetails=require('../controllers/contactDetails');

//adminlogin

contactDetailsRoute.post('/addDetails',uploadSingleImage,contactDetails.addContactDetails);
contactDetailsRoute.get("/getcontacts", contactDetails.getContactDetails);
contactDetailsRoute.delete("/deletecontact/:id",contactDetails.deleteContactDetails);
contactDetailsRoute.put("/updatecontacts/:id",uploadMultipleImages,contactDetails.updateContacts);

module.exports=contactDetailsRoute;
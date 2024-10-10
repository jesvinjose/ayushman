const express = require("express");
const treatmentRoute = express.Router();
const upload = require("../uploadImageConfig");
const treatmentController = require("../controllers/treatmentController");
const multer=require('multer');

treatmentRoute.post(
  "/addtreatment",
  upload.single("image"),
  treatmentController.addTreatment
);

// treatmentRoute.post(
//   "/addtreatment",
//   (req, res, next) => {
//     upload.single("image")(req, res, function (err) {
//       if (err instanceof multer.MulterError) {
//         console.error("Multer error:", err);
//         return res.status(500).send({ message: err.message });
//       } else if (err) {
//         console.error("Unknown error:", err);
//         return res.status(500).send({ message: err.message });
//       }
//       next();
//     });
//   },
//   treatmentController.addTreatment
// );

treatmentRoute.get("/gettreatments", treatmentController.getTreatments);

treatmentRoute.delete(
  "/deletetreatment/:id",
  treatmentController.deleteTreatment
);

treatmentRoute.put(
  "/updatetreatment/:id",
  upload.single("image"),
  treatmentController.updateTreatment
);

module.exports = treatmentRoute;

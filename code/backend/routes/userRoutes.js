const multer = require("multer");
const express = require("express");
const path = require("path");
const {
  registerController,
  loginController,
  authController,
  docController,
  deleteallnotificationController,
  getallnotificationController,
  getAllDoctorsControllers,
  appointmentController,
  getAllUserAppointments,
  getDocsController,
  downloadDocController,
  getImageController
} = require("../controllers/userC");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({ storage: storage });

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/getuserdata", authMiddleware, authController);

router.post("/registerdoc",imageUpload.single("docimage"),authMiddleware, docController);

router.get("/getalldoctorsu", authMiddleware, getAllDoctorsControllers);

router.post("/getappointment",upload.single("image"), authMiddleware, appointmentController);

router.post(
  "/getallnotification",
  authMiddleware,
  getallnotificationController
);

router.post(
  "/deleteallnotification",
  authMiddleware,
  deleteallnotificationController
);

router.get("/getuserappointments", authMiddleware, getAllUserAppointments);

router.get("/getDocsforuser", authMiddleware, getDocsController)

router.get("/getimage", getImageController)


module.exports = router;

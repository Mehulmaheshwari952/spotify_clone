const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const {validateUserRegistration} = require("../middlewares/validationMiddleware")

router.post("/register",validateUserRegistration,authController.registerUser)
router.get("/login",authController.isAuthenticated)
router.get("/logout",authController.logoutUser)

module.exports = router




const express = require("express")
const router = express.Router()
const {registerUser,isAuthenticated} = require("../controllers/authController")


router.post("/register",registerUser)
router.get("/login",isAuthenticated)

module.exports = router;




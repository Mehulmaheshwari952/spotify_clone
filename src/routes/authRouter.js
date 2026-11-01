const express = require("express")
const router = express.Router()
const {logoutUser} = require("../middlewares/authMiddlewares")
const {registerUser,isAuthenticated} = require("../controllers/authController")



router.post("/register",registerUser)
router.get("/login",isAuthenticated)
router.get("/logout",logoutUser)

module.exports = router;




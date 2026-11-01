const express = require("express");
const { authArtist,authUser } = require("../middlewares/authMiddlewares");
const multer = require("multer")

const musicControllers = require("../controllers/musicController");

const upload = multer();

const router = express.Router();

router.get("/",authUser, musicControllers.getAllMusic)
router.post("/upload",authArtist, upload.single("music"), musicControllers.createMusic)
router.post("/createAlbum",authArtist, musicControllers.createAlbum)



module.exports = router;
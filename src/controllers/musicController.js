const Music = require("../models/Music")
const Album = require("../models/Album")
const jwt = require("jsonwebtoken")
const uploadFile = require("../services/storageService")
require("dotenv").config()

async function createMusic(req,res)
{
    try{    
        const decode = req.user
        const {title} = req.body
        const file = req.file

        const result = await uploadFile(file.buffer.toString('base64'))
        
        const music = await Music.create({
            uri: result.url,
            title,
            artist: decode.id,
        })
        return res.status(201).json({message:"Music created successfully",
            music:{
                id: music._id,
                uri:music.uri,
                title:music.title,
                artist:music.artist
            }
        })
    }       
    catch(err){
        return res.status(401).json({message:err.message})
    }
}

async function createAlbum(req,res)
{
    try
    {

        const decode = req.user

        const {title,musics} = req.body
        const album = await Album.create({
            title,
            musics,
            artist: decode.id,
        })
        return res.status(201).json({message:"Album created successfully",
            album:{
                id: album._id,
                title:album.title,
                musics:album.musics,
                artist:album.artist
            }
        })
    }       
    catch(err){
        return res.status(401).json({message:err.message})
    }
}

async function getAllMusic(req,res)
{
    try
    {
        const musics = await Music.find().populate("artist","username")
        return res.status(200).json({musics})
    }
    catch(err)
    {
        return res.status(401).json({message:err.message})
    }
}

async function getAllAlbums(req,res)
{
    try
    {
        const albums = await Album.find().populate("artist","username")
        return res.status(200).json({albums})
    }
    catch(err)
    {
        return res.status(401).json({message:err.message})
    }
}

module.exports = {createMusic, createAlbum, getAllMusic, getAllAlbums}
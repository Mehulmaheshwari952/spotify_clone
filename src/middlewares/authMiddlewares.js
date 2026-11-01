const jwt = require("jsonwebtoken")
require("dotenv").config()


async function authArtist(req, res, next)
{
    const token = req.cookies.token

    if(!token)
    {
        return res.status(401).json({message:"Unauthorized"})
    }

    try
    {
        const decode = jwt.verify(token ,process.env.JWT_SECRET)

        if(decode.role!=="artist")
        {
            return res.status(403).json({message:"User not an Artist, Access Denied"})
        }
        req.user = decode
        next()
    }
    catch(err)
    {
        console.log(err)
        return res.status(401).json({message:"Unauthorized"})
    }
}

module.exports = {authArtist}
const ImageKit = require("@imagekit/nodejs")


const client = new ImageKit({
    privateKey:process.env.IMAGEKIT_KEY
});

async function uploadFile(buffer){
    const result = await client.files.upload({
        file:buffer,
        fileName:"music_" + Date.now(),
        folder: "spotify_clone/music"
    })
    return result;
}

module.exports = uploadFile
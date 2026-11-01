const { app,connectDB } = require("./src/app");

connectDB().then(
    app.listen(process.env.PORT),
    console.log("app listening at port 3000")    
);
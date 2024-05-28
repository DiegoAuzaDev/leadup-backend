const {io} = require("../index.js")

io.on("connection", (socker)=>{
    console.log("New client connected")
})
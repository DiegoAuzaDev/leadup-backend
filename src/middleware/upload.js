require("dotenv").config();
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  // options : {
  //   useNewUrlParser : true,
  //   useUnifiedTopology : true
  // },
  file : (req, file)=>{
    const match = ["image/png", "image/jpeg"];
    if(match.indexOf(file.mimetype) === -1){
        const fileName = `${Date.now()}-LeadUp-FileName-${file.originalname}`
        return fileName
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}-LeadUp-FileName-${file.originalname}`,
    };
  }
});

module.exports = multer({storage})

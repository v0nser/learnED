const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');


const storage = new GridFsStorage({
    url: `mongodb+srv://raghuvanshivaibhav01:vsr123@cluster0.e3nsgdx.mongodb.net/?retryWrites=true&w=majority`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

module.exports = multer({ storage });
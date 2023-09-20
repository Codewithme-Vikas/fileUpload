const multer = require("multer");
const path = require("path")



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join( __dirname , '../../public/uploads') )
    },
    filename: function (req, file, cb) {
        const originalname = file.originalname;
        const parts = originalname.split('.');
        const extenstion = parts[parts.length - 1]
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        cb(null, uniquePrefix + '.' + extenstion)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        // Accept the file
        cb(null, true);
    } else {
        // reject file
        cb(new Error('invalid file type. only JPEG or PNG type supported'))
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
const uploadSingle = upload.single('file');


const multerUpload = (req, res, next) => {
    uploadSingle(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Handle Multer errors here
            return res.status(400).json({ error: 'Multer Error: ' + err.message });
        } else if (err) {
            // Handle other errors here
            return res.status(500).json({ error: err + 'Internal Server Error' });
        }

        // File upload was successful
        next()
    })
}


module.exports = multerUpload;
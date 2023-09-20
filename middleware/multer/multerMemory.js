const multer = require('multer')

const storage = multer.memoryStorage()

const upload = multer({ storage: storage })

const uploadSingle = upload.single('file');

const multerUploadSingle = async (req, res, next) => {
    uploadSingle(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Handle Multer errors here
            return res.status(400).json({ success: false, message: `Multer Error: ${err.message}` })
        } else if (err) {
            // Handle other errors here
            return res.status(500).json({ error: err + 'Internal Server Error' });
        }

        // File upload was successful by multer on memory
        next();
    })
}


module.exports = multerUploadSingle;
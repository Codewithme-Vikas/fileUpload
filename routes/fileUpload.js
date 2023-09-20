const express = require("express")
const router = express.Router()


// multer setting
const { imageUpload , videoUpload , imageSizeReducer , localFileUpload } = require('../controller/fileUpload');

const multerUploadSingleMemory  = require('../middleware/multer/multerMemory');
const multerUpload = require('../middleware/multer/multerDisk');

router.post('/localFileUpload', multerUpload, localFileUpload);

router.post('/imageUpload', multerUploadSingleMemory , imageUpload );

router.post('/videoUpload' , multerUploadSingleMemory , videoUpload );

router.post('/imageSizeReducer' , multerUploadSingleMemory ,imageSizeReducer );



module.exports = router;
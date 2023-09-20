const File = require("../models/File");
const cloudinary = require("cloudinary");
require('dotenv').config();

const getDataUri = require('../utiils/dataUri')


exports.localFileUpload = async (req, res) => {
    try {
        const file = req.file;
        const { name, email, tags } = req.body
        const fileDoc = await File.create({
            name,
            email,
            tags,
            URL: `http://localhost:${process.env.PORT}/static/uploads/${file.filename}`,
        });

        return res.json({ success: true, message: 'File uploaded successfully', fileDoc })

    } catch (error) {
        console.log(error, 'localfileupload api')
        res.status(404).json({ success: false, message: 'bad request' })
    }
}

const fileFilter = (type, supportedType) => {
    return supportedType.includes(type);
}

exports.imageUpload = async (req, res) => {
    try {
        const file = req.file;
        const { name, email, tags } = req.body;

        // get the exptenstion of the file
        const originalName = file.originalname
        const parts = originalName.split('.')
        const extenstion = parts[parts.length - 1]

        // check whether file type is supported or not
        const supportedType = ['png', 'jpeg', 'jpg'];

        const isFileSupport = fileFilter(extenstion.toLowerCase(), supportedType);

        if (!isFileSupport) {
            return res.status(422).json({ success: false, message: "file type is not supported! Only png, jpeg and jpg support." })
        }

        // provide the desire name to the file
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // const cloudFileName = `${uniquePrefix}.${extenstion}`

        //to supported get the data from the buffer
        const fileUri = getDataUri(file)

        // send to the cloud
        const response = await cloudinary.v2.uploader.upload(fileUri.content, {
            folder: "fileupload/imageupload",
            public_id: uniquePrefix, // public id is kind of name 
        });


        // inserted file into the database
        const fileDoc = await File.create({
            name,
            email,
            tags,
            URL: response.secure_url,
        });

        return res.json({ success: true, message: 'File uploaded successfully', fileDoc });

    } catch (error) {
        console.log(error, "Imageupload api")
        return res.status(400).json({ success: false, message: 'Image is not uploaded! , bad request' })
    }
}


exports.videoUpload = async (req, res) => {
    try {
        const video = req.file;
        const { name, email, tags } = req.body;

        // get the exptenstion of the file
        const originalName = video.originalname
        const parts = originalName.split('.')
        const extenstion = parts[parts.length - 1]

        // check whether file type is supported or not
        const supportedType = ['mp4', 'mov'];

        const isFileSupport = fileFilter(extenstion.toLowerCase(), supportedType);

        if (!isFileSupport) {
            return res.status(422).json({ success: false, message: "file type is not supported! only mp4  and mov support." })
        }

        // check whether file is up to 50 MB [1000000 = 1MB]
        const maxSize = 50000000;  // 50 MB
        if ( video.size > maxSize ){
            return res.status(413).json({ success : false , message : "to large file! File size will be up to 50MB"})
        }

        // provide the desire name to the file
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        //to supported get the data from the buffer
        const fileUri = getDataUri(video)


        // send to the cloud
        const response = await cloudinary.v2.uploader.upload_large(fileUri.content, {
            resource_type  : 'video',
            folder: "fileupload/videoupload",
            public_id: uniquePrefix, // public id is kind of name 
        });
        
        // inserted file into the database
        const fileDoc = await File.create({
            name,
            email,
            tags,
            URL: response.secure_url,
        });

        return res.json({ success: true, message: 'File uploaded successfully', fileDoc });
    } catch (error) {
        console.log(error, 'video upload api ');
        return res.status(400).json({ success: false, message: "video is not uploaded , bad request" })
    }
}


exports.imageSizeReducer = async( req , res )=>{
    try {
        const file = req.file;
        const { name, email, tags } = req.body;

        // get the exptenstion of the file
        const originalName = file.originalname
        const parts = originalName.split('.')
        const extenstion = parts[parts.length - 1]

        // check whether file type is supported or not
        const supportedType = ['png', 'jpeg', 'jpg'];

        const isFileSupport = fileFilter(extenstion.toLowerCase(), supportedType);

        if (!isFileSupport) {
            return res.status(422).json({ success: false, message: "file type is not supported! Only png, jpeg and jpg support." })
        }

        // provide the desire name to the file
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        //to supported get the data from the buffer
        const fileUri = getDataUri(file)

        // send to the cloud
        const response = await cloudinary.v2.uploader.upload(fileUri.content, {
            folder: "fileupload/imageupload",
            public_id: uniquePrefix, // public id is kind of name 
            quality: 'auto', // reduce the size of the file , base on the cloudinary intelligence
            // width: 500, height: 500, gravity: "auto", crop: "fill"
        });


        // inserted file into the database
        const fileDoc = await File.create({
            name,
            email,
            tags,
            URL: response.secure_url,
        });

        return res.json({ success: true, message: 'File uploaded successfully', fileDoc });

    } catch (error) {
        console.log( error , 'image reduce upload endpoint');
        return res.status(400).json({ success : false , message : "image is not upload! Bad request."})
    }
}
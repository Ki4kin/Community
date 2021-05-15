import express from "express";
import User from "../models/student.js";
import path from "path";
import multer from "multer";
import Student from "../models/student.js";

const router = express.Router();


// for photo
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(123);
        cb(null, "public/img");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    },
});
console.log("1111111", storage);
const upload = multer({storage: storage});


// for resume
const storagePdf = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("resume-----------");
        cb(null, "public/resume");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    },
});
console.log("res-----55", storagePdf);
const pdfUpload = multer({storage: storagePdf});


router
    .post("/addphoto/:id", upload.single("avatar"), async (req, res) => {
        const img = req.file.filename;
        const idUser = req.params;
        try {
            const UserOne = await User.findOne({_id: idUser.id});
            UserOne.photo = img;
            await UserOne.save();
            res.status(200).json({UserOne});
        } catch (error) {
            res.status(404).json({succes: false, msg: error.message});
        }
    })

    .put("/changetext", async (req, res) => {
        const {
            id,
            name,
            lastName,
            phone,
            email,
            year,
            group,
            city,
            stack,
            language,
            socialLinkedin,
            socialGitHab,
            placeWork,
        } = req.body;
        console.log(city);
        try {
            const UserOne = await User.findOne({_id: id});
            console.log(UserOne);
            UserOne.name = name;
            UserOne.lastName = lastName;
            UserOne.email = email;
            UserOne.phone = phone;
            UserOne.year = year;
            UserOne.group = group;
            UserOne.city = city;
            UserOne.stack = stack;
            UserOne.language = language;
            UserOne.socialLinkedin = socialLinkedin;
            UserOne.socialGitHab = socialGitHab;
            UserOne.placeWork = placeWork;

            await UserOne.save();
            res.status(200).json({UserOne});
        } catch (error) {
            res.status(404).json({succes: false, msg: error.message});
        }
    })


    .post('/addresume/:id', pdfUpload.single("resume"), async (req, res) => {
        const resume = req.file.filename
        const {id} = req.params

        try {
            const UserOne = await User.findById({_id: id});

            UserOne.resume = resume;
            await UserOne.save();

            res.status(200).json(resume);

        } catch (error) {
            res.status(404).json({succes: false, msg: error.message});
        }
    })


    .get('/inits', async (req, res) => {
        try {
            const list = await Student.find()
            res.status(200).json({succes: true, list});

        } catch (error) {
            res.status(404).json({succes: false, msg: error.message});
        }

    })

    .post('/search', async (req,res)=>{
        try {
            const {name,lastName,group,year,city} = req.body
            const list = await Student.find()
            const result =  list.filter(el=>{
               return (el.name == name && el.group == group )
            })
            console.log(result)
            res.status(200).json({succes: true, result});

        }catch (error){
            res.status(404).json({succes: false, msg: error.message});
        }
    })
export default router;

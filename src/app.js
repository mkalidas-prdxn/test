const express = require("express");
const path = require("path");
const app = express();
require("../database/conn");
const Register = require("../database/afterRegister");
const uploadModel = require("../database/imageupload");
var multer = require('multer')
// var upload = multer({ dest: 'uploads/' })

const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path))

app.get("/", (req, res) => {
  res.send("hello");
});

//create a user in database
app.post("/afterRegister", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if (password === cpassword) {
      const registerUser = new Register({
        firstname: req.body.firstname,
        email: req.body.email,
        mobile: req.body.mobile,
        password: password,
        confirmpassword: cpassword
      })
      const registered = await registerUser.save();
      const registerd_path = path.join(__dirname, "../public/index.html");
      res.sendFile(registerd_path);
    } else {
      res.send("password mismatch");
    }
  } catch (error) {
    res.send(error);
  }
})

let email;
// app.get("/login.html", (req, res) => {
//   email = null;
// });

// login authentication
app.post("/afterLogin", async (req, res) => {
  try {
    email = req.body.email;
    const password = req.body.password;
    const userdata = await Register.findOne({ email: email })
    if (userdata.password === password) {
      const registerd_path = path.join(__dirname, "../public/afterLoginpage.html");
      res.sendFile(registerd_path);
    } else {
      res.send("data invalid");
    }
  } catch (error) {
    res.status(400).send("invalid data")
  }
})

app.get("/userData", async (req, res) => {
  try {
    const getDocument = async () => {
      const result = await Register.findOne({ email: email });
      res.send("First name : " + result.firstname + "<br/>" + "Email : " + result.email + "<br/>" + "Mobile number : " + result.mobile);
    }
    getDocument();
  } catch (error) {
    res.status(400).send("invalid data")
  }
})

//multer function to upload file
var Storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({
  storage: Storage
}).single('file');

app.post('/upload', upload, function (req, res, next) {
  var imageFile = req.file.filename;
  var success = req.file.filename + " uploaded successfully";
  var imageDetails = new uploadModel({
    imagename: imageFile
  });
  imageDetails.save(function (err, doc) {
    if (err) {
      throw err;
    } else {
      res.send("uploaded successfully")
    }
  });
});

app.listen(port, () => {
  console.log('server is running at port no' + port);
})

var express = require("express");
var router = express.Router();
var passport = require("passport");
var multer  = require('multer')
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })
var AWS = require("aws-sdk");

AWS.config.loadFromPath("./config.json");
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

var url = require("url");

/* GET home page. */
router.get("/", function(req, res, next) {
  var q = url.parse(req.url, true);
  res.render("index", { title: "Travel RPG" });
});

/* GET home page. */
router.get("/api", function(req, res, next) {
  console.log("api");
  var q = url.parse(req.url, true);
  console.log("host " + q.host); //returns 'localhost:8080'
  console.log("path " + q.pathname); //returns '/default.htm'
  console.log("search" + q.search); //returns '?year=2017&month=february'

  res.render("index", { title: "Express" });
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: "https://www.googleapis.com/auth/plus.login"
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/admin");
  }
);

router.get("/auth/github", passport.authenticate("github"));
router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/main.html");
  }
);

/* AWS functions */
var basebucket = 'pwndropfiles';
async function uploadFile(bucketName, file, folder) { 
  console.log('upload file');
      try {
        var objectParams = {
          Bucket: bucketName, 
          Key: folder+'/'+file.originalname,
          Body: file.buffer
        };
        await s3.putObject(objectParams).promise();
        return true;
      } catch (error) {
        console.log('upload file error');
        console.log(error);
        return false;
      }
};

async function listFiles(folder) { 
  console.log('list file');
  try {
    var objectParams = {
      Bucket: basebucket, 
      Prefix: folder
    };
    let list = await s3.listObjects(objectParams).promise();
    return list;
  } catch (error) {
    console.log('list file error');
    console.log(error);
    return false;
  }
};

async function deleteFile(fileName) { 
  console.log('delete file');
  try {
    var objectParams = {
      Bucket: basebucket, 
      Key: fileName
    };
    await s3.deleteObject(objectParams).promise();
    return true;
  } catch (error) {
    console.log('delete file error');
    console.log(error);
    return false;
  }
};

async function buildSignedUrl(fileName) { 
  console.log('signed url file');
  try {
    var objectParams = {
      Bucket: basebucket, 
      Key: fileName,
      Expires: 60*60
    };
    return await s3.getSignedUrlPromise('getObject', objectParams);
  } catch (error) {
    console.log('signed url error');
    console.log(error);
    return false;
  }
};

async function buildFileList(list) {
  let fileList = [];
  for (let i = 0; i < list.length; ++i) {
    
    let x = {
      "name": list[i]['Key'],
      "lastModified": list[i]['LastModified'],
      "size": list[i]['Size'],//byte
      "signedUrl": await buildSignedUrl(list[i]['Key'])
    };
    
    fileList.push(x);
  }
  return fileList;
}

router.get("/files", ensureAuthenticated, function(req, res) {
    listFiles(req.user.username)
      .then(result => {
        if (result) {
          buildFileList(result['Contents']).then(finalList => {
            res.json(200, finalList); 
          });
        } else {
          res.send(500, "List File Error");
        }
      });
});

router.post("/files", ensureAuthenticated, upload.single('fileUpload'), function(req, res) {
  if(req.file.size <= 10*1024*1024) {
    uploadFile(basebucket, req.file, req.user.username)
      .then(result => { 
        if(result) {
          res.send(201, 'ok'); 
        }  else {
          res.send(500, "Upload File Error");
        }
      });
  } else {
    res.send(413, "Max Size Exceeded");
  }
});

router.delete("/files/:name", ensureAuthenticated, function(req, res) {
  deleteFile(req.params.name)
      .then(result => {
        if (result) {
          res.send(200, 'ok');
        } else {
          res.send(500, "Delete File Error");
        }
      });
});

router.get("/users", ensureAuthenticated, function(req, res) {
    res.json(200, { "displayName": req.user.displayName, "avatar": req.user.photos[0].value });
  }
);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next();
  }
  // denied. redirect to login
  res.send(401, "Not Authenticated");
}

module.exports = router;

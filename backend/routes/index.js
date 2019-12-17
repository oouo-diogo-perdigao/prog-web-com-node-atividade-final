var express = require("express");
var router = express.Router();
var passport = require("passport");
var multer  = require('multer')
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })
var AWS = require("aws-sdk");

AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", 'AKIAII37EGWTOIB7SAWQ');
    console.log("Secret access key:", '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');
  }
});

var basebucket = 'pwndropfiles';
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

router.get("/files", ensureAuthenticated, function(req, res) {
    res.json({ "arquivos": "TODO" });
    // listar arquivos do bucket pwndropfiles/req.user.username
});

async function checkBucketExists(bucket) { 
  console.log('check bucket');
  const options = { Bucket: bucket };
  try {
    await s3.headBucket(options).promise();
    return true;
  } catch (error) {
    return false;
  }
};

async function createBucket(bucketName) { 
  console.log('create bucket');
  try {
    await s3.createBucket({Bucket: basebucket+req.user.username}).promise();
    return true;
  } catch (error) {
    return false;
  }
};

async function uploadFile(bucketName, file) { 
  console.log('upload file');
      try {
        var objectParams = {
          Bucket: bucketName, 
          Key: file.originalname,
          Body: file.buffer
        };
        await s3.putObject(objectParams).promise();
        return true;
      } catch (error) {
        return false;
      }
};

router.post("/files", ensureAuthenticated, upload.single('fileUpload'), function(req, res) {

    console.log(req.file); 

    checkBucketExists(basebucket+req.user.username).then(bucketExists => {
      if (bucketExists) {
        uploadFile(basebucket+req.user.username, req.file).then(result => {
          res.send(201, 'ok'); 
        });
      } else {
        createBucket(basebucket+req.user.username).then(createdBucket => {
          if (createdBucket) {
            uploadFile(basebucket+req.user.username, req.file).then(fileUploaded => {
              if (fileUploaded) {
                res.send(201, 'ok');
              } else {
                res.send(500, 'Fail to upload File');
              }
            });
          } else {
            res.send(500, 'Fail to create Bucket');
          }
        });
      }
    });
});

router.delete("/files/:name", ensureAuthenticated, function(req, res) {
    console.log(req.params);
    res.send('ok: '+req.params.name);

    //deletar pwndropfiles/req.user.username/req.params.name
});

router.get("/users", ensureAuthenticated, function(req, res) {
    res.json({ "displayName": req.user.displayName, "avatar": req.user.photos[0].value });
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

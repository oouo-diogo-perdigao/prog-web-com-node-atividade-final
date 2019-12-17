var express = require("express");
var router = express.Router();
var passport = require("passport");
var multer  = require('multer')
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

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
});

router.post("/files", ensureAuthenticated, upload.single('fileUpload'), function(req, res) {
    // res.json({ "arquivos": "upload TODO" });
    console.log(req.file); 
    res.send('ok'); 
});

router.delete("/files/:name", ensureAuthenticated, function(req, res) {
    console.log(req.params);
    res.send('ok: '+req.params.name);
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

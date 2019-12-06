var express = require("express");
var router = express.Router();
var passport = require("passport");

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
    res.redirect("http://localhost:8080/index.html");
  }
);

router.get("/admin", ensureAuthenticated, function(req, res) {
  res.render("admin", { user: req.session.passport.user });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next();
  }
  // denied. redirect to login
  res.redirect("/");
}

module.exports = router;

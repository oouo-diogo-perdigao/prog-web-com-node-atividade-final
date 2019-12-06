const express = require("express");
const app = express();
const path = require("path");

const cookieParser = require("cookie-parser");
const logger = require("morgan");

const createError = require("http-errors");

const http = require("http").createServer(app);
//const io = require('socket.io')(http);
const io = require("socket.io").listen(http);

//#region Passport.js
const passport = require("passport");
require("./configs/google.strategy");
require("./configs/github.strategy");
//#endregion

//#region conexões via socket
io.on("connection", client => {
  client.on("join", function(name) {
    client.broadcast.emit("updateMessageChat", "Joined: " + name);

    clients[client.id] = name;
    client.emit("updateMessageChat", "You have connected to the server.");
    client.broadcast.emit(
      "updateMessageChat",
      name + " has joined the server."
    );
  });

  client.emit("getid", `User connected with id ${client.id}`);

  client.on("sendMessageChat", conteudo => {
    console.warn(conteudo);
    client.emit("updateMessageChat", conteudo);
    client.broadcast.emit("updateMessageChat", conteudo);
  });
});

//#endregion

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Set passport configs
app.use(
  require("express-session")({
    secret: "shhhh...",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

//#region Rotas
app.use(express.static(__dirname + "/public")); //Rota para a pasta public para css
const indexRouter = require("./routes/index");
app.use("/", indexRouter);
const loginRouter = require("./routes/login");
app.use("/login", loginRouter);
const logoutRouter = require("./routes/logout");
app.use("/logout", logoutRouter);
//#endregion

//#region Manipuladores de errors
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.warn("envolviment" + req.app.get("env"));
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
//#endregion

//Inicia o servidor escutando na porta 3000
// http.listen(3000, function() {
//   console.log("Example app listening on port 3000!");
// });

module.exports = app;

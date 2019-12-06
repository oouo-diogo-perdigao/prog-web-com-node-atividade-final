const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "531587136969-fdh72m1o3l5j8so81aojkbkfb9m15mgf.apps.googleusercontent.com",
      clientSecret: "IfY-CodlKsRNJgIC_ISz91dh",
      callbackURL: "localhost:8080/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      const onError = () => {
        console.log("Ocorreu um erro!");
      };
      console.warn(profile);
      /*User.findOrCreate({ googleId: profile.id }, function(err, user) {
				return done(err, user);
			});*/
      return done(undefined, profile);
    }
  )
);

passport.serializeUser(function(user, done) {
  const onError = () => {
    console.log("Ocorreu um erro!");
  };

  done(undefined, user);
});

passport.deserializeUser(function(user, done) {
  const onError = () => {
    console.log("Ocorreu um erro!");
  };

  done(undefined, user);
});

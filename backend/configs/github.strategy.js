const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

passport.use(
	new GitHubStrategy(
		{
			clientID: 'Iv1.8ffdfafe2660a4d1',
			clientSecret: 'b0394012ac5427bb82d9eb1fc2650d0950c4ad1c',
			callbackURL: 'http://localhost:3000/auth/github/callback'
		},
		function(accessToken, refreshToken, profile, done) {
			const onError = () => {
				console.log('Ocorreu um erro!');
			};

			return done(undefined, profile);
		}
	)
);

passport.serializeUser(function(user, done) {
	const onError = () => {
		console.log('Ocorreu um erro!');
	};

	done(undefined, user);
});

passport.deserializeUser(function(user, done) {
	const onError = () => {
		console.log('Ocorreu um erro!');
	};

	done(undefined, user);
});

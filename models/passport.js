const passport = require('passport');
const LocalStrategy = require('passport-local');
const authenticationService = require('../models/services/authenticationService');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const {db} = require('../models/db');


passport.use(new LocalStrategy(async function verify(username, password, cb) {
    const user = await authenticationService.verifyUser(username, password);
    console.log(user);

    if(user)
        return cb(null, user);
    return cb(null, false);
}));


passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, user);
    });
});

  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
});


const GOOGLE_CLIENT_ID = '101968253987-gck7t1c3u06184t8bm7pfso4jncilk65.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
      const user = {
        id_google: profile.id,
        username: profile.displayName,
        firstname: profile.family_name,
        lastname: profile.given_name,
        email: profile.email,
        picture: profile.picture
      };
    
     

      if(user) {
        db().collection('user').insertOne(user, (err, res) => {
          if (err) throw err;
          console.log("1 document inserted");
        });

        return done(null, user);
      }
      return done(null, false);
  }
));



module.exports = passport;
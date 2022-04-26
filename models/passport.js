const passport = require('passport');
const LocalStrategy = require('passport-local');
const authenticationService = require('../models/services/authenticationService');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
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
    callbackURL: "http://172.104.33.240:3000/google/callback",
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {
      const user = {
        id_google: profile.id,
        username: profile.displayName,
        firstname: profile.family_name,
        lastname: profile.given_name,
        email: profile.email,
        picture: profile.picture
      };
    
      const userFind = await db().collection('user').findOne({id_google: profile.id});
      console.log(userFind);

      if(!userFind) {
        db().collection('user').insertOne(user, (err, res) => {
          if (err) throw err;
          console.log("1 document inserted");
        });
      }
      else {
        const newInfo = {$set: user};
        await db().collection('user').updateOne({id_google: profile.id}, newInfo, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
        })
      }

      if(user)
        return done(null, user);
      return done(null, false);
  }
));

const FACEBOOK_APP_ID = '372666001417612';
const FACEBOOK_APP_SECRET = 'c5e3208fd97f06cd37a7e02108d096b0';
passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://172.104.33.240/facebook/callback"
},
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    return cb(null, profile);
  }));


module.exports = passport;

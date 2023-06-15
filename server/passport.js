const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const passport = require('passport')

const GOOGLE_CLIENT_ID = "893348532247-l4d1u7a5ciioqhn0h1qv6a5k7mj9nq03.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

const GITHUB_CLIENT_ID = "f7bfa1db0f4264343792"
const GITHUB_CLIENT_SECRET = "34c1ef328f99abd650b9912db1f9b22e7cdd61cf"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null,profile)
  }
));

passport.use(new GithubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  done(null,profile)
}
));

passport.serializeUser((user,done)=>{
    done(null,user) 
})

passport.deserializeUser((user,done)=>{
    done(null,user) 
})
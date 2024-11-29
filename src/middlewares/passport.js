const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
  { usernameField: 'emailid' },
  async (emailid, password, done) => {
    try {
      const user = await User.findOne({ emailid });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (user.isSuspended && user.suspensionEndTime > new Date()) {
        return done(null, false, { message: 'Your account is suspended' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;

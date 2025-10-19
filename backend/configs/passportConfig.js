const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../prisma/queries');
require('dotenv').config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
}

const verifyCallback = async (jwt_payload, done) => {
    try {
        const user = await db.getUserNoSensitive(jwt_payload.id)
        if (!user) {
            return done(null, false)
        } else {
            return done(null, user)
        }
    } catch(err) {
        console.log("Error at verifyCallback: ")
        return done(err, false)
    }
}

passport.use(new JwtStrategy(opts, verifyCallback))
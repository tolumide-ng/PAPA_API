import passport from 'passport';
import passportJWT from 'passport-jwt';
const JwtStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;
import db from './db/index'

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.SECRET_KEY
}, async (payload, done) => {
    try {
        // Find the user specified in token
        const text = `SELECT * FROM userTable WHERE id=$1`;
        const { rows } = await db.query(text, [payload.sub]);

        // If user doesn't exist, handle it
        if(!rows[0]) {
            return done(null, false);
        }
        // Otherwise, handle it
        done(null, rows[0])
    } catch(error) {
        done(error, false)
    }
}))
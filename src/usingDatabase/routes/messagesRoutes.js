import express from 'express';
import passport from 'passport';

import messagesControllers from './../v1/messagesControllers';
import messagesHelpers from './../helpers/messagesHelpers';
import passportConf from './../passport';
const { validateBody, schemas } = messagesHelpers;

const router = express.Router();

// For custom passport authentication
const passportJWT = function (req, res, next) {
    passport.authenticate('jwt', { session: false }, function (err, user, info) {
        if (err) { return next(err) }
        if (!user) { return res.status(401).json({ status: 401, Error: 'Email or password does not match' }) }
    })(req, res, next)
    next();
}



router.post('/send', validateBody(schemas.authSchema), passportJWT, messagesControllers.composeMessage);
// draft messages routes
export default router;
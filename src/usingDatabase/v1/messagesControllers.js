import '@babel/polyfill';
import passport from 'passport';
import passportConf from './../passport'
import db from './../db/index';
import { type } from 'os';



const Messages = {
    async composeMessage(req, res) {
        let store = {};
        // This method is EXCLUSIVELY for the sendMail button
        passport.authenticate('jwt', { session: false }, async function (err, user) {
            if (err) { return res.status(400).json({ status: 400, error: 'Please confirm all input data' }) }
            if (!user) { return res.status(401).json({ status: 401, error: 'Auth Error, Email or password does not match' }) }
            // Make the user variable accessble globally

            const request = req.value.body;
            const senderEmail = user.email;
            // const senderId = user.id;
            const { subject, message, parentMessageId, receiverEmail } = request;
            // Check if the receiver exist in the database
            const text = `SELECT * FROM userTable WHERE email=$1`; const values = [receiverEmail];
            try {
                const { rows } = await db.query(text, values);
                if (!rows[0]) {
                    return res.status(404).json({ status: 404, Error: `There is no user with the email specified in the receiverEmail` });
                }
                // User exist, obtain user id, and go ahead with posting the mail
                const receiverId = rows[0].id;
                const { receiverEmail, message, parentMessageId, subject } = req.value.body;

                const sentText = `INSERT INTO messagesTable(subject, message, senderEmail, parentMessageId, receiverEmail) VALUES($1, $2, $3, $4, $5) returning *`;
                const sentValues = [subject, message, senderEmail, parentMessageId, receiverEmail];
                try {
                    const { rows } = await db.query(sentText, sentValues);
                    return res.status(201).json({ data: rows[0] });
                } catch(error) {
                    return res.status(400).json({ status: 400, error })
                }

            } catch (error) {
                return res.status(400).json({ status: 400, error, name: 'trye this' })
            }
        })(req, res)


    }
}

export default Messages;
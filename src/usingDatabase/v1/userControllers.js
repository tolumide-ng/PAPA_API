import '@babel/polyfill';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

import db from '../db/index';
const tokenGenerator = user => {
    return JWT.sign({
        iss: 'thePaparian',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, process.env.SECRET_KEY);
}


const User = {
    async createUser(req, res) {
        const request = req.value.body;
        const { email, firstName, lastName, password } = request;

        // Search if the email address already exist in database
        const searchText = `SELECT * FROM userTable WHERE email=$1`;
        const values = [email];
        try {
            const { rows } = await db.query(searchText, values);
            if (!rows[0]) {
                const text = `INSERT INTO userTable(email, firstName, lastName, password)
                VALUES($1, $2, $3, $4) returning *`;
                const values = [email, firstName, lastName, password];
                // Register the email and userDetails
                try {
                    const { rows } = await db.query(text, values);

                    // Generate token
                    const token = tokenGenerator(rows[0]);
                    return res.status(201).json({ token, data: rows[0] });
                } catch (err) {
                    return res.status(400).json(err);
                }
                // Status code 409 means conflict
            } return res.status(409).json({ status: 409, error: `Auth failed: Email already exists` });
        } catch (err) {
            return res.status(400).json({ status: 400, data: err })
        }
    },

    async loginUser(req, res) {
        const request = req.value.body;
        const text = `SELECT * FROM userTable WHERE email=$1`;
        const value = [request.email];
        try {
            const { rows } = await db.query(text, value);
            if (!rows[0]) {
                // 401 means unauthorized
                return res.status(401).json({ status: 401, data: 'Auth Err, password and email does not match' })
            }
            const token = tokenGenerator(rows[0]);
            return res.status(200).json({ token, data: rows[0] });
        } catch (err) {
            return res.status(400).json(err);
        }
    }
}


export default User;
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const theDatabaseUrl = process.env.TYPE === 'test' ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL

const pool = new Pool({
    connectionString: theDatabaseUrl
})

module.exports = {
    query(text, params) {
        return new Promise((resolve, reject) => {
            pool.query(text, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}
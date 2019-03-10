const db = require('./index');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const { createTable, dropTable } = require('./queries')

// Enable search for environment variables
dotenv.config();

const theDatabaseUrl = process.env.TYPE === 'test' ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL

const pool = new Pool({
    connectionString: theDatabaseUrl
});

pool.on('connect', () => { console.log('connected to the db'); });

// Create Tables

const createTheTable = async () => {
    try {
        await db.query(createTable.userTable);
        await db.query(createTable.messagesTable);
    } catch (err) {
        console.log(`${err.name}, ${err.message}`);
    }
}

const dropTheTable = async () => {
    try {
        await db.query(dropTable.userTable);
        await db.query(dropTable.messagesTable);
    } catch(err) {
        console.log(`${err.name}, ${err.message}`)
    }
}

module.exports = {
    createTheTable,
    dropTheTable
}

require('make-runnable');
const createTable = {
    userTable: `CREATE TABLE IF NOT EXISTS
        userTable(
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            email VARCHAR(100) NOT NULL UNIQUE,
            firstName VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            createdOn TIMESTAMP NOT NULL DEFAULT NOW()
        )`,

    messagesTable: `CREATE TABLE IF NOT EXISTS
        messagesTable(
            id SERIAL NOT NULL UNIQUE,
            createdOn TIMESTAMP NOT NULL DEFAULT NOW (),
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            parentMessageId INT NOT NULL,
            senderEmail TEXT NOT NULL,
            receiverEmail TEXT NOT NULL,
            FOREIGN KEY(senderEmail) REFERENCES userTable(email) ON DELETE CASCADE,
            FOREIGN KEY(receiverEmail) REFERENCES userTable(email) ON DELETE CASCADE,
            PRIMARY KEY(id, senderEmail)
        )`
};

const dropTable = {
    userTable: `DROP TABLE IF EXISTS userTable CASCADE`,
    messagesTable: `DROP TABLE IF EXISTS messagesTable CASCADE`,
};

module.exports = {
    createTable,
    dropTable
}
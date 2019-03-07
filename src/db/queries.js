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

    contactTable: `CREATE TABLE IF NOT EXISTS
        contactTable(
            id SERIAL NOT NULL UNIQUE,
            email VARCHAR(100) NOT NULL UNIQUE,
            firstName VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            contactOf VARCHAR(255) NOT NULL,
            FOREIGN KEY(contactOf) REFERENCES userTable(email) ON DELETE CASCADE,
            PRIMARY KEY(id, contactOf)
        )`,

    messagesTable: `CREATE TABLE IF NOT EXISTS
        messagesTable(
            id SERIAL NOT NULL UNIQUE,
            createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
            subject VARCHAR(255) NOT NULL,
            message VARCHAR(255) NOT NULL,
            parentMessageId INT NOT NULL DEFAULT 0,
            status VARCHAR(255) NOT NULL,
            createdBy VARCHAR(100) NOT NULL,
            FOREIGN KEY(createdBy) REFERENCES userTable(email) ON DELETE CASCADE,
            PRIMARY KEY(id, createdBy)
        )`,

    sentMessagesTable: `CREATE TABLE IF NOT EXISTS
        sentMessagesTable(
            id SERIAL NOT NULL UNIQUE,
            createdOn TIMESTAMP NOT NULL DEFAULT NOW (),
            subject VARCHAR(100) NOT NULL,
            message VARCHAR(255) NOT NULL,
            parentMessageId INT NOT NULL DEFAULT 0,
            senderId INT NOT NULL,
            senderEmail VARCHAR(100) NOT NULL,
            receiverId INT NOT NULL,
            receiverEmail VARCHAR(100) NOT NULL,
            FOREIGN KEY(senderId) REFERENCES userTable(id) ON DELETE CASCADE,
            FOREIGN KEY(senderEmail) REFERENCES userTable(email) ON DELETE CASCADE,
            FOREIGN KEY(receiverId) REFERENCES userTable(id),
            FOREIGN KEY(receiverEmail) REFERENCES userTable(email),
            PRIMARY KEY(id, senderId)
        )`,

    inboxMessagesTable: `CREATE TABLE IF NOT EXISTS
        inboxMessagesTable(
            id SERIAL NOT NULL UNIQUE,
            receivedOn TIMESTAMP NOT NULL DEFAULT NOW(),
            subject VARCHAR(100) NOT NULL,
            message VARCHAR(250) NOT NULL,
            receiverId INT NOT NULL,
            receiverEmail VARCHAR(100) NOT NULL,
            senderEmail VARCHAR(100) NOT NULL,
            senderId INT NOT NULL,
            parentMessageId INT NOT NULL DEFAULT 0,
            status VARCHAR(100) NOT NULL DEFAULT 'inbox',
            FOREIGN KEY(receiverId) REFERENCES userTable(id) ON DELETE CASCADE,
            FOREIGN KEY(receiverEmail) REFERENCES userTable(email) ON DELETE CASCADE,
            FOREIGN KEY(senderId) REFERENCES userTable(id),
            FOREIGN KEY(senderEmail) REFERENCES userTable(email),
            PRIMARY KEY(id, receiverId)
        )`,

    draftMessagesTable: `CREATE TABLE IF NOT EXISTS
        draftMessagesTable(
            id SERIAL NOT NULL UNIQUE,
            createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
            subject VARCHAR(100),
            message VARCHAR(250),
            receiverId INT,
            receiverEmail VARCHAR(100),
            OwnerEmail VARCHAR(100) NOT NULL,
            OwnerId INT NOT NULL,
            FOREIGN KEY(receiverId) REFERENCES userTable(id),
            FOREIGN KEY(receiverEmail) REFERENCES userTable(email),
            FOREIGN KEY(OwnerId) REFERENCES userTable(id) ON DELETE CASCADE,
            FOREIGN KEY(OwnerEmail) REFERENCES userTable(email) ON DELETE CASCADE
        )`,

    groupMembersTable: `CREATE TABLE IF NOT EXISTS
            groupMembersTable(
                id SERIAL NOT NULL UNIQUE,
                name VARCHAR(100) NOT NULL UNIQUE,
                createdBy INT NOT NULL,
                members VARCHAR(250),
                FOREIGN KEY(createdBy) REFERENCES userTable(id),
                PRIMARY KEY(id, name)
            )`,

    groupTable: `CREATE TABLE IF NOT EXISTS
        groupTable(
            groupId INT NOT NULL UNIQUE,
            groupName VARCHAR(100) NOT NULL,
            FOREIGN KEY(groupId) REFERENCES groupMembersTable(id),
            FOREIGN KEY(groupName) REFERENCES groupMembersTable(name),
            PRIMARY KEY(groupId)
        )`
};

const dropTable = {
    userTable: `DROP TABLE IF EXISTS userTable CASCADE`,
    contactTable: `DROP TABLE IF EXISTS contactTable CASCADE`,
    messagesTable: `DROP TABLE IF EXISTS messagesTable CASCADE`,
    sentMessagesTable: `DROP TABLE IF EXISTS sentMessagesTable CASCADE`,
    inboxMessagesTable: `DROP TABLE IF EXISTS inboxMessagesTable CASCADE`,
    draftMessagesTable: `DROP TABLE IF EXISTS draftMessagesTable CASCADE`,
    groupMembersTable: `DROP TABLE IF EXISTS groupMembersTable CASCADE`,
    groupTable: `DROP TABLE IF EXISTS groupTable CASCADE`
};

module.exports = {
    createTable,
    dropTable
}
// index.js
const { config } = require('configs')
const {Sequelize} = require('sequelize')
const {Umzug, SequelizeStorage} = require('umzug')

const testDb = config.database.test;

const sequelize = new Sequelize(testDb.database, testDb.username,testDb.password, {
    host: testDb.host,
    dialect: 'mysql'
})

const umzug = new Umzug({
    migrations: {glob: 'database/migrations/*.js'},
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({sequelize}),
    logger: console,
})

// Checks migrations and run them if they are not already applied. To keep
// track of the executed migrations, a table (and sequelize model) called SequelizeMeta
// will be automatically created (if it doesn't exist already) and parsed.
await umzug.up()
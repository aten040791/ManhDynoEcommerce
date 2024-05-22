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

module.exports = umzug
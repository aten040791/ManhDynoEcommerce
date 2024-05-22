require("rootpath")();
const { umzug,sequelize } = require("kernels/tests");

module.exports = async () => {
    try {
        await sequelize.authenticate()
        await umzug.up()
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

global.__SEQUELIZE__ = sequelize;

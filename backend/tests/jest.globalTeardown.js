module.exports = async () => {
    const sequelize = global.__SEQUELIZE__;
    const umzug = global.__UMZUG__;

    if (sequelize) {
        try {
            await umzug.down({to: 0})
            await sequelize.close();
            console.log('Global teardown: Connection has been closed successfully.');
        } catch (error) {
            console.error('Global teardown: Unable to close the database connection:', error);
        }
    }
};
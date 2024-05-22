module.exports = async () => {
    const sequelize = global.__SEQUELIZE__;

    if (sequelize) {
        try {
            await sequelize.close();
            console.log('Global teardown: Connection has been closed successfully.');
        } catch (error) {
            console.error('Global teardown: Unable to close the database connection:', error);
        }
    }
};
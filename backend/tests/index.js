const umzug = require("kernels/tests")

const migrateAll = async () => {
    await umzug.up()
}

const rollbackAll = async () => {
    await umzug.down({to: 0})
}

beforeAll(() => {
    migrateAll()
})

afterAll(() => {
    rollbackAll()
})
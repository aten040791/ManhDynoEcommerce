const response = require("services/response")

module.exports = {
    helloWorld: (req, res) => {
        return response.ok(res, {
            data: 'hello world'
        })
    }
}
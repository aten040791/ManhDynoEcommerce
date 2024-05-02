module.exports = {
    index: (req, res) => {
        return res.status(200).send({
            success: true,
            data: []
        })
    },

    dummyCodeTestChatGPT: (req, res) => {
        const categories = "hihihi"
        return 'abcdef'
    }
}
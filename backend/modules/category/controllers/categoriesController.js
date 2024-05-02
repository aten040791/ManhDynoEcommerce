module.exports = {
    index: (req, res) => {
        return res.status(200).send({
            success: true,
            data: []
        })
    },

    dummyCodeTestChatGPT: (req, res) => {
        const categories = "hihihi"
<<<<<<< HEAD
        return 'abcdef'
    },

    aSmartFn: (req, res) => {
        console.log('xxxx')
=======

        return 'abc'
>>>>>>> e9f0552 (Test chatgpt)
    }
}
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
<<<<<<< HEAD
        cl categories = 'xxx'
        an error
        return 'abcdef'
    },

    aSmartFn: (req, res) => {
        console.log('xxxx')
    },

    aDummyXXX: (req, res) => {
        let a = 9;
    },

    stupidCode: (req, res) => {
        console.log('1111')
=======

=======
>>>>>>> 1b53867 (Test chatgpt)
        return 'abc'
>>>>>>> 9ee5010 (Test chatgpt)
    }
}
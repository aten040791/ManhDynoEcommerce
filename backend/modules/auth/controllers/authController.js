module.exports = {
    helloWorld: (req, res) => {
        return res.status(200).json({
            success: true,
            data: 'Helloworld'
        })
    }
}
module.exports = {
    ok: (res, data) => {
        return res.status(200).send({
            success: true,
            ...data,
            status: 200,
            message: 'ok',
        })
    },
    notFound: () => {
        return {
            success: false,
            status: 404,
            message: "Cannot find resouces"
        }
    }
}
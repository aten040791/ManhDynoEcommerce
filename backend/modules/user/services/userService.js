module.exports = {
    ok: (res, data) => {
        return res.status(200).send({
            success: true,
            ...data,
            status: 200,
            message: "ok",
        });
    },
    notFound: (res) => {
        return res.status(404).send({
            success: false,
            status: 404,
            message: "Cannot find resouces",
        });
    },
    error: (res, message) => {
        return res.status(404).send({
            success: false,
            status: 404,
            message: message,
        });
    },
    authorization: (res, message) => {
        return res.status(401).send({
            success: false,
            status: 401,
            message: message,
        });
    },
};
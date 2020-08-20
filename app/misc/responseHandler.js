exports.errorCallback = function (errorCode, errMessage, res) {
    return res.status(errorCode).send(errMessage);
}
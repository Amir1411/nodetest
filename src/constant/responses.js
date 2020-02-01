const errorResponse = (res, status, message) => {
    let response = {
        "status": status,
        "response": {},
        "message": message              
    };
    res.status(status).json(response);
}

const successResponse = (res, status, message, result) => {
    let response = {
        "status": status,
        "response": result,
        "message": message              
    };
    res.status(status).json(response);
}

const successResponseFlag = (res, status, message, result, flag) => {
    let response = {
        "status": status,
        "response": result,
        "message": message,
        "flag": flag              
    };
    res.status(status).json(response);
}

module.exports = {
    errorResponse,
    successResponse,
    successResponseFlag
}
import {status} from '../constant/status';
import {message} from '../constant/message';
import responses from '../constant/responses';

const authenticateAccessToken = (req, res, next) => {
    const {access_token} = req.body;
    if (access_token) {
        req.User.findOne({ access_token }, (error, user) => {
            if (error) {
                next(responses.errorResponse(res, status.BAD_REQUEST_STATUS, error.message));
            } else if (user === null || user.length === 0) {
                next(responses.errorResponse(res, status.INVALID_ACCESS_TOKEN, message.INVALID_ACCESS_TOKEN_MESSAGE));
            } else {
                if (user.get("is_verified") == 0) {
					next(responses.errorResponse(res, status.INVALID_CREDENTIAL, "Your mobile number is not verified"))
				} else {
                    req.userAuthData = user;
                    next();
                }
            }
        })
    } else {
        responses.errorResponse(res, status.PARAMETER_MISSING_STATUS, "access_token is missing");
    }
};

const generateRandomString = () => {
    let text = "";
    let possible = "123456789";
    for (var i = 0; i < 4; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};

const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8);
}

module.exports = { authenticateAccessToken, generateRandomString, generateRandomPassword };
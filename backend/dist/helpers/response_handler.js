/**
 * 2XX type response formatter
 */
const successApiResponse = (res, payload, message = null, code = 200) => {
    res.status(code).json({
        status: code,
        data: payload,
        message,
    });
};
/**
 * Error API response
 */
const errorsApiResponse = (res, payload, message = 'An error occured.', code = 400) => {
    res.status(code).json({
        status: code,
        error: Object.assign({}, payload),
        message,
    });
};
export { successApiResponse, errorsApiResponse };

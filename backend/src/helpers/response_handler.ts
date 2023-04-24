
/**
 * 2XX type response formatter
 */
const successApiResponse = (res: any, payload: any, message: any = null, code = 200) => {
  res.status(code).json({
    status: code,
    data: payload,
    message,
  });
};


/**
 * Error API response
 */
const errorsApiResponse = (res: any, payload: any, message: any = 'An error occured.', code = 400) => {
    res.status(code).json({
      status: code,
      error: {...payload},
      message,
    });
  };

  export {
 successApiResponse,errorsApiResponse
  }
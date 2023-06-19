const generateErr = (message, code = 500) => {
    const error = new Error(message);
    error.httpStatus = code;
    error.errorDetails = {
      timestamp: new Date().toISOString(),
      type: 'CustomError',
    };
    throw error;
  };
  
  module.exports = generateErr;
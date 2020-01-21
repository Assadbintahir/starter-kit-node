const TAG = 'server/express/middleware/errorhandler.js';

export default function() {
  return (err, req, res, next) => {
    global.logger(
      TAG,
      `Error Logged: ${req.url}  ${req.method} -- ${err.stack}`
    );

    res
      .status(500)
      .json({ status: 'Internal Server Error', payload: err.stack });
  };
}

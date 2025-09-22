module.exports = (err, req, res, next) => {
  console.error('❌', err);
  const status = err.status || 500;
  const code = err.code || 'INTERNAL_ERROR';
  const message = err.message || 'Something went wrong';
  res.status(status).json({ code, message });
};

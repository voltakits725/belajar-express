const ResponseError = require('../error/responseError');
const { ZodError } = require('zod');

// Global Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  if (!err) return next();

  // Penanganan Custom Response Error (dari Service)
  if (err instanceof ResponseError) {
    return res.status(err.status).json({
      status: 'gagal',
      pesan: err.message
    });
  }

  // Penanganan Zod Error (dari Validation Helper)
  if (err instanceof ZodError) {
    const pesanError = err.issues.map(issue => issue.message).join(', ');
    return res.status(400).json({
      status: 'gagal',
      pesan: pesanError
    });
  }

  // Default error
  let statusCode = 500;
  let message = 'Internal Server Error';

  // Penanganan Error Prisma
  if (err.code) {
    switch (err.code) {
      case 'P2002': // Unique constraint failed
        statusCode = 400;
        message = 'Nomor telepon sudah terdaftar di database';
        break;
      case 'P2025': // Record not found
        statusCode = 404;
        message = 'Kontak tidak ditemukan';
        break;
    }
  } else {
    // Kalau bukan error prisma, log ke terminal
    console.error('Error Terdeteksi:', err);
  }

  res.status(statusCode).json({
    status: 'gagal',
    pesan: message,
    error: process.env.NODE_ENV !== 'production' ? err.message : undefined
  });
};

module.exports = errorHandler;

const express = require('express');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware built-in untuk memparsing JSON
app.use(express.json());

// Menggunakan Router untuk rute kontak
app.use('/api/contacts', contactRoutes);

// 404 URL Not Found Handler (Ini yang kamu minta kalau salah URL)
app.use((req, res, next) => {
  res.status(404).json({
    status: 'gagal',
    pesan: `URL yang Anda tuju (${req.originalUrl}) tidak ditemukan`
  });
});

// Import dan pasang Global Error Handler (Harus paling bawah)
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Jalankan server
app.listen(port, () => {
  console.log(`Server CMS berjalan di http://localhost:${port}`);
});

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Daftar Rute untuk endpoint Kontak
router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContactById);

// Middleware validasi sudah tidak dipakai di sini, pindah ke service
router.post('/', contactController.createContact);
router.put('/:id', contactController.updateContact);
router.patch('/:id', contactController.patchContact);
router.delete('/:id', contactController.deleteContact);

module.exports = router;

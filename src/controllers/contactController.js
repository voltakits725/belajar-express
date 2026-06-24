const contactService = require('../services/contactService');
const asyncHandler = require('../utils/asyncHandler');

const getAllContacts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const search = req.query.search || "";

  const result = await contactService.getAllContacts(page, limit, search);

  res.json({ 
    status: 'sukses', 
    ...result // menyebarkan properti data dan pagination
  });
});

const getContactById = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const contact = await contactService.getContactById(id);
  res.json({ status: 'sukses', data: contact });
});

const createContact = asyncHandler(async (req, res) => {
  const newContact = await contactService.createContact(req.body);
  res.status(201).json({ status: 'sukses', data: newContact });
});

const updateContact = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedContact = await contactService.updateContact(id, req.body);
  res.json({ status: 'sukses', data: updatedContact });
});

const patchContact = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedContact = await contactService.patchContact(id, req.body);
  res.json({ status: 'sukses', data: updatedContact });
});

const deleteContact = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  await contactService.deleteContact(id);
  res.json({ status: 'sukses', pesan: 'Kontak berhasil dihapus' });
});

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  patchContact,
  deleteContact
};

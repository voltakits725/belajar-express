const prisma = require('../config/database');
const { validate } = require('../validations/validation');
const { contactSchema, contactUpdateSchema } = require('../validations/contactValidation');
const ResponseError = require('../error/responseError');

const getAllContacts = async (page = 1, limit = 5, search = "") => {
  const skip = (page - 1) * limit;

  const whereCondition = search ? {
    name: {
      contains: search
    }
  } : {};

  const [contacts, totalData] = await Promise.all([
    prisma.contact.findMany({
      where: whereCondition,
      skip: skip,
      take: limit,
      orderBy: { id: 'desc' }
    }),
    prisma.contact.count({
      where: whereCondition
    })
  ]);

  const totalPages = Math.ceil(totalData / limit);

  return {
    data: contacts,
    pagination: {
      totalData,
      totalPages,
      currentPage: page,
      perPage: limit
    }
  };
};

const getContactById = async (id) => {
  const contact = await prisma.contact.findUnique({
    where: { id: id }
  });
  
  if (!contact) {
    throw new ResponseError(404, 'Kontak tidak ditemukan');
  }
  
  return contact;
};

const createContact = async (request) => {
  // Validasi data manual
  const contactRequest = validate(contactSchema, request);
  
  // Simpan ke database
  const newContact = await prisma.contact.create({
    data: contactRequest
  });
  
  return newContact;
};

const updateContact = async (id, request) => {
  // Pastikan kontak ada
  await getContactById(id);
  
  // Validasi data
  const contactRequest = validate(contactSchema, request);

  return await prisma.contact.update({
    where: { id: id },
    data: contactRequest
  });
};

const patchContact = async (id, request) => {
  await getContactById(id);
  
  const contactRequest = validate(contactUpdateSchema, request);

  return await prisma.contact.update({
    where: { id: id },
    data: contactRequest
  });
};

const deleteContact = async (id) => {
  await getContactById(id);
  
  await prisma.contact.delete({
    where: { id: id }
  });
  
  return true;
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  patchContact,
  deleteContact
};

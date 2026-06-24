const { z } = require('zod');

// Aturan validasi untuk tambah data (POST) atau update total (PUT)
const contactSchema = z.object({
  name: z.string({ required_error: "Nama wajib diisi" })
         .min(3, "Nama minimal harus 3 karakter"),
  
  email: z.string()
          .email("Format email tidak valid")
          .optional()
          .or(z.literal("")), // Boleh kosong atau tidak diisi
  
  phone: z.string({ required_error: "Nomor telepon wajib diisi" })
          .min(10, "Nomor telepon minimal 10 digit")
          .max(15, "Nomor telepon maksimal 15 digit"),
  
  address: z.string().optional(),
  
  gender: z.enum(["L", "P"], { message: "Gender hanya boleh 'L' (Laki-laki) atau 'P' (Perempuan)" })
           .optional()
           .or(z.literal(""))
});

// Aturan validasi untuk update parsial (PATCH), semua aturan sama tapi field-nya opsional
const contactUpdateSchema = contactSchema.partial();

module.exports = {
  contactSchema,
  contactUpdateSchema
};

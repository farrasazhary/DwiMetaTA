import express from 'express';
import multer from 'multer';
import path from 'path';
import { getAnak, getAnakById, saveAnak, updateAnak, deleteAnak } from '../controllers/AnakController.js';

const router = express.Router();

// Konfigurasi penyimpanan multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Pastikan folder ini ada atau dibuat
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Middleware untuk mengubah path file menjadi URL
const fileUrlMiddleware = (req, res, next) => {
  if (req.file) {
      // Buat URL lengkap berdasarkan host dan protocol
      const fullUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      req.body.foto = fullUrl;
  }
  next();
};


router.post('/anak', upload.single('foto'), fileUrlMiddleware, saveAnak);
router.patch('/anak/:id_anak', upload.single('foto'), fileUrlMiddleware, updateAnak);
router.get('/anak', getAnak);
router.get('/anak/:id_anak', getAnakById);
router.delete('/anak/:id_anak', deleteAnak);

export default router;


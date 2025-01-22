import express from 'express'
import {getParameterById, getParameters, deleteParameter, saveParameter, updateParameter,getNilaiWithAnak } from '../controllers/PenilaianControls.js'

const router = express.Router()

router.get('/parameter/', getParameters)
router.get('/parameter/:id',getParameterById)
router.post('/parameter/', saveParameter)
router.patch('/parameter/:id', updateParameter)
router.delete('/parameter/:id', deleteParameter)
router.get('/nilai-anak', getNilaiWithAnak);

//tambahan
import Parameter from '../models/PenilaianModels.js';

router.post('/add-penilaian/:id_anak', async (req, res) => {
  try {
    const { id_anak } = req.params; // Dapatkan id_anak dari URL
    const { nilai_baca, nilai_tulis, nilai_hitung, nilai_pemahaman, nilai_berpikir, motivasi } = req.body;

    // Tambahkan data penilaian berdasarkan id_anak
    const penilaianBaru = await Parameter.create({
      id_anak, // Foreign key otomatis diisi dari URL
      nilai_baca,
      nilai_tulis,
      nilai_hitung,
      nilai_pemahaman,
      nilai_berpikir,
      motivasi,
    });

    res.status(201).json({
      message: 'Data penilaian berhasil ditambahkan',
      data: penilaianBaru,
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan data penilaian', error: error.message });
  }
});




export default router



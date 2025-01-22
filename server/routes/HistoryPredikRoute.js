import express from "express";
import {
  createHasilPredik,
  getAllHasilPredik,
  getHasilPredikById,
  getHasilPredikByAnakId,
  getPredikWithAnak,
  getHasilPredikWithNameById
} from "../controllers/HistoryPredikController.js";
const router = express.Router();

// Get a single record by ID
router.get("/HasilPredik/:id", getHasilPredikById);
router.get("/HasilPredik/anak/:id", getHasilPredikByAnakId);
router.get("/HasilPredik", getAllHasilPredik);
router.post("/HasilPredik", createHasilPredik);
router.get("/HasilById/:id",getHasilPredikWithNameById)
router.get("/HasilName",getPredikWithAnak)

export default router;

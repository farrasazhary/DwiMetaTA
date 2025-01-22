import express from 'express';
import { loginAdmin, registerAdmin } from '../controllers/AdminController.js';

const router = express.Router();

// Rute untuk login admin
router.post('/admin/login', loginAdmin);
router.post('/admin/register', registerAdmin);

export default router;
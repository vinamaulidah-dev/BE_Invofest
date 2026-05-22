import express from 'express';
// Ganti require menjadi import
import {
    getAllPembicara,
    createPembicara,
    getPembicaraById,
    updatePembicaraById,
    deletePembicaraById
} from '../controllers/pembicaraController.js';

const router = express.Router();

// Pastikan memanggil fungsi yang sesuai dengan method-nya
router.get('/', getAllPembicara);
router.post('/', createPembicara);

// Perbaikan: sesuaikan fungsi untuk ID
router.get('/:id', getPembicaraById);
router.put('/:id', updatePembicaraById);
router.delete('/:id', deletePembicaraById);

export default router;
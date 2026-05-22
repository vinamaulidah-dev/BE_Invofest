import express from "express";
import { 
    getAllEvents, 
    createEvent, 
    getEventById, 
    updateEventById, 
    deleteEventById 
} from "../controllers/eventController.js"; // Pastikan pakai .js ya!

const router = express.Router();

router.get("/", getAllEvents);            // 1. Menampilkan semua data event
router.post("/", createEvent);           // 2. Membuat event baru
router.get("/:id", getEventById);        // 3. Menampilkan detail satu event berdasarkan ID
router.put("/:id", updateEventById);     // 4. Mengupdate data event berdasarkan ID
router.delete("/:id", deleteEventById);  // 5. Menghapus data event berdasarkan ID

export default router;
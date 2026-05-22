import type { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// =========================================================================
// 1. Menampilkan semua pembicara langsung dari Cloud Supabase (VERSI AMAN)
// =========================================================================
export const getAllPembicara = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const speakers = await prisma.pembicara.findMany(); // Hapus orderBy dulu agar tidak memicu error 500
    return res.json(speakers);
  } catch (error) {
    console.error("Error GET ALL Pembicara:", error);
    return res.status(500).json({ message: "Gagal mengambil data pembicara", error: String(error) });
  }
};   

// =========================================================================
// 2. Menyimpan data pembicara baru ke Cloud Supabase (SUPER FLEXIBLE)
// =========================================================================
export const createPembicara = async (req: Request, res: Response) => {
  try {
    // Frontend mungkin mengirim 'job' atau 'role', kita tangkap dua-duanya biar anti-gagal!
    const { name, role, job, image } = req.body;

    const finalName = name;
    const finalRole = role || job; // Jika frontend mengirim job, otomatis diisi ke kolom role database
    const finalImage = image || "https://placeholder.com/avatar.png"; // Amankan jika frontend belum kirim link gambar

    if (!finalName || !finalRole) {
      return res.status(400).json({ 
        message: "Nama dan Role/Pekerjaan pembicara wajib diisi!" 
      });
    }

    // @ts-ignore
    const newSpeaker = await prisma.pembicara.create({
      data: {
        name: finalName,
        role: String(finalRole), 
        image: finalImage,
      },
    });

    return res.status(201).json(newSpeaker);
  } catch (error) {
    console.error("Error CREATE Pembicara:", error);
    return res.status(500).json({ 
      message: "Terjadi kesalahan saat membuat data pembicara di database", 
      error: String(error)
    });   
  }
};

// =========================================================================
// 3. Menampilkan data pembicara berdasarkan ID murni database
// =========================================================================
export const getPembicaraById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      return res.status(400).json({ message: "ID Pembicara harus berupa angka murni" });
    }

    // @ts-ignore
    const speaker = await prisma.pembicara.findUnique({
      where: { id: parsedId },
    });

    if (!speaker) {
      return res.status(404).json({ message: "Pembicara tidak ditemukan di database" });
    }

    return res.json(speaker);
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan saat mengambil data pembicara", error: String(error) });
  }
};

// =========================================================================
// 4. Mengupdate data pembicara berdasarkan ID murni database
// =========================================================================
export const updatePembicaraById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, role, job, image } = req.body;
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      return res.status(400).json({ message: "ID Pembicara harus berupa angka" });
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (role !== undefined || job !== undefined) updateData.role = role || job;
    if (image !== undefined) updateData.image = image;

    // @ts-ignore
    const updatedSpeaker = await prisma.pembicara.update({
      where: { id: parsedId },
      data: updateData,
    });

    return res.json(updatedSpeaker);
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan saat mengupdate data pembicara", error: String(error) });
  }
};

// =========================================================================
// 5. Menghapus data pembicara dari Cloud Supabase
// =========================================================================
export const deletePembicaraById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      return res.status(400).json({ message: "ID Pembicara harus berupa angka" });
    }

    // @ts-ignore
    await prisma.pembicara.delete({
      where: { id: parsedId },
    });

    return res.json({ message: "Pembicara berhasil dihapus dari Supabase" });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan saat menghapus data pembicara", error: String(error) });
  }
};
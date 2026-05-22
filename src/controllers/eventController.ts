import type { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// 1. AMBIL SEMUA DATA EVENT
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    // Tanpa include karena di schema.prisma model Event kalian tidak ada relasi objek
    // @ts-ignore
    const data = await (prisma.Event || prisma.event).findMany();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error GET ALL Events:", error);
    return res.status(500).json({ message: "Gagal mengambil data event", error: String(error) });
  }
};

// 2. BUAT EVENT BARU (FORM TAMBAH EVENT)
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { name, categoryId, location, dateEvent, description } = req.body;

    // Validasi input wajib sesuai skema database
    if (!name || !categoryId || !location || !dateEvent || !description) {
      return res.status(400).json({ message: "Semua data form wajib diisi!" });
    }

    // @ts-ignore
    const newEvent = await (prisma.Event || prisma.event).create({
      data: {
        name,
        location,
        description,
        dateEvent: new Date(dateEvent), // Konversi string date HTML ke format DateTime Prisma
        categoryId: String(categoryId), // FIXED: Di schema berupa String, kita kunci ke String!
      },
    });

    return res.status(201).json({ message: "Event berhasil dibuat", data: newEvent });
  } catch (error) {
    console.error("Error POST Event:", error);
    return res.status(500).json({ message: "Gagal membuat event", error: String(error) });
  }
};

// 3. DETAIL EVENT BERDASARKAN ID
export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Di schema id adalah Int autoincrement, maka wajib diubah ke Number
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      return res.status(400).json({ message: "ID Event harus berupa angka murni" });
    }

    // @ts-ignore
    const event = await (prisma.Event || prisma.event).findUnique({
      where: { id: parsedId }
    });

    if (!event) {
      return res.status(404).json({ message: "Event tidak ditemukan" });
    }
    return res.status(200).json(event);
  } catch (error) {
    console.error("Error GET BY ID Event:", error);
    return res.status(500).json({ message: "Gagal mengambil detail event", error: String(error) });
  }
};

// 4. UPDATE EVENT
export const updateEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, categoryId, location, dateEvent, description } = req.body;
    
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      return res.status(400).json({ message: "ID Event harus berupa angka murni" });
    }

    // @ts-ignore
    const updatedEvent = await (prisma.Event || prisma.event).update({
      where: { id: parsedId },
      data: {
        name,
        location,
        description,
        dateEvent: dateEvent ? new Date(dateEvent) : undefined,
        categoryId: categoryId ? String(categoryId) : undefined,
      },
    });

    return res.status(200).json({ message: "Event berhasil diupdate", data: updatedEvent });
  } catch (error) {
    console.error("Error UPDATE Event:", error);
    return res.status(500).json({ message: "Gagal mengupdate event", error: String(error) });
  }
};

// 5. HAPUS EVENT
export const deleteEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      return res.status(400).json({ message: "ID Event harus berupa angka murni" });
    }

    // @ts-ignore
    await (prisma.Event || prisma.event).delete({
      where: { id: parsedId },
    });

    return res.status(200).json({ message: "Event berhasil dihapus" });
  } catch (error) {
    console.error("Error DELETE Event:", error);
    return res.status(500).json({ message: "Gagal menghapus event", error: String(error) });
  }
};
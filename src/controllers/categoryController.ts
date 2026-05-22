import type { Request, Response } from "express";
import { prisma } from "../lib/db.js"; 

// 1. MENAMPILKAN SEMUA CATEGORY (GET ALL)
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const data = await (prisma.Category || prisma.category).findMany();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error Detail Kategori GET ALL:", error);
    return res.status(500).json({ message: "Gagal mengambil data kategori", error: String(error) });
  }
};

// 2. MENYIMPAN DATA CATEGORY BARU (POST)
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Nama kategori harus diisi" });
    }
    // @ts-ignore
    const newCategory = await (prisma.Category || prisma.category).create({
      data: { name }
    });
    return res.status(201).json({ message: "Kategori berhasil dibuat", data: newCategory });
  } catch (error) {
    console.error("Error Detail Kategori POST:", error);
    return res.status(500).json({ message: "Gagal membuat data kategori", error: String(error) });
  }
};

// 3. MENAMPILKAN DATA CATEGORY BERDASARKAN ID (GET BY ID)
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Trik Pengaman: Cek apakah ID-nya angka atau string UUID, lalu konversi otomatis
    const parsedId = isNaN(Number(id)) ? String(id) : Number(id);

    // @ts-ignore
    const category = await (prisma.Category || prisma.category).findUnique({
      where: { id: parsedId }
    });
    
    if (!category) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }
    return res.status(200).json(category);
  } catch (error) {
    console.error("Error Detail Kategori GET BY ID:", error);
    return res.status(500).json({ message: "Gagal mengambil data kategori", error: String(error) });
  }
};

// 4. MENGUPDATE DATA CATEGORY BERDASARKAN ID (PUT)
export const updateCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: "Nama kategori harus diisi untuk diupdate" });
    }

    const parsedId = isNaN(Number(id)) ? String(id) : Number(id);

    // @ts-ignore
    const updatedCategory = await (prisma.Category || prisma.category).update({
      where: { id: parsedId },
      data: { name }
    });
    return res.status(200).json({ message: "Kategori berhasil diupdate", data: updatedCategory });
  } catch (error) {
    console.error("Error Detail Kategori UPDATE:", error);
    return res.status(500).json({ message: "Gagal mengupdate data kategori", error: String(error) });
  }
};

// 5. MENGHAPUS DATA CATEGORY BERDASARKAN ID (DELETE)
export const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const parsedId = isNaN(Number(id)) ? String(id) : Number(id);

    // @ts-ignore
    await (prisma.Category || prisma.category).delete({
      where: { id: parsedId }
    });
    return res.status(200).json({ message: "Kategori berhasil dihapus" });
  } catch (error) {
    console.error("Error Detail Kategori DELETE:", error);
    return res.status(500).json({ message: "Gagal menghapus data kategori", error: String(error) });
  }
};
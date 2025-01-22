import Admin from "../models/AdminModels.js";
import bcrypt from "bcrypt";

// Fungsi untuk login admin
export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Cari admin berdasarkan username
    const admin = await Admin.findOne({ where: { username } });

    // Jika admin tidak ditemukan
    if (!admin) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Verifikasi password
    const isPasswordValid = await Admin.verifyPassword(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Jika login berhasil
    res.status(200).json({
      message: "Login successful",
      admin: {
        id: admin.id,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error("Error saat login admin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fungsi untuk mendaftarkan admin
export const registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Periksa apakah username sudah digunakan
    const existingAdmin = await Admin.findOne({ where: { username } });
    if (existingAdmin) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password dan buat admin baru
    const newAdmin = await Admin.create({
      username,
      password,
    });

    // Jika berhasil
    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: newAdmin.id,
        username: newAdmin.username,
      },
    });
  } catch (error) {
    console.error("Error saat mendaftarkan admin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

// Konfigurasi koneksi ke database
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

// Definisi model Admin
const Admin = sequelize.define(
  "tbl_admin",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hook sebelum menyimpan admin, hash password
Admin.beforeCreate(async (admin) => {
  const salt = await bcrypt.genSalt(10); // Menghasilkan salt dengan 10 putaran
  admin.password = await bcrypt.hash(admin.password, salt); // Hash password
});

// Metode untuk memverifikasi password
Admin.verifyPassword = async (plainPassword, hashPassword) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};

// Sinkronisasi model dengan database
const syncModels = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database sukses terkoneksi.");
    await sequelize.sync();
    console.log("Admin model sync ke database");
  } catch (err) {
    console.error("Tidak terkoneksi ke database atau sync model:", err);
  }
};

syncModels();

export default Admin;

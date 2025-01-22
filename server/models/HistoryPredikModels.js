import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
import Anak from "./AnakModels.js";

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  "",
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const History = sequelize.define(
  "hasil_prediksi",
  {
    id_hasil: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_anak: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_anaks", // Nama tabel yang dirujuk
        key: "id_anak", // Kolom pada tabel referensi
      },
    },

    hasil: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true, // Prevent Sequelize from pluralizing table name
    timestamps: false, // Disable createdAt and updatedAt fields
  }
);

Anak.hasOne(History, { 
  foreignKey: "id_anak", 
  onDelete: "CASCADE", // Tambahkan opsi ini
  onUpdate: "CASCADE",

});

History.belongsTo(Anak, { 
  foreignKey: "id_anak" ,
  onDelete: "CASCADE", 
  onUpdate: "CASCADE",
});

// Sinkronisasi Model
const syncModels = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    await sequelize.sync({ force: false });
    await sequelize.sync({ alter: true });
    console.log("Models berhasilllllll");
  } catch (err) {
    console.error("Unable to connect to the database or sync model:", err);
  }
};

syncModels();

export default History;

// import { Sequelize, DataTypes } from 'sequelize';
// import dotenv from 'dotenv';
// dotenv.config();

// const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'mysql'
// });

// const Parameter = sequelize.define('Parameter', {
//   nilai_baca: {
//     type: DataTypes.FLOAT,
//     allowNull: false
//   },
//   nilai_tulis: {
//     type: DataTypes.FLOAT,
//     allowNull: false
//   },
//   nilai_hitung: {
//     type: DataTypes.FLOAT,
//     allowNull: false
//   },
//   nilai_pemahaman: {
//     type: DataTypes.FLOAT,
//     allowNull: false
//   },
//   nilai_berpikir: {
//     type: DataTypes.FLOAT,
//     allowNull: false
//   },
//   motivasi: {
//     type: DataTypes.FLOAT,
//     allowNull: false
//   },

//   tipe: {
//     type: DataTypes.STRING, // Atur tipe data sesuai kebutuhan
//     allowNull: true, // Jika harus wajib diisi
//   },
 
// },{
//   timestamps : false
// });


// const syncModels = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Database connection has been established successfully.');
//     await sequelize.sync({ force: false });
//     console.log('Kriteria model synced with database');
//   } catch (err) {
//     console.error('Unable to connect to the database or sync model:', err);
//   }
// };

// syncModels();

// export default Parameter;

import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
import Anak from "./AnakModels.js"

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});


// Model Parameter
const Parameter = sequelize.define('penilaians', {
  nilai_baca: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  nilai_tulis: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  nilai_hitung: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  nilai_pemahaman: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  nilai_berpikir: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  motivasi: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  id_anak: { // Tambahkan kolom foreign key
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'tbl_anaks', // Nama tabel Anak
        key: 'id_anak', // Primary key Anak
    }
  }
  
}, {
  timestamps: false
});

// Relasi antara Anak dan Parameter
Anak.hasMany(Parameter, { 
  foreignKey: 'id_anak',
  onDelete: "CASCADE", // Tambahkan opsi ini
  onUpdate: "CASCADE",
});
Parameter.belongsTo(Anak, { 
  foreignKey: 'id_anak',
  onDelete: "CASCADE", 
  onUpdate: "CASCADE",
});

// Sinkronisasi Model
const syncModels = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await sequelize.sync({ force: false });
    console.log('Models berhasilllllll');
  } catch (err) {
    console.error('Unable to connect to the database or sync model:', err);
  }
};

syncModels();

// export { Anak, Parameter };
export default Parameter;
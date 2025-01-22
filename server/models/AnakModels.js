import { Sequelize, DataTypes } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, '',{
    host : process.env.DB_HOST,
    dialect : 'mysql'
})

const Anak = sequelize.define('tbl_anaks', {
    id_anak : {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
    },

    nama_anak : {
        type : DataTypes.STRING,
        allowNull:false,
        // field: 'nama_anak'
    },
    tanggal_lahir: {
        type : DataTypes.DATE,
        allowNull:false,
        // field: 'tanggal_lahir'
    },
    usia : {
        type : DataTypes.INTEGER,
        allowNull:false
    },

    kelas : {
        type : DataTypes.STRING,
        allowNull:false
    },

    hobi : {
        type : DataTypes.STRING,
        allowNull:false
    },
    jenis_kelamin :{
        type : DataTypes.STRING,
        allowNull:false,
        field: 'jenis_kelamin'
    },
    alamat :{
        type : DataTypes.STRING,
        allowNull:false
    },
    foto :{
        type : DataTypes.STRING,
        allowNull:true,
        field: 'Foto'
    }
}, {
    timestamps: false, // Nonaktifkan createdAt dan updatedAt jika tidak dibutuhkan
    tableName: 'tbl_anaks',

})

//melakukan syncModel
const syncModel = async ( )=>{
    try {
        await sequelize.authenticate();
        console.log('Database sudah terkoneksi')
        await sequelize.sync();
        console.log('Model Anak sudah terkoneksi')
    } catch (err) {
        console.error('Terjadi kesalahan di model anak', err)
    }
    
}

syncModel();

export default Anak;


import  express from "express";
import  mysql from "mysql";
import  cors from "cors";
import  dotenv from "dotenv";
import path from 'path'
import { fileURLToPath } from 'url';

dotenv.config()
import AnakRoute from './routes/AnakRoute.js'
import AdminRoute from './routes/AdminRoute.js'
import PenilaianRoute from './routes/Penilaian.js'
import HistoryPredikRoute from './routes/HistoryPredikRoute.js'
import bodyParser from 'body-parser'
const app = express()



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// // parse application/json
app.use(bodyParser.json());



// konfigurasi koneksi ke database mysql
const connection = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : '',
    database : process.env.DB_DATABASE
})

//membuka koneksi ke database

connection.connect((err) => {
    if(err){
        console.error('Koneksi error ke Mysql :', err)
        return 
    }
    console.log('Koneksi berhasil ke Mysql')

})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })); // Parsing form data
app.use(AnakRoute)
app.use(AdminRoute)
app.use(PenilaianRoute)
app.use(HistoryPredikRoute)


app.listen(process.env.PORT,() =>{console.log('server sedang berjalan',process.env.PORT)})
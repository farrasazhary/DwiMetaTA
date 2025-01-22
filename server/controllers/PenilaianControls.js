import Parameter from "../models/PenilaianModels.js";
import { exec } from "child_process";

export const getParameters = async (req, res) => {
  try {
    const parameters = await Parameter.findAll();
    res.json(parameters);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getParameterById = async (req, res) => {
  try {
    const parameter = await Parameter.findByPk(req.params.id);
    if (!parameter) {
      return res.status(404).json({ message: "Parameter not found" });
    }
    res.json(parameter);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const saveParameter = async (req, res) => {
  console.log("Data received:", req.body);
  const {
    nilai_baca,
    nilai_hitung,
    nilai_tulis,
    nilai_pemahaman,
    nilai_berpikir,
    motivasi,
    id_anak,
  } = req.body;

  const { usia, kelas, jenis_kelamin } = await Anak.findByPk(id_anak);
  const predictData = [
    usia,
    kelas,
    nilai_baca,
    nilai_hitung,
    nilai_pemahaman,
    nilai_berpikir,
    motivasi,
    nilai_tulis,
    jenis_kelamin,
    
  ];

  const predictResult = await runPythonAsync(
    predictData.map((item) =>
      !isNaN(item) && !isNaN(parseFloat(item))
        ? parseInt(item, 10)
        : item === "Perempuan"
        ? 0
        : 1
    )
  );

  const tipe = JSON.parse(predictResult)[0];
  console.log("Prediction Result: ", tipe);

  try {
    const newParameter = await Parameter.create({
      nilai_baca,
      nilai_hitung,
      nilai_tulis,
      nilai_pemahaman,
      nilai_berpikir,
      motivasi,
      id_anak,
    });

    newParameter.dataValues.tipe = tipe;

    res.status(201).json(newParameter);
  } catch (err) {
    console.error("Error while saving data:", err);
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateParameter = async (req, res) => {
    try {
      const { id } = req.params; // Ambil ID dari URL
      const {
        nilai_baca,
        nilai_tulis,
        nilai_hitung,
        nilai_pemahaman,
        nilai_berpikir,
        motivasi,
      } = req.body; // Ambil data dari request body
  
      // Validasi data
      if (
        !nilai_baca ||
        !nilai_tulis ||
        !nilai_hitung ||
        !nilai_pemahaman ||
        !nilai_berpikir ||
        !motivasi
      ) {
        return res.status(400).json({ message: "Semua data harus diisi." });
      }
  
      // Cek apakah parameter dengan ID tersebut ada
      const parameter = await Parameter.findByPk(id);
      if (!parameter) {
        return res.status(404).json({ message: "Parameter tidak ditemukan." });
      }
  
      // Update parameter
      await parameter.update({
        nilai_baca,
        nilai_tulis,
        nilai_hitung,
        nilai_pemahaman,
        nilai_berpikir,
        motivasi,
      });
  
      res.status(200).json({ message: "Parameter berhasil diperbarui." });
    } catch (err) {
      res.status(500).json({
        message: "Terjadi kesalahan server: " + err.message,
      });
    }
  };
  

export const deleteParameter = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedParameter = await Parameter.destroy({
      where: { id },
    });

    if (!deletedParameter) {
      return res.status(404).json({ message: "Parameter not found" });
    }

    res.status(200).json({ message: "Parameter deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getParametersByAnakId = async (req, res) => {
  try {
    const { id_anak } = req.params;

    if (isNaN(id_anak)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const anak = await Anak.findByPk(id_anak, {
      include: [
        {
          model: Parameter,
          attributes: [
            "nilai_baca",
            "nilai_tulis",
            "nilai_hitung",
            "nilai_pemahaman",
            "nilai_berpikir",
            "motivasi",
          ],
        },
      ],
    });

    if (!anak) {
      return res.status(404).json({ message: "Anak not found" });
    }

    res.json(anak);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: error.message });
  }
};

import Anak from "../models/AnakModels.js";

// Fungsi untuk mengambil data penilaian dengan nama anak
export const getNilaiWithAnak = async (req, res) => {
  try {
    // Gunakan Sequelize untuk mengambil data dengan relasi antara Anak dan Penilaian
    const results = await Parameter.findAll({
      include: [
        {
          model: Anak,
          attributes: ["nama_anak"],
        },
      ],
    });

    res.json(results);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// tambahan
function runPythonAsync(data) {
  const jsonData = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    const pythonCommand = `python -c "import pickle;import warnings;from sklearn.exceptions import InconsistentVersionWarning;warnings.filterwarnings('ignore',category=InconsistentVersionWarning);warnings.filterwarnings('ignore', category=UserWarning, message='X does not have valid feature names');print(pickle.load(open('knn_model_skripsi1.pickle', 'rb')).predict([${jsonData}]))"`;

    // const pwshCommand = `powershell -Command ${JSON.stringify("pwd")}`;
    const pwshCommand = `powershell -Command ${JSON.stringify(pythonCommand)}`;
    console.log("Command:");
    console.log(pythonCommand);
    exec(pwshCommand, (error, stdout, stderr) => {
      if (error) {
        return reject(`Error: ${error.message}`);
      }
      if (stderr) {
        return reject(`Standard Error: ${stderr}`);
      }
      resolve(stdout.trim());
    });
  });
}

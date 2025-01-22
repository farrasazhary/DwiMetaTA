import HasilPredik from "../models/HistoryPredikModels.js";
import Anak from "../models/AnakModels.js";

// Get all prediction results
export const getAllHasilPredik = async (req, res) => {
  try {
    const hasilPredik = await HasilPredik.findAll(); // Fetch all records
    res.status(200).json(hasilPredik);
  } catch (error) {
    res.status(500).json({ error: "Error fetching prediction results" });
  }
};

// Get a single prediction result by ID
export const getHasilPredikById = async (req, res) => {
  try {
    const { id } = req.params;
    const hasilPredik = await HasilPredik.findByPk(id);
    if (!hasilPredik) {
      return res.status(404).json({ error: "Prediction result not found" });
    }
    res.status(200).json(hasilPredik);
  } catch (error) {
    res.status(500).json({ error: "Error fetching prediction result" });
  }
};

// Create a new prediction result
export const createHasilPredik = async (req, res) => {
  try {
    const { id_anak, hasil } = req.body;
    const newHasilPredik = await HasilPredik.create({
      id_anak,
      hasil,
    });
    res.status(201).json(newHasilPredik);
  } catch (error) {
    res.status(500).json({ error: "Error creating prediction result" });
  }
};

// Update an existing prediction result
export const updateHasilPredik = async (req, res) => {
  try {
    const { id } = req.params;
    const { level, keterangan, tanggal_prediksi } = req.body;
    const hasilPredik = await HasilPredik.findByPk(id);
    if (!hasilPredik) {
      return res.status(404).json({ error: "Prediction result not found" });
    }
    await hasilPredik.update({ level, keterangan, tanggal_prediksi });
    res.status(200).json(hasilPredik);
  } catch (error) {
    res.status(500).json({ error: "Error updating prediction result" });
  }
};

// Delete a prediction result
export const deleteHasilPredik = async (req, res) => {
  try {
    const { id } = req.params;
    const hasilPredik = await HasilPredik.findByPk(id);
    if (!hasilPredik) {
      return res.status(404).json({ error: "Prediction result not found" });
    }
    await hasilPredik.destroy();
    res.status(200).json({ message: "Prediction result deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting prediction result" });
  }
};

export const getHasilPredikByAnakId = async (req, res) => {
  try {
    const anak = await Anak.findOne({
      where: { id_anak: req.params.id },
      include: [
        {
          model: HasilPredik,
          required: true, // Inner join
          on: {
            // "$Anak.id$": {
            //   [Sequelize.Op.eq]: Sequelize.col("Penilaian.id_anak"),
            // },
            id_anak: req.params.id,
          },
        },
      ],
    });

    console.log(req.params.id);
    console.log(anak);
    res.json(anak);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      massage: err.massage,
    });
  }
};

// Get all prediction results with names
export const getPredikWithAnak = async (req, res) => {
  try {
    // Gunakan Sequelize untuk mengambil data dengan relasi antara Anak dan Penilaian
    const results = await HasilPredik.findAll({
      include: [
        {
          model: Anak,
          attributes: ["nama_anak","id_anak"],

        },
      ],
    });

    res.json(results);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Get a single prediction result by ID with name
export const getHasilPredikWithNameById = async (req, res) => {
  try {
    const { id } = req.params;
    const hasilPredik = await HasilPredik.findByPk(id, {
      include: [
        {
          model: Anak,
          attributes: ["nama_anak"], // Hanya mengambil nama anak
        },
      ],
    });

    if (!hasilPredik) {
      return res.status(404).json({ error: "Prediction result not found" });
    }

    const formattedData = {
      id_hasil: hasilPredik.id,
      nama_anak: hasilPredik.Anak?.nama_anak || "Tidak Ditemukan",
      hasil: hasilPredik.hasil,
    };

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching prediction result by ID with name:", error);
    res.status(500).json({ error: "Error fetching prediction result by ID with name" });
  }
};

// // Create a new prediction result
// export const createHasilPredik = async (req, res) => {
//   try {
//     const { id_anak, hasil } = req.body;
//     const newHasilPredik = await HasilPredik.create({
//       id_anak,
//       hasil,
//     });
//     res.status(201).json(newHasilPredik);
//   } catch (error) {
//     console.error("Error creating prediction result:", error);
//     res.status(500).json({ error: "Error creating prediction result" });
//   }
// };

// // Update an existing prediction result
// export const updateHasilPredik = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { hasil } = req.body;
//     const hasilPredik = await HasilPredik.findByPk(id);
//     if (!hasilPredik) {
//       return res.status(404).json({ error: "Prediction result not found" });
//     }
//     await hasilPredik.update({ hasil });
//     res.status(200).json(hasilPredik);
//   } catch (error) {
//     console.error("Error updating prediction result:", error);
//     res.status(500).json({ error: "Error updating prediction result" });
//   }
// };

// Delete a prediction result
// export const deleteHasilPredik = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const hasilPredik = await HasilPredik.findByPk(id);
//     if (!hasilPredik) {
//       return res.status(404).json({ error: "Prediction result not found" });
//     }
//     await hasilPredik.destroy();
//     res.status(200).json({ message: "Prediction result deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting prediction result:", error);
//     res.status(500).json({ error: "Error deleting prediction result" });
//   }
// };

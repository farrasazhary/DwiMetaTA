import Anak from "../models/AnakModels.js";
import Parameter from "../models/PenilaianModels.js";





export const getAnak = async (req, res) => {
  try {
    const anak = await Anak.findAll();
    res.json(anak);
  } catch (err) {
    res.status(500).json({
      massage: err.massage,
    });
  }
};

export const getAnakById = async (req, res) => {
  try {
    const anak = await Anak.findByPk(req.params.id_anak);
    res.json(anak);
  } catch (err) {
    res.status(500).json({
      massage: err.massage,
    });
  }
};

export const saveAnak = async (req, res) => {
  console.log("Data diterima:", req.body);
  const anak = new Anak(await req.body);
  try {
    const insertAnak = await anak.save();
    res.status(201).json(insertAnak);
  } catch (error) {
    console.error("Error saat menyinpan data:", error);
    res.status(500).json({
      massage: error.message,
    });
  }
};


// ================================================

// export const updateAnak = async(req, res)=>{
//     try {
//         const idanak = req.params.id_anak
//         const {nama_anak,usia,jenis_kelamin,alamat} = req.body
//         const updateUser = await Anak.update(
//             {nama_anak,jenis_kelamin,alamat},
//             {where : {id_anak : idanak}}
//         )
//         res.status(200).json(updateUser)

//     } catch (error) {
//         res.status(500).json({
//             massage :error.massage
//         })
//     }
// }
export const updateAnak = async (req, res) => {
  try {
    const idanak = req.params.id_anak;
    const {
      nama_anak,
      tanggal_lahir,
      usia,
      kelas,
      hobi,
      jenis_kelamin,
      alamat,
    } = req.body;

    // Cari data anak berdasarkan id_anak
    const anak = await Anak.findByPk(idanak);

    if (!anak) {
      return res.status(404).json({ message: "Data anak tidak ditemukan" });
    }

    // Update data anak
    anak.nama_anak = nama_anak;
    anak.usia = usia;
    anak.jenis_kelamin = jenis_kelamin;
    anak.alamat = alamat;
    anak.tanggal_lahir = tanggal_lahir;
    anak.kelas = kelas;
    anak.hobi = hobi;

    // Simpan perubahan
    await anak.save();

    // Kirim respons dengan data yang sudah diperbarui
    res.status(200).json(anak);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message, // Memperbaiki 'massage' menjadi 'message'
    });
  }
};

export const deleteAnak = async (req, res) => {
  try {
    const idAnak = req.params.id_anak; // Pastikan Anda menerima parameter ini
    console.log("ID anak yang akan dihapus:", idAnak);

    const result = await Anak.destroy({
      where: { id_anak: idAnak }, // Pastikan nama kolom di database adalah 'id_anak'
    });

    if (result === 0) {
      return res.status(404).json({ message: "Data anak tidak ditemukan." });
    }

    res.status(200).json({ message: "Data berhasil dihapus.", result });
  } catch (error) {
    console.error("Error saat menghapus data:", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

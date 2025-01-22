import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../Assets/gambar-bg.jpeg";

const InputDataForm = () => {
  const [formData, setFormData] = useState({
    nama_anak: "",
    tanggal_lahir: "",
    usia: "",
    kelas: "",
    hobi: "",
    jenis_kelamin: "",
    alamat: "",
    hobi_lainnya: "",
    foto: null, // Inisialisasi state foto sebagai null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    // Otomatis hitung usia berdasarkan tanggal lahir
    if (name === "tanggal_lahir") {
      const birthDate = new Date(value);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      const monthDiff = currentDate.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        updatedValue = age - 1;
      } else {
        updatedValue = age;
      }
      setFormData({
        ...formData,
        [name]: value,
        usia: updatedValue >= 0 ? updatedValue : "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: updatedValue,
      });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0] // Ambil file pertama
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === "foto" && formData[key]) {
        dataToSubmit.append(key, formData[key], formData[key].name);
      } else {
        dataToSubmit.append(key, formData[key]);
      }
    });

    axios.post(`http://localhost:${process.env.REACT_APP_API_PORT}/anak`, dataToSubmit, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      const { id_anak } = response.data;
      alert("Data berhasil ditambahkan!");
      navigate(`/penilaian/${id_anak}`);
    })
    .catch(error => {
      console.error("Error saat mengirim data:", error);
      alert("Gagal menambahkan data!");
    });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-[#FFEBCD] p-8 rounded-lg shadow-lg w-full max-w-lg bg-opacity-90">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Form Input Data Anak
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Nama Anak
            </label>
            <input
              type="text"
              name="nama_anak"
              value={formData.nama_anak}
              onChange={handleChange}
              className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DEB887] bg-[#DEB887] bg-opacity-50"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Tanggal Lahir
            </label>
            <input
              type="date"
              name="tanggal_lahir"
              value={formData.tanggal_lahir}
              onChange={handleChange}
              className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DEB887] bg-[#DEB887] bg-opacity-50"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Usia
            </label>
            <input
              type="number"
              name="usia"
              value={formData.usia}
              readOnly
              className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DEB887] bg-[#DEB887] bg-opacity-50"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Kelas
            </label>
            <input
              type="text"
              name="kelas"
              value={formData.kelas}
              onChange={handleChange}
              className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DEB887] bg-[#DEB887] bg-opacity-50"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Hobi
            </label>
            <select
              name="hobi"
              value={formData.hobi}
              onChange={handleChange}
              className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DEB887] bg-[#DEB887] bg-opacity-50"
              required
            >
              <option value="">Pilih Hobi</option>
              <option value="Main Bola">Main Bola</option>
              <option value="Menari">Menari</option>
              <option value="Menyanyi">Menyanyi</option>
              <option value="Menggambar">Menggambar</option>
              <option value="Bercerita">Bercerita</option>
              <option value="Lainnya">Lainnya</option>
            </select>

            {formData.hobi === "Lainnya" && (
              <input
                type="text"
                name="hobi_lainnya"
                value={formData.hobi_lainnya}
                onChange={handleChange}
                className="w-full mt-2 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DEB887] bg-[#DEB887] bg-opacity-50"
                placeholder="Masukkan Hobi Lainnya"
                required
              />
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Jenis Kelamin
            </label>
            <select
              name="jenis_kelamin"
              value={formData.jenis_kelamin}
              onChange={handleChange}
              className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DEB887] bg-[#DEB887] bg-opacity-50"
              required
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Laki-Laki">Laki-Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Alamat
            </label>
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DEB887] bg-[#DEB887] bg-opacity-50"
              rows="3"
              required
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Foto
            </label>
            <input
              type="file"
              name="foto"
              onChange={handleFileChange}
              className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DEB887] bg-[#DEB887] bg-opacity-50"
              accept="image/*" // Membatasi file hanya untuk gambar
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 font-bold text-white transition duration-200 bg-yellow-600 rounded-md hover:bg-yellow-700"
            >
              Selanjutnya
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputDataForm;


// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import backgroundImage from "../Assets/gambar-bg.jpeg";

// const InputDataForm = () => {
//   const [formData, setFormData] = useState({
//     nama_anak: "",
//     tanggal_lahir: "",
//     usia: "",
//     kelas: "",
//     hobi: "",
//     jenis_kelamin: "",
//     alamat: "",
//     hobi_lainnya: "",
//     foto: null, // Inisialisasi state foto sebagai null
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let updatedValue = value;

//     // Otomatis hitung usia berdasarkan tanggal lahir
//     if (name === "tanggal_lahir") {
//       const birthDate = new Date(value);
//       const currentDate = new Date();
//       const age = currentDate.getFullYear() - birthDate.getFullYear();
//       const monthDiff = currentDate.getMonth() - birthDate.getMonth();
//       if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
//         updatedValue = age - 1;
//       } else {
//         updatedValue = age;
//       }
//       setFormData({
//         ...formData,
//         [name]: value,
//         usia: updatedValue >= 0 ? updatedValue : "",
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: updatedValue,
//       });
//     }
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files[0] // Ambil file pertama
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const dataToSubmit = new FormData();
//     Object.keys(formData).forEach(key => {
//       if (key === "foto" && formData[key]) {
//         dataToSubmit.append(key, formData[key], formData[key].name);
//       } else {
//         dataToSubmit.append(key, formData[key]);
//       }
//     });

//     axios.post(`http://localhost:${process.env.REACT_APP_API_PORT}/anak`, dataToSubmit, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     })
//     .then(response => {
//       const { id_anak } = response.data;
//       alert("Data berhasil ditambahkan!");
//       navigate(`/penilaian/${id_anak}`);
//     })
//     .catch(error => {
//       console.error("Error saat mengirim data:", error);
//       alert("Gagal menambahkan data!");
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="nama_anak" value={formData.nama_anak} onChange={handleChange} placeholder="Nama Anak" />
//       <input type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} />
//       <input type="text" name="kelas" value={formData.kelas} onChange={handleChange} placeholder="Kelas" />
//       <input type="text" name="hobi" value={formData.hobi} onChange={handleChange} placeholder="Hobi" />
//       <input type="text" name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange} placeholder="Jenis Kelamin" />
//       <input type="text" name="alamat" value={formData.alamat} onChange={handleChange} placeholder="Alamat" />
//       <input type="text" name="hobi_lainnya" value={formData.hobi_lainnya} onChange={handleChange} placeholder="Hobi Lainnya" />
//       <input type="file" name="foto" onChange={handleFileChange} />
//       <button type="submit">Kirim Data</button>
//     </form>
//   );
// };

// export default InputDataForm;

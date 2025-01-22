import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams untuk mendapatkan id_anak dari URL
import backgroundImage from "../Assets/gambar-bg.jpeg"; // Tambahkan gambar background di Assets

const EditDataForm = () => {
  const { id_anak } = useParams(); // Ambil id_anak dari URL
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const [formData, setFormData] = useState({
    nama_anak: "",
    tanggal_lahir: "",
    usia: "",
    kelas: "",
    hobi: "",
    jenis_kelamin: "",
    alamat: "",
  });

  // useEffect(() => {
  //   // Fetch data anak berdasarkan id_anak
  //   axios
  //     .get(`http://localhost:5000/anak/${id_anak}`)
  //     .then((response) => {
  //       setFormData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Gagal mendapatkan data anak:", error);
  //       alert("Gagal memuat data anak.");
  //     });
  // }, [id_anak]);
  useEffect(() => {
    // Fetch data anak berdasarkan id_anak
    axios
      .get(`http://localhost:${process.env.REACT_APP_API_PORT}/anak/${id_anak}`)
      .then((response) => {
        const anakData = response.data;

        // Mengubah tanggal_lahir menjadi format YYYY-MM-DD jika diperlukan
        const formattedTanggalLahir = anakData.tanggal_lahir
          ? new Date(anakData.tanggal_lahir).toISOString().split("T")[0]
          : "";

        setFormData({
          ...anakData,
          tanggal_lahir: formattedTanggalLahir,
        });
      })
      .catch((error) => {
        console.error("Gagal mendapatkan data anak:", error);
        alert("Gagal memuat data anak.");
      });
  }, [id_anak]);

  // if (!formData.nama_anak) {
  //   // Menampilkan loading sementara data belum dimuat
  //   return <div>Loading...</div>;
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Data yang diperbarui:", formData);

  //   // Kirim data yang diperbarui ke backend
  //   axios
  //     .patch(`http://localhost:5000/anak/${id_anak}`, formData)
  //     .then((response) => {
  //       console.log("Respon dari server:", response.data);
  //       alert("Data berhasil diperbarui!");

  //       // Setelah data berhasil disubmit, arahkan ke halaman sebelumnya
  //       navigate("/dataanak"); // Navigasi ke halaman daftar anak
  //     })
  //     .catch((error) => {
  //       console.error("Error saat memperbarui data:", error);
  //       alert("Gagal memperbarui data!");
  //     });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data yang diperbarui:", formData);

    // Kirim data yang diperbarui ke backend
    axios
      .patch(
        `http://localhost:${process.env.REACT_APP_API_PORT}/anak/${id_anak}`,
        formData
      )
      .then((response) => {
        console.log("Respon dari server:", response.data);
        alert("Data berhasil diperbarui!");

        // Setelah data berhasil disubmit, arahkan ke halaman sebelumnya
        navigate("/dataanak"); // Navigasi ke halaman daftar anak
      })
      .catch((error) => {
        console.error("Error saat memperbarui data:", error);
        alert("Gagal memperbarui data!");
      });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Form Container */}
      <div className="bg-[#FFEBCD] p-8 rounded-lg shadow-lg w-full max-w-lg bg-opacity-90">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Form Edit Data Anak
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Anak */}
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

          {/* Tanggal Lahir */}
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

          {/* Usia */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Usia
            </label>
            <input
              type="number"
              name="usia"
              value={formData.usia}
              onChange={handleChange}
              className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DEB887] bg-[#DEB887] bg-opacity-50"
              required
            />
          </div>

          {/* Kelas */}
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

          {/* Hobi */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Hobi
            </label>
            <input
              type="text"
              name="hobi"
              value={formData.hobi}
              onChange={handleChange}
              className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DEB887] bg-[#DEB887] bg-opacity-50"
              required
            />
          </div>

          {/* Jenis Kelamin */}
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

          {/* Alamat */}
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

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 font-bold text-white transition duration-200 bg-yellow-600 rounded-md hover:bg-yellow-700"
            >
              Perbarui Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDataForm;

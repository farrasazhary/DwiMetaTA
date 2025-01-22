import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditNilaiAnak = () => {
  const { id_anak } = useParams(); // Ambil id_anak dari URL
  const navigate = useNavigate(); // Navigasi setelah submit
  const [formData, setFormData] = useState({
    nilai_baca: "",
    nilai_tulis: "",
    nilai_hitung: "",
    nilai_pemahaman: "",
    nilai_berpikir: "",
    motivasi: "",
  });

  useEffect(() => {
    if (!id_anak) {
      alert("ID tidak valid! Kembali ke halaman sebelumnya.");
      navigate("/data-nilai"); // Fallback ke halaman lain
      return;
    }

    console.log("ID Anak dari useParams:", id_anak); // Debug ID

    axios
      .get(`http://localhost:5000/parameter/${id_anak}`)
      .then((response) => {
        console.log("Data yang diterima:", response.data); // Debugging respons backend
        const {
          nilai_baca,
          nilai_tulis,
          nilai_hitung,
          nilai_pemahaman,
          nilai_berpikir,
          motivasi,
        } = response.data;
        setFormData({
          nilai_baca: nilai_baca || "",
          nilai_tulis: nilai_tulis || "",
          nilai_hitung: nilai_hitung || "",
          nilai_pemahaman: nilai_pemahaman || "",
          nilai_berpikir: nilai_berpikir || "",
          motivasi: motivasi || "",
        });
      })
      .catch((error) => {
        console.error("Gagal memuat data:", error);
        alert("Gagal memuat data anak.");
      });
  }, [id_anak]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(`http://localhost:5000/parameter/${id_anak}`, formData)
      .then(() => {
        alert("Data berhasil diperbarui!");
        navigate("/datanilai");
      })
      .catch((error) => {
        console.error("Gagal memperbarui data:", error);
        alert("Gagal memperbarui data.");
      });
  };

  return (
    <div className="min-h-screen bg-[#DEB887] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Edit Data Penilaian
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Kemampuan Membaca", name: "nilai_baca" },
            { label: "Kemampuan Menulis", name: "nilai_tulis" },
            { label: "Kemampuan Berhitung", name: "nilai_hitung" },
            { label: "Kemampuan Memahami", name: "nilai_pemahaman" },
            { label: "Kemampuan Berpikir", name: "nilai_berpikir" },
            { label: "Motivasi", name: "motivasi" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type="number"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-yellow-400 focus:outline-none"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditNilaiAnak;

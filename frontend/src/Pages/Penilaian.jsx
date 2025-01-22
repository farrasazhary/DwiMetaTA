import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AssessmentPage = () => {
  const navigate = useNavigate();
  const { id_anak } = useParams(); // Mengambil id_anak dari URL
  const [formData, setFormData] = useState({
    nilai_baca: "",
    nilai_hitung: "",
    nilai_tulis: "",
    nilai_pemahaman: "",
    nilai_berpikir: "",
    motivasi: "",
    id_anak: id_anak || "", // Menambahkan id_anak otomatis ke formData
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      id_anak: id_anak || prevData.id_anak, // Update id_anak jika URL berubah
    }));
  }, [id_anak]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:${process.env.REACT_APP_API_PORT}/parameter`,
        formData
      );
      const responseSavePrediksi = await axios.post(
        `http://localhost:${process.env.REACT_APP_API_PORT}/HasilPredik`,
        {
          id_anak,
          hasil: response.data.tipe,
        }
      );
      console.log("Respon dari server:", response.data);
      console.log(
        "Respon dari server Hasil Predik:",
        responseSavePrediksi.data
      );
      alert("Data berhasil ditambahkan!");

      // Navigasi ke halaman Penilaian
      navigate(`/result/${id_anak}`);
    } catch (error) {
      console.error("Error saat mengirim data:", error);
      alert("Gagal menambahkan data!");
    }
  };

  return (
    <div className="min-h-screen bg-[#DEB887] flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Form Penilaian Anak
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Kemampuan Membaca", name: "nilai_baca" },
            { label: "Kemampuan Berhitung", name: "nilai_hitung" },
            { label: "Kemampuan Menulis", name: "nilai_tulis" },
            { label: "Kemampuan Memahami", name: "nilai_pemahaman" },
            { label: "Kemampuan Berfikir", name: "nilai_berpikir" },
            { label: "Motivasi Belajar", name: "motivasi" },
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
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-yellow-400 focus:outline-none"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-2 text-white transition duration-200 bg-yellow-500 rounded-md hover:bg-yellow-600"
          >
            Prediksi
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssessmentPage;

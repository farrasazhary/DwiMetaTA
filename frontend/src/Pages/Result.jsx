import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Result = () => {
  const [resultData, setResultData] = useState({
    nama_anak: "Nama Anak",
    level: "Level",
    keterangan: "Deskripsi level yang cocok untuk anak ini.",
  });

  const { id_anak } = useParams();

  useEffect(() => {
    // Simulasikan data prediksi yang diterima dari backend
    // Anda dapat mengganti dengan axios/fetch untuk mengambil data dari server
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:${process.env.REACT_APP_API_PORT}/HasilPredik/anak/${id_anak}`
        ); // Ubah URL sesuai API Anda
        const data = await response.json();
        setResultData(data);
      } catch (error) {
        console.error("Error fetching result data:", error);
      }
    };

    fetchData();
  }, [id_anak]);

  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-gradient-to-r from-yellow-100 to-yellow-300">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Hasil Prediksi
        </h2>

        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr>
              <th className="px-6 py-3 text-lg font-semibold text-gray-700 border-b border-gray-300">
                Kategori
              </th>
              <th className="px-6 py-3 text-lg font-semibold text-gray-700 border-b border-gray-300">
                Detail
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-50">
              <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-300">
                Nama Anak
              </td>
              <td className="px-6 py-3 text-sm text-gray-700">
                {resultData.nama_anak}
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-300">
                Level
              </td>
              <td className="px-6 py-3 text-sm font-bold text-yellow-600">
                {resultData?.hasil_prediksi?.hasil}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-300">
                Keterangan
              </td>
              <td className="px-6 py-3 text-sm text-gray-700">
                {resultData?.hasil_prediksi?.hasil == 1 && "Calistung : Belajar mengenal huruf, angka, membaca dan penjumlahan serta pengurangan "}
                {resultData?.hasil_prediksi?.hasil == 2 && "Kreasi & Seni : Musik, Cerita serta Catur"}
                {resultData?.hasil_prediksi?.hasil == 3 && "Sains Eksperimen "}
              </td>
            </tr>
          </tbody>
        </table>

        <a href="/" className="mt-6">
          <button
            // onClick={() => window.location.push("/")}
            className="w-full py-2 text-white transition duration-200 bg-yellow-500 rounded-md hover:bg-yellow-600"
          >
            Kembali ke Halaman Utama
          </button>
        </a>
      </div>
    </div>
  );
};

export default Result;

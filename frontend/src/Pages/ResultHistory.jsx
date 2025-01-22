import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ResultHistory = () => {
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
  {resultData?.hasil_prediksi?.hasil == 1 && (
    <>
      <div><strong>Calistung :</strong></div>
      <ul className="list-disc ml-6">
        <li><strong>Membaca:</strong> Mengenal huruf dan suku kata untuk anak yang masih belajar membaca, serta membaca cerita pendek untuk meningkatkan pemahaman.</li>
        <li><strong>Menulis:</strong> Latihan menulis huruf dan angka, membuat kalimat sederhana, hingga mengarang cerita pendek.</li>
        <li><strong>Berhitung:</strong> Mengenal angka, penjumlahan, pengurangan, serta permainan berhitung untuk melatih logika.</li>
      </ul>
    </>
  )}
  {resultData?.hasil_prediksi?.hasil == 2 && (
    <>
      <div><strong>Seni dan Kreasi :</strong></div>
      <ul className="list-disc ml-6">
        <li><strong>Catur:</strong> Mengenal dasar permainan catur, strategi sederhana, dan turnamen kecil untuk melatih keterampilan.</li>
        <li><strong>Tari:</strong> Latihan gerakan dasar tari tradisional atau modern, menyusun koreografi kecil, serta pentas tari bersama.</li>
        <li><strong>Nyanyi:</strong> Menghafal lagu anak-anak atau lagu daerah, latihan teknik vokal, dan pentas menyanyi bersama.</li>
        <li><strong>Kelas Cerita:</strong> Mendengarkan dongeng, diskusi nilai moral cerita, dan membuat cerita sederhana berdasarkan imajinasi anak.</li>
      </ul>
    </>
  )}
  {resultData?.hasil_prediksi?.hasil == 3 && (
    <>
      <div><strong>Sains Eksperimen :</strong></div>
      <ul className="list-disc ml-6">
        <li><strong>Daur Hidup Kupu-Kupu:</strong> Membuat model siklus hidup kupu-kupu dengan bahan sederhana, observasi telur serangga, dan diskusi tentang metamorfosis.</li>
        <li><strong>Roket dari Air:</strong> Membuat roket sederhana menggunakan botol plastik, air, dan pompa udara, serta memahami prinsip tekanan udara yang menghasilkan gaya dorong.</li>
      </ul>
    </>
  )}
</td>


            </tr>
          </tbody>
        </table>

        <a href="/history" className="mt-6">
          <button
            // onClick={() => window.location.push("/")}
            className="w-full py-2 text-white transition duration-200 bg-yellow-500 rounded-md hover:bg-yellow-600"
          >
            Kembali
          </button>
        </a>
      </div>
    </div>
  );
};

export default ResultHistory;

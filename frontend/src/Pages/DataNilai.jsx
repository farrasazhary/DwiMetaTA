import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const DataNilai = () => {
  const [dataNilai, setDataNilai] = useState([]);
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    axios
      .get(`http://localhost:${process.env.REACT_APP_API_PORT}/nilai-anak`) // Disesuaikan dengan endpoint API
      .then((response) => {
        setDataNilai(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Delete handler
  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      axios
        .delete(
          `http://localhost:${process.env.REACT_APP_API_PORT}/parameter/${id}`
        ) // Disesuaikan dengan endpoint API
        .then(() => {
          setDataNilai(dataNilai.filter((nilai) => nilai.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        });
    }
  };

  // Navigate to edit page
  const handleEdit = (id) => {
    navigate(`/edit-nilai/${id}`);
  };

  return (
    <div
      className="min-h-screen bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?education')",
      }}
    >
      <div className="bg-[#FFEBCD] bg-opacity-60 min-h-screen flex flex-col items-center p-6">
        {/* Tombol Kembali ke Halaman Utama */}
        <Link
          to="/"
          className="absolute px-4 py-2 text-white bg-blue-500 rounded top-4 right-4 hover:bg-blue-700"
        >
          Kembali
        </Link>

        <h1 className="mb-8 text-3xl font-bold text-black">Data Nilai Anak</h1>

        <div className="w-full max-w-6xl overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-lg table-auto">
            <thead className="bg-[#A0522D] text-white">
              <tr>
                <th className="px-6 py-3">No</th>
                <th className="px-6 py-3">Nama Anak</th>
                <th className="px-6 py-3">Membaca</th>
                <th className="px-6 py-3">Menulis</th>
                <th className="px-6 py-3">Berhitung</th>
                <th className="px-6 py-3">Memahami</th>
                <th className="px-6 py-3">Berpikir</th>
                <th className="px-6 py-3">Motivasi</th>
                <th className="px-6 py-3">Rata-rata</th>
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataNilai.length > 0 ? (
                dataNilai.map((nilai, index) => (
                  <tr key={nilai.id} className="text-center hover:bg-gray-100">
                    <td className="px-6 py-3 border">{index + 1}</td>
                    <td className="px-6 py-3 border">
                      {nilai.tbl_anak?.nama_anak || "Tidak Ada"}
                    </td>
                    <td className="px-6 py-3 border">{nilai.nilai_baca}</td>
                    <td className="px-6 py-3 border">{nilai.nilai_tulis}</td>
                    <td className="px-6 py-3 border">{nilai.nilai_hitung}</td>
                    <td className="px-6 py-3 border">
                      {nilai.nilai_pemahaman}
                    </td>
                    <td className="px-6 py-3 border">{nilai.nilai_berpikir}</td>
                    <td className="px-6 py-3 border">{nilai.motivasi}</td>
                    <td className="px-6 py-3 border">
                      {(
                        (nilai.nilai_baca +
                          nilai.nilai_tulis +
                          nilai.nilai_hitung +
                          nilai.nilai_pemahaman +
                          nilai.nilai_berpikir +
                          nilai.motivasi) /
                        6
                      ).toFixed(2)}
                    </td>
                    <td className="flex justify-center px-6 py-3 space-x-2 border">
                      <button
                        onClick={() => handleEdit(nilai.id)}
                        className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(nilai.id)}
                        className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="py-4 text-center">
                    Tidak ada data tersedia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataNilai;

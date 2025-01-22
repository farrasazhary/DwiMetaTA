import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const DataAnak = () => {
  const [dataAnak, setDataAnak] = useState([]);
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    axios
      .get(`http://localhost:${process.env.REACT_APP_API_PORT}/anak`)
      .then((response) => {
        setDataAnak(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Delete handler
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:${process.env.REACT_APP_API_PORT}/anak/${id}`)
      .then(() => {
        setDataAnak(dataAnak.filter((anak) => anak.id_anak !== id));
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  // Navigate to edit page
  const handleEdit = (id) => {
    navigate(`/edit-anak/${id}`);
  };

  return (
    <div
      className="min-h-screen bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?children')",
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

        <h1 className="mb-8 text-3xl font-bold text-black">Data Anak</h1>

        <div className="w-full max-w-6xl overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-lg table-auto">
            <thead className="bg-[#A0522D] text-white">
              <tr>
                <th className="px-6 py-3">No</th>
                <th className="px-6 py-3">Foto</th>
                <th className="px-6 py-3">Nama</th>
                <th className="px-6 py-3">Tanggal Lahir</th>
                <th className="px-6 py-3">Usia</th>
                <th className="px-6 py-3">Kelas</th>
                <th className="px-6 py-3">Hobi</th>
                <th className="px-6 py-3">Jenis Kelamin</th>
                <th className="px-6 py-3">Alamat</th>
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataAnak.map((anak, index) => (
                <tr
                  key={anak.id_anak}
                  className="text-center hover:bg-gray-100"
                >
                  <td className="px-6 py-3 border">{index + 1}</td>
                  <td className="px-6 py-3 border"><img src={anak.foto} alt="Foto profile" className="w-12 h-12 rounded-full" /></td>
                  <td className="px-6 py-3 border">{anak.nama_anak}</td>
                  <td className="px-6 py-3 border">
                    {new Date(anak.tanggal_lahir).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 border">{anak.usia}</td>
                  <td className="px-6 py-3 border">{anak.kelas}</td>
                  <td className="px-6 py-3 border">{anak.hobi}</td>
                  <td className="px-6 py-3 border">{anak.jenis_kelamin}</td>
                  <td className="px-6 py-3 border">{anak.alamat}</td>
                  <td className="flex-auto p-1 border">
                    <button
                      onClick={() => handleEdit(anak.id_anak)}
                      className="w-20 mb-1 px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(anak.id_anak)}
                      className="w-20 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataAnak;

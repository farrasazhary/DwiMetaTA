import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const navigate = useNavigate();

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/HasilName`
        );
        console.log("Data fetched:", response.data); // Debugging response data
        setHistoryData(response.data); // Save data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Function to go to the result page
  const handleViewResult = (id_anak) => {
    if (id_anak) {
      navigate(`/ResultHistory/${id_anak}`); // Navigate to the result page with the id_anak
    } else {
      alert("Data anak tidak ditemukan");
    }
  };
  

  // Function to delete a record
  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(
  //       `http://localhost:${process.env.REACT_APP_API_PORT || 5000}/HasilPredik/${id}`
  //     );
  //     setHistoryData((prevData) =>
  //       prevData.filter((item) => item.id_hasil !== id)
  //     ); // Update state after deletion
  //     alert("Data berhasil dihapus");
  //   } catch (error) {
  //     console.error("Error deleting data:", error);
  //     alert("Gagal menghapus data");
  //   }
  // };

  // Function to go back to the main page
  const handleBackToMain = () => {
    navigate("/"); // Navigate to the main page
  };

  return (
    <div className="min-h-screen bg-[#FFEBCD] p-6">
      {/* Background with light brown */}
      <div className="p-8 mx-auto bg-white rounded-lg shadow-lg max-w-7xl bg-opacity-90">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-4xl font-bold text-gray-800">
            Histori Prediksi Pengelompokan
          </h2>
          <button
            onClick={handleBackToMain}
            className="px-4 py-2 text-gray-800 transition duration-200 rounded-lg shadow-md hover:shadow-lg"
            style={{ backgroundColor: "#FFEBCD" }}
          >
            Kembali ke Halaman Utama
          </button>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            {/* Table Header */}
            <thead className="text-white bg-blue-300">
              <tr>
                <th className="px-4 py-3 text-left">ID Hasil</th>
                <th className="px-4 py-3 text-left">Nama Anak</th>
                <th className="px-4 py-3 text-left">Hasil</th>
                <th className="px-4 py-3 text-center">Keterangan</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {historyData.length > 0 ? (
                historyData.map((item) => (
                  <tr
                    key={item.id_hasil}
                    className="transition duration-300 hover:bg-pink-100"
                  >
                    <td className="px-4 py-3">{item.id_hasil}</td>
                    <td className="px-4 py-3">
                      {item.tbl_anak?.nama_anak || "Tidak Ditemukan"}
                    </td>
                    <td className="px-4 py-3">{item.hasil}</td>
                    <td className="flex justify-center px-4 py-3 space-x-4">
                      {/* View Button */}
                      <button
                        onClick={() => handleViewResult(item.id_anak)} // Pass id_anak to the result page
                        className="px-3 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                      >
                        Lihat
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-3 text-center">
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

export default History;

import React from "react";
import ResponsiveAppBar from "../Component/Navbar";
import gambar from "../Assets/gambar-bg.jpeg";

const HalamanUtama = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <ResponsiveAppBar />

      {/* Content */}
      <div
        className="flex flex-col items-center flex-grow bg-cover bg-center bg-no-repeat justify-start"
        style={{
          backgroundImage: `url(${gambar})`, // Gambar sebagai background
        }}
      >
        {/* Main Info Field */}
        <div className="bg-white bg-opacity-60 hover:bg-opacity-80 p-8 rounded-lg shadow-lg text-center mt-8 max-w-3xl mx-auto transition duration-300 ease-in-out">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            HELLO! WELCOME TO TBM KOLONG
          </h1>
          <h2 className="text-2xl text-gray-700 mb-4">
            MARI BELAJAR SAMBIL BERSENANG-SENANG
          </h2>
          <p className="text-lg text-gray-600">
            Aplikasi ini adalah sistem berbasis web yang dirancang untuk membantu
            proses klasifikasi penempatan anak ke dalam program di TBM Kolong
            berdasarkan usia dan kemampuan anak.
          </p>
        </div>

        {/* Level Info Fields */}
        <div className="flex flex-row gap-6 mt-12">
          <div className="bg-white bg-opacity-60 hover:bg-opacity-80 p-6 rounded-lg shadow-lg w-64 text-center transition duration-300 ease-in-out">
            <h3 className="text-2xl font-bold text-gray-800">Level 1 : Calistung</h3>
            <p className="text-gray-600 mt-2">
              Fokus pada pengembangan kemampuan dasar seperti membaca, menulis,
              dan berhitung.
            </p>
          </div>
          <div className="bg-white bg-opacity-60 hover:bg-opacity-80 p-6 rounded-lg shadow-lg w-64 text-center transition duration-300 ease-in-out">
            <h3 className="text-2xl font-bold text-gray-800">Level 2 : Kreasi & Seni</h3>
            <p className="text-gray-600 mt-2">
              Mengembangkan logika, kreativitas, dan pemahaman melalui kegiatan
              seni dan keterampilan lainnya.
            </p>
          </div>
          <div className="bg-white bg-opacity-60 hover:bg-opacity-80 p-6 rounded-lg shadow-lg w-64 text-center transition duration-300 ease-in-out">
            <h3 className="text-2xl font-bold text-gray-800">Level 3 : Sains Eksperimen</h3>
            <p className="text-gray-600 mt-2">
              Membantu anak-anak berpikir kritis dan logis melalui kegiatan
              berbasis eksperimen sains.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HalamanUtama;

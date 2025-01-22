-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 21, 2025 at 08:10 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skripsi_knn`
--

-- --------------------------------------------------------

--
-- Table structure for table `anaks`
--

CREATE TABLE `anaks` (
  `id` int(11) NOT NULL,
  `nama_anak` varchar(255) NOT NULL,
  `tanggal_lahir` datetime NOT NULL,
  `usia` int(11) NOT NULL,
  `kelas` varchar(255) NOT NULL,
  `hobi` varchar(255) DEFAULT NULL,
  `jenis_kelamin` varchar(255) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hasil_prediksi`
--

CREATE TABLE `hasil_prediksi` (
  `id_hasil` int(11) NOT NULL,
  `id_anak` int(11) NOT NULL,
  `hasil` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hasil_prediksi`
--

INSERT INTO `hasil_prediksi` (`id_hasil`, `id_anak`, `hasil`) VALUES
(19, 54, '1'),
(20, 55, '3'),
(21, 56, '2'),
(22, 57, '2'),
(23, 58, '2'),
(27, 60, '1'),
(28, 60, '1'),
(29, 60, '1'),
(30, 61, '1'),
(31, 61, '1'),
(32, 62, '1'),
(33, 62, '1'),
(34, 63, '2');

-- --------------------------------------------------------

--
-- Table structure for table `parameters`
--

CREATE TABLE `parameters` (
  `id` int(11) NOT NULL,
  `nilai_baca` float NOT NULL,
  `nilai_tulis` float NOT NULL,
  `nilai_hitung` float NOT NULL,
  `nilai_pemahaman` float NOT NULL,
  `nilai_berpikir` float NOT NULL,
  `motivasi` float NOT NULL,
  `tipe` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `penilaians`
--

CREATE TABLE `penilaians` (
  `id` int(11) NOT NULL,
  `nilai_baca` float NOT NULL,
  `nilai_tulis` float NOT NULL,
  `nilai_hitung` float NOT NULL,
  `nilai_pemahaman` float NOT NULL,
  `nilai_berpikir` float NOT NULL,
  `motivasi` float NOT NULL,
  `id_anak` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `penilaians`
--

INSERT INTO `penilaians` (`id`, `nilai_baca`, `nilai_tulis`, `nilai_hitung`, `nilai_pemahaman`, `nilai_berpikir`, `motivasi`, `id_anak`) VALUES
(44, 3, 2, 2, 1, 2, 3, 54),
(45, 3, 2, 3, 2, 2, 3, 55),
(46, 2, 2, 2, 2, 2, 3, 56),
(47, 2, 2, 3, 2, 2, 3, 57),
(48, 3, 3, 2, 2, 3, 2, 58),
(52, 2, 2, 1, 2, 2, 3, 60),
(53, 2, 2, 1, 2, 2, 3, 60),
(54, 2, 2, 1, 2, 2, 3, 60),
(55, 1, 1, 2, 2, 2, 3, 61),
(56, 1, 1, 2, 2, 2, 3, 61),
(57, 1, 1, 2, 2, 1, 2, 62),
(58, 1, 1, 2, 2, 1, 2, 62),
(59, 1, 1, 2, 2, 2, 1, 63);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admins`
--

CREATE TABLE `tbl_admins` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_admins`
--

INSERT INTO `tbl_admins` (`id`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(2, 'intan21', '$2b$10$qCkoG0MA/VbTFTEIu2IpdeDwah2yn/5u2emiw2dgCcKrdSnp2bm2C', '2024-11-26 15:37:54', '2024-11-26 15:37:54');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_anaks`
--

CREATE TABLE `tbl_anaks` (
  `id_anak` int(11) NOT NULL,
  `nama_anak` varchar(255) DEFAULT NULL,
  `tanggal_lahir` datetime DEFAULT NULL,
  `usia` int(11) DEFAULT NULL,
  `kelas` varchar(255) DEFAULT NULL,
  `hobi` varchar(255) DEFAULT NULL,
  `jenis_kelamin` varchar(255) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `foto` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_anaks`
--

INSERT INTO `tbl_anaks` (`id_anak`, `nama_anak`, `tanggal_lahir`, `usia`, `kelas`, `hobi`, `jenis_kelamin`, `alamat`, `foto`) VALUES
(54, 'Dea', '2018-05-03 00:00:00', 6, '1', 'mewarnai', 'Perempuan', 'Ciputat  pasar', '0000-00-00 00:00:00'),
(55, 'Selo', '2014-05-05 00:00:00', 10, '5', 'melukis', 'Laki-Laki', 'Ciputat', '0000-00-00 00:00:00'),
(56, 'Shelaa', '2017-08-05 00:00:00', 7, '2', 'menari', 'Perempuan', 'Ciputat', '0000-00-00 00:00:00'),
(57, 'Tania', '2017-05-05 00:00:00', 7, '1', 'mewarnai', 'Perempuan', 'Ciputat', '0000-00-00 00:00:00'),
(58, 'Tania', '2025-01-31 00:00:00', 7, '1', 'mewarnai', 'Laki-Laki', 'dd', '0000-00-00 00:00:00'),
(60, 'Sabila', '2025-01-14 00:00:00', 0, 'TK', 'Menyanyi', 'Laki-Laki', 'dd', '0000-00-00 00:00:00'),
(61, 'Tania', '2018-02-21 00:00:00', 6, '1', 'Bercerita', 'Perempuan', 'labuan', '0000-00-00 00:00:00'),
(62, 'Tania', '2018-01-23 00:00:00', 6, '1', 'Main Bola', 'Perempuan', 'ccc', ''),
(63, 'Tania', '2017-12-20 00:00:00', 7, '1', 'Main Bola', 'Perempuan', 'Ciputat', ''),
(64, 'Sabila', '2013-01-21 00:00:00', 12, 'TK', 'Main Bola', 'Laki-Laki', 'Ciputat', 'null');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `anaks`
--
ALTER TABLE `anaks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hasil_prediksi`
--
ALTER TABLE `hasil_prediksi`
  ADD PRIMARY KEY (`id_hasil`),
  ADD KEY `id_anak` (`id_anak`);

--
-- Indexes for table `parameters`
--
ALTER TABLE `parameters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `penilaians`
--
ALTER TABLE `penilaians`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_anak` (`id_anak`);

--
-- Indexes for table `tbl_admins`
--
ALTER TABLE `tbl_admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `tbl_anaks`
--
ALTER TABLE `tbl_anaks`
  ADD PRIMARY KEY (`id_anak`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `anaks`
--
ALTER TABLE `anaks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hasil_prediksi`
--
ALTER TABLE `hasil_prediksi`
  MODIFY `id_hasil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `parameters`
--
ALTER TABLE `parameters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `penilaians`
--
ALTER TABLE `penilaians`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `tbl_admins`
--
ALTER TABLE `tbl_admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_anaks`
--
ALTER TABLE `tbl_anaks`
  MODIFY `id_anak` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `hasil_prediksi`
--
ALTER TABLE `hasil_prediksi`
  ADD CONSTRAINT `hasil_prediksi_ibfk_1` FOREIGN KEY (`id_anak`) REFERENCES `tbl_anaks` (`id_anak`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `parameters`
--
ALTER TABLE `parameters`
  ADD CONSTRAINT `parameters_ibfk_1` FOREIGN KEY (`id`) REFERENCES `tbl_anaks` (`id_anak`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `penilaians`
--
ALTER TABLE `penilaians`
  ADD CONSTRAINT `penilaians_ibfk_1` FOREIGN KEY (`id_anak`) REFERENCES `tbl_anaks` (`id_anak`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

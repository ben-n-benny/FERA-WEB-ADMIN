-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 12, 2022 at 01:39 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fera`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(100) NOT NULL,
  `fullname` text NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL,
  `address` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `password`, `email`, `address`) VALUES
(15, 'John', '$2y$10$enPXQ75egh34GH2uir8ETOYEQmAA/gF21LVZ/ztIDSGAyh6iTo5oK', 'Lanao@gmail.com', 'Bay, Laguna'),
(19, 'John Lanao', '$2y$10$/R0r2JY/ztsSCG3VWMUrpO3Ed2AXrAphZP2ae7mktKeVculaF9BGG', 'o@gmail.com', 'Bay, Laguna'),
(20, 'Janisnfn', '$2y$10$USUp58CWVOwS.neSNPK86eQRsHeKTEW.T1rV98Go.naoCPbIeYxW6', 'fd@gmail.com', 'Bay, Laguna'),
(21, 'John Herbert Lanao', '$2y$10$gZqdcFSSIPJc0sVSABJ87OKcX9HziUzKaLxzflSY9BSKCUHDm.T0y', 'lanao.jh@gmail.com', 'Bay, Laguna');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`) USING HASH,
  ADD UNIQUE KEY `fullname` (`fullname`) USING HASH;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

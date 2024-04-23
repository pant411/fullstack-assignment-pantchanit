-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Apr 23, 2024 at 04:20 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db-university`
--

-- --------------------------------------------------------

--
-- Table structure for table `users_admin`
--

CREATE TABLE `users_admin` (
  `id` int NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dob` datetime NOT NULL,
  `gender` enum('Male','Female','Not specified') DEFAULT 'Not specified',
  `phone_number` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users_admin`
--

INSERT INTO `users_admin` (`id`, `firstname`, `lastname`, `email`, `password`, `dob`, `gender`, `phone_number`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Admin1', 'Company', 'admin1@company.com', '$2b$12$7Rw4nXSayUOXp.0MbS5mL.8qAyvEpV4b81N0IcTEAVmXRus8MuUjW', '2024-04-22 11:07:27', 'Not specified', '0819916627', '2024-04-22 04:09:30.550040', '2024-04-22 04:09:30.550040', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users_university`
--

CREATE TABLE `users_university` (
  `id` int NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dob` datetime NOT NULL,
  `gender` enum('Male','Female','Not specified') DEFAULT 'Not specified',
  `phone_number` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `sub_district` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `zip_code` varchar(255) NOT NULL,
  `role` enum('Student','Teacher') NOT NULL,
  `status_id` int NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_university_status`
--

CREATE TABLE `users_university_status` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users_university_status`
--

INSERT INTO `users_university_status` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Active', NULL, '2024-04-22 04:03:50.459940', '2024-04-22 04:03:50.459940'),
(2, 'Inactive', NULL, '2024-04-22 04:03:50.468770', '2024-04-22 04:03:50.468770'),
(3, 'Suspended', NULL, '2024-04-22 04:03:50.471764', '2024-04-22 04:03:50.471764'),
(4, 'Locked', NULL, '2024-04-22 04:03:50.474594', '2024-04-22 04:03:50.474594'),
(5, 'Banned', NULL, '2024-04-22 04:03:50.477247', '2024-04-22 04:03:50.477247');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users_admin`
--
ALTER TABLE `users_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_university`
--
ALTER TABLE `users_university`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ee262eea52c635d975d3bbd9bf0` (`status_id`);

--
-- Indexes for table `users_university_status`
--
ALTER TABLE `users_university_status`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users_admin`
--
ALTER TABLE `users_admin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users_university`
--
ALTER TABLE `users_university`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_university_status`
--
ALTER TABLE `users_university_status`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `users_university`
--
ALTER TABLE `users_university`
  ADD CONSTRAINT `FK_ee262eea52c635d975d3bbd9bf0` FOREIGN KEY (`status_id`) REFERENCES `users_university_status` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

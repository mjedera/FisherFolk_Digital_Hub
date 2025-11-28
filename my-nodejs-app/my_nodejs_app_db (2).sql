-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2025 at 12:19 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my_nodejs_app_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `applicants`
--

CREATE TABLE `applicants` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `extra_name` varchar(50) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `sex` enum('Male','Female') DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `address` text DEFAULT NULL,
  `marital_status` enum('Single','Married','Widowed','Divorced') DEFAULT NULL,
  `applicant_type` enum('Regular','Senior Citizen','PWD','Other') DEFAULT NULL,
  `applicant_photo` longblob DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applicants`
--

INSERT INTO `applicants` (`id`, `username`, `password`, `first_name`, `middle_name`, `last_name`, `extra_name`, `age`, `sex`, `birthdate`, `address`, `marital_status`, `applicant_type`, `applicant_photo`, `created_at`) VALUES
(8, '2025-8325', '$2b$10$x2TX6cPe8TxDwAItiD2U7uAgZbSDaq5PvRtQp8L687uSzsIoo5nwu', 'Mellyville John', 'Amora', 'Edera', 'Jr', 23, 'Male', '2003-03-13', 'Poblacion, Anahawan, Southern Leyte, 6610', 'Single', 'Regular', 0x2f6170706c6963616e745f70686f746f732f313736343237343134313831365f70726f6666792e706e67, '2025-10-08 16:35:36'),
(9, '2025-4940', '$2b$10$PPpF2AlB6/3BgPnVLzBWP.yXuDmIJh80.65Fb7EBiB5H1YlTeH9Ve', 'Mark lloyd', 'ambot', 'Villoria', 'Jr', 22, 'Male', '2003-03-02', 'Poblacion, Anahawan, Southern Leyte, 6610', 'Single', 'Regular', 0x706c616365686f6c6465722d75726c, '2025-11-02 12:55:06'),
(19, 'amelyns.gatabs', '$2b$10$2G.L33zFTdbu1DNL81El1umtUW.ggVapZbFPqO02HmiwriuHSQHTy', 'Amelyns', 'budlat', 'Gatabs', NULL, 24, 'Female', '2000-02-22', 'Cogon, Anahawan, Southern Leyte, 6610', 'Single', 'Regular', NULL, '2025-11-02 20:31:29'),
(34, 'mellyville johnnn.edera', '$2b$10$miRHJ8QPZMWXflpGEE/ch.tCq0nKZpSZtXq1.uOpUUoA0F74rIo9G', 'Mellyville Johnna', 'Amora', 'Edera', NULL, 23, 'Male', '2003-03-13', 'Poblacion, Anahawan, Southern Leyte, 6610', 'Single', 'Regular', 0x2f6170706c6963616e745f70686f746f732f313736343237343031323831355f53637265656e73686f7420323032342d31302d3230203132333130372e706e67, '2025-11-27 20:06:52'),
(35, 'nicole.vero', '$2b$10$fawZsqyCwdWptZNGxGLgjOVerwb5YLwhkAF6Vn3yfczj69/FVzNpe', 'nicole', 'verooo', 'vero', 'iii', 23, 'Female', '2003-03-13', 'Poblacion, Anahawan, Southern Leyte, 6610', 'Single', 'Regular', 0x2f6170706c6963616e745f70686f746f732f313736343238303034303135355f53637265656e73686f7420323032342d31312d3230203139303533342e706e67, '2025-11-27 20:20:18'),
(36, 'nikko lass.riveral', '$2b$10$/xgIZmK1/PplChUhoQ/0nOOKqYCgMlFawZqD7LEa8mIDA/A189ahu', 'Nikko Lass', 'nikolas', 'Riveral', 'Sr.', 23, 'Male', '2002-01-03', 'Manigawng, Anahawan, Southern Leyte, 6610', 'Single', 'Regular', 0x2f6170706c6963616e745f70686f746f732f313736343237353536333033355f53637265656e73686f7420323032342d30392d3235203030303431322e706e67, '2025-11-27 20:32:29'),
(37, 'barry neil.magcosta', '$2b$10$WIsVJRW7viRy44hLcs91mO.XU5Cl9KqDuWw8rLuRpKfp7pWVUDOzu', 'Barry Neil', 'Mags', 'Magcosta', 'Sr.', 23, 'Male', '1951-09-03', 'Amagusan, Anahawan, Southern Leyte, 6610', 'Single', 'Regular', 0x2f6170706c6963616e745f70686f746f732f313736343238303032383332365f53637265656e73686f7420323032342d31312d3230203139303533342e706e67, '2025-11-27 21:47:08');

-- --------------------------------------------------------

--
-- Table structure for table `deleted_applicants_history`
--

CREATE TABLE `deleted_applicants_history` (
  `history_id` int(11) NOT NULL,
  `applicant_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `extra_name` varchar(50) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `sex` enum('Male','Female') DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `address` text DEFAULT NULL,
  `marital_status` enum('Single','Married','Widowed','Divorced') DEFAULT NULL,
  `applicant_type` enum('Regular','Senior Citizen','PWD','Other') DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_by_user_id` varchar(255) DEFAULT NULL,
  `deleted_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deleted_applicants_history`
--

INSERT INTO `deleted_applicants_history` (`history_id`, `applicant_id`, `username`, `password`, `first_name`, `middle_name`, `last_name`, `extra_name`, `age`, `sex`, `birthdate`, `address`, `marital_status`, `applicant_type`, `photo_url`, `created_at`, `deleted_by_user_id`, `deleted_at`) VALUES
(1, 1, '2025-3555', '$2b$10$qhItr91MjE80nl8EVSCwWeEdYQWu8HAF1CNuAPbC1tQ3vkxqs7MNe', 'Mellyville John', 'Amora', 'Edera', NULL, 22, 'Male', '2003-03-13', 'Calintaan, Anahawan, Southern Leyte, 6610', NULL, NULL, NULL, '2025-09-17 18:22:27', NULL, '2025-10-08 14:31:04'),
(2, 3, '2025-1295', '$2b$10$3O5s0q2Y2eNpEQvfNP/4cekFJ7AHCX6GadVNTVyMIDrLj7KlxvyZO', 'barry', 'villoria', 'magcosta', 'n/a', 30, 'Male', '2003-03-13', 'Poblacion, Anahawan, Southern Leyte, 6610', 'Divorced', 'PWD', NULL, '2025-09-17 18:47:12', NULL, '2025-10-08 14:47:13'),
(3, 2, '2025-8016', '$2b$10$W39dy28d8.0q7QcwuikEUuDEOBneIGNVDTb2tZuA4rLbGvE/isGd.', 'Mellyville John', 'Amora', 'Edera', 'n/a', 22, 'Male', '2003-03-13', 'Poblacion, Anahawan, Southern Leyte, 6610', 'Single', 'Regular', NULL, '2025-09-17 18:23:55', '4', '2025-10-08 14:54:13'),
(4, 4, '2025-3869', '$2b$10$lKhe9DvORrMgd1PZnO.IMe2dbBJgZYPgZXqWRNMKS59ra9W//AoLW', 'Nicole', 'Bilat', 'Vero', 'n/a', 60, 'Male', '1970-10-09', 'Amagusan, Anahawan, Southern Leyte, 6610', 'Widowed', 'PWD', NULL, '2025-09-17 18:54:29', '4', '2025-10-08 14:54:55'),
(5, 5, '2025-8139', '$2b$10$Kbk0mxNopNzJqgiS5Ttp5eWwTOiO30VmPWzVy.TYkjp0Y43L2Mfe2', 'me', 'Amora', 'Edera', NULL, 22, 'Male', '2006-01-23', 'Calintaan, Anahawan, Southern Leyte, 6610', 'Single', 'Regular', NULL, '2025-09-17 18:54:55', '4', '2025-10-08 15:20:47'),
(6, 7, '2025-8003', '$2b$10$vk/j/zoRB3rhHf4zSokw8OJP9N0QIqrf1S62rPHRQKJiKvIqyutpe', 'Jollyvel joy ', 'Amora', 'Edera', 'III', 23, 'Female', '2002-01-10', 'Poblacion, Anahawan, Southern Leyte, 6610', 'Single', 'Regular', NULL, '2025-10-08 14:46:04', '4', '2025-11-02 20:08:04'),
(7, 12, 'jollyvel.edera', '$2b$10$v8qTPBSTZ6PmnMIjgScllej7U6NBZyGOdgScr1gzkJJCnmi8JDd3K', 'jollyvel', NULL, 'edera', NULL, 22, 'Female', NULL, 'Manigawng, Anahawan, Southern Leyte, 6610', NULL, NULL, NULL, '2025-11-02 20:10:21', '4', '2025-11-02 20:15:58'),
(8, 11, 'jolly.edera', '$2b$10$ki2l.0OYBYAs5gKm3HdcVuymuD05ZcigLAFjDPxLH3hjGdVvkb62i', 'jolly', NULL, 'edera', NULL, 22, 'Male', NULL, 'Manigawng, Anahawan, Southern Leyte, 6610', NULL, NULL, NULL, '2025-11-02 20:09:02', '4', '2025-11-02 20:16:00'),
(9, 15, 'mellyville john.edera', '$2b$10$KiEmjNBHDGI5wEpsa1mHmOV/4/mS7i9h1KjN7QQsBP7Bo1EzUhjQq', 'Mellyville John', NULL, 'edera', NULL, 22, 'Male', '2003-03-13', 'Manigawng, Anahawan, Southern Leyte, 6610', NULL, NULL, NULL, '2025-11-02 20:17:20', '4', '2025-11-02 20:21:17'),
(10, 14, 'jolly.edera', '$2b$10$sAcO5aKd2ui/X0hFLiD5c.zqU6JuwzaCwZxsV6OYELW6UdqOYduly', 'jolly', NULL, 'edera', NULL, 22, 'Female', '2002-01-10', 'Manigawng, Anahawan, Southern Leyte, 6610', NULL, NULL, NULL, '2025-11-02 20:16:25', '4', '2025-11-02 20:21:19'),
(11, 13, 'julita.amora', '$2b$10$OPzJh5pTId3X3qDdjMK5nua0zAiA7kHO0ZNQyCTsZGyOZDlSUog6C', 'Julita', NULL, 'Amora', NULL, 60, 'Female', '1951-07-30', 'Poblacion, Anahawan, Southern Leyte, 6610', NULL, NULL, NULL, '2025-11-02 20:15:09', '4', '2025-11-02 20:21:21'),
(12, 10, '2025-1443', '$2b$10$nyll7KqX4ZDqspvuC3ZIOubQLp/0VZzZHsFuUxzORwcxH4HHo4D9a', 'Amelyn', 'budlat', 'Gatab', NULL, 22, 'Female', '2003-02-02', 'Poblacion, Anahawan, Southern Leyte, 6610', 'Single', 'Regular', 'placeholder-url', '2025-11-02 13:41:29', '4', '2025-11-02 20:21:24'),
(13, 16, 'amelyn.gatab', '$2b$10$ujLTu/Jfhz18MF0QiM1Xg.fBmv/X12NlNzm/MNiVDP.huYDlpEGsW', 'Amelyn', NULL, 'Gatab', NULL, 22, 'Male', '2003-03-13', 'Poblacion, Anahawan, Southern Leyte, 6610', NULL, NULL, NULL, '2025-11-02 20:21:59', '4', '2025-11-02 20:24:46'),
(14, 6, '2025-2572', '$2b$10$ebwiMfLOvJJ5AsQVlPZfZ.jW7ioeXKxlg5GkRW3/692/UA3VLNkD2', 'Nikko lance', 'magcosta', 'Riveral', 'jr', 24, 'Male', '2001-02-06', 'Amagusan, Anahawan, Southern Leyte, 6610', 'Married', 'Regular', 'placeholder-url', '2025-10-06 11:22:31', '4', '2025-11-02 22:34:17'),
(15, 20, 'amelynss.gatabsss', '$2b$10$AnvXGBnKCMTz83Ce/GzuNuUQVUYr4c7ur6iHglwVZYm.VtQJGbgEW', 'Amelynss', 'budlats', 'Gatabsss', NULL, 24, NULL, '2000-02-22', 'Cogon, Anahawan, Southern Leyte, 6610', 'Single', 'Regular', NULL, '2025-11-02 20:31:45', '4', '2025-11-19 09:38:56'),
(16, 17, 'mark lloyd.villoria', '$2b$10$H8CHhjDuskXX1p8QitwUUuL3EYhTEbK9MUtx3.xcy5zr8trrPYRRS', 'Mark lloyd', NULL, 'Villoria', NULL, 24, 'Male', '2000-02-22', 'Canlabian, Anahawan, Southern Leyte, 6610', 'Single', 'Regular', NULL, '2025-11-02 20:23:45', '4', '2025-11-23 12:41:14'),
(17, 22, 'mellyville john.edera', '$2b$10$0ckTQGM87SfFch3L1NWbr.zIRciHtmDpMIJVhRu7nNSQBMEctckcm', 'Mellyville John', 'Amora', 'Edera', NULL, 22, 'Male', '2003-03-13', 'Poblacion, Anahawan, Southern Leyte, 6610', 'Single', 'Regular', NULL, '2025-11-23 12:38:44', '4', '2025-11-23 12:46:04'),
(18, 24, 'mellyville johna.edera', '$2b$10$xnZnm3n7K4yfe.4FXz5.eOzTIGtF1g1.4RIxPC3uc0xzCnFETw7Jq', 'Mellyville Johna', 'Amoraa', 'Edera', NULL, 24, 'Male', '2004-03-13', 'Calintaan, Anahawan, Southern Leyte, 6610', 'Single', 'Regular', NULL, '2025-11-23 12:47:49', '4', '2025-11-23 12:57:32'),
(19, 23, 'mellyville john.edera', '$2b$10$vfcj.X3l7QwnKoOxrhpKceC75YrmizmDrO1lX9FtA6CshUxX0qf0C', 'Mellyville John', 'Amora', 'Edera', NULL, 22, 'Male', '2003-03-13', 'Poblacion, Anahawan, Southern Leyte, 6610', 'Single', 'Regular', NULL, '2025-11-23 12:46:21', '4', '2025-11-23 12:57:34'),
(20, 25, 'mellyville john.ederaa', '$2b$10$.ZIp51ZwBUaxDdG.nPYa4./pE23lYgM1k45cGF6EdBV5lptwzR0qa', 'Mellyville John', 'Amora', 'Ederaa', NULL, 22, NULL, '2003-03-13', 'Poblacion, Anahawan, Southern Leyte, 6610', 'Single', 'Regular', NULL, '2025-11-23 12:58:47', '4', '2025-11-23 12:59:02'),
(21, 26, 'mellyville john.ederaa', '$2b$10$7WMk65zOzCo6zjQUprkzeuI8JsebFshVVHuIXM7RUCEo.LpxbWPoy', 'Mellyville John', 'Amora', 'Ederaa', NULL, 22, 'Male', '2003-03-13', 'Poblacion, Anahawan, Southern Leyte, 6610', 'Single', 'Regular', NULL, '2025-11-23 12:59:13', '4', '2025-11-23 13:00:08'),
(22, 27, 'mellyville john.ederaa', '$2b$10$GIeCmtaPJIkrXqOX.08pVODEXthssmYthk9mmOKkkXO/prEkLR4Lq', 'Mellyville John', 'Amora', 'Ederaa', NULL, 22, NULL, '2003-03-13', 'Poblacion, Anahawan, Southern Leyte, 6610', 'Single', 'Regular', NULL, '2025-11-23 13:00:18', '4', '2025-11-23 13:00:26'),
(23, 28, 'lola.lolaa', '$2b$10$MSSFceqQL5WFw/U3RIYEtO2C7z2CuQ3XxBiPVDSGu3WdiwH0EjdWW', 'lola', 'lola', 'lolaa', NULL, 22, 'Female', '2003-03-13', 'Manigawng, Anahawan, Southern Leyte, 6610', 'Single', NULL, NULL, '2025-11-23 13:03:19', '4', '2025-11-23 13:03:23'),
(24, 31, 'kenn.palcos', '$2b$10$bMmRM/ZDl6Xf53HVzEBheONMuijEl5J7JNhQ42cVBA2zMN2ZGtFFO', 'Kenn', 'Bulagsac', 'Palcos', NULL, 24, NULL, '2003-03-13', 'Calintaan, Anahawan, Southern Leyte, 6610', NULL, NULL, NULL, '2025-11-23 13:40:52', '4', '2025-11-23 13:41:31'),
(25, 30, 'kenn.palcss', '$2b$10$7q1zCiZ9u93BxD5Fu1Gkbe31T1NHzw0xdy7cxIGcx6SzMoaogxxP6', 'Kenn', 'Bulagsac', 'Palcss', NULL, 24, NULL, '2003-03-13', 'Calintaan, Anahawan, Southern Leyte, 6610', NULL, NULL, NULL, '2025-11-23 13:35:24', '4', '2025-11-23 13:41:37'),
(26, 32, 'kenntoy.palcos', '$2b$10$e9rB24unHtNvc7FrfAJfsucGQUGwwd0CXwonWshTgGAA2BZjmbhBu', 'Kenntoy', 'Bulagsac', 'Palcos', NULL, 22, 'Male', '2003-03-13', 'Calintaan, Anahawan, Southern Leyte, 6610', 'Single', 'PWD', NULL, '2025-11-23 13:41:26', '4', '2025-11-23 14:13:16'),
(27, 29, 'kenn.palco', '$2b$10$RkU2VzbRbAs5kgK.V2p5zeqshYAXYspt0anj8Fc3w7.taX0FWDZlC', 'Kenn', 'Bulagsac', 'Palco', NULL, 24, 'Male', '2003-03-13', 'Calintaan, Anahawan, Southern Leyte, 6610', 'Single', 'Regular', NULL, '2025-11-23 13:28:46', '4', '2025-11-23 20:55:23'),
(28, 21, 'lola.lola', '$2b$10$f6C7CLEuyoZsTISHkoZQsu3iiptTX0Jte.W0sfsmUhXYEgSxLzbYy', 'Julita', 'Malate', 'Amora', NULL, 60, 'Female', '1981-03-30', 'Manigawng, Anahawan, Southern Leyte, 6610', 'Single', 'Regular', NULL, '2025-11-02 20:33:03', '4', '2025-11-27 20:19:32'),
(29, 18, 'amelyn.gatab', '$2b$10$AWz566YDRusBFB.UgxxdWe3KTaVLxdhyJxKqkaPxXRNTPImCenhDm', 'Amelyn', 'budlat', 'Gatab', NULL, 24, 'Female', '2000-02-22', 'Cogon, Anahawan, Southern Leyte, 6610', 'Single', 'Regular', NULL, '2025-11-02 20:25:09', '4', '2025-11-27 21:45:57'),
(30, 33, 'mellyvillejohn.ederas', '$2b$10$RShvn3KiccF49M7M6MZy9uttUFaqycvmxIlu3sA4TiLJTPS7yvadC', 'MellyvilleJohn', 'Amora', 'Ederas', NULL, 22, 'Male', '2003-03-13', 'Poblacion, Anahawan, Southern Leyte, 6610', 'Single', 'Regular', NULL, '2025-11-23 19:57:25', '4', '2025-11-27 21:46:06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(4, 'amelynmylab', '$2b$10$0RTFTR34vh4Ca44Ic4Hsp.o21MLAswY3fbYg2Dbtk3vS2H1Dxswxu', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applicants`
--
ALTER TABLE `applicants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `deleted_applicants_history`
--
ALTER TABLE `deleted_applicants_history`
  ADD PRIMARY KEY (`history_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applicants`
--
ALTER TABLE `applicants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `deleted_applicants_history`
--
ALTER TABLE `deleted_applicants_history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

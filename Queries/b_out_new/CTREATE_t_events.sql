-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.17-MariaDB - Source distribution
-- Server OS:                    osx10.10
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping data for table b_out_new.t_events: ~11 rows (approximately)
/*!40000 ALTER TABLE `t_events` DISABLE KEYS */;
INSERT IGNORE INTO `t_events` (`id`, `idEvent`, `idWarehouse`, `title`, `start`, `end`, `idManager_1`, `idManager_2`, `idEventCity`, `idEventPlace`, `idClient`, `idCreatedBy`, `createdAt`, `notes`, `idStatus`, `idPhase`, `phaseTimeStart`, `phaseTimeEnd`, `idUpdatedBy`, `updatedAt`, `filledUp`, `is_deleted`, `unixTime`) VALUES
	(1, '11111111111', 1, 'fake', '2022-06-10 10:32:53', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, 0),
	(2, '11111111112', 3, 'fake', '2022-06-10 10:32:49', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, 0),
	(3, '11111111113', 4, 'fake', '2022-06-10 10:32:45', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, 0),
	(4, '11111111114', 5, 'fake', '2022-06-10 10:32:42', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, 0),
	(225, '16562268190', 2, 'Би-2', '2022-06-14 21:00:00', '2022-06-14 21:00:00', 1, 1, 1, 1, 1, 2, '2022-06-26 10:00:19', 'Тест заметки', 1, 1, NULL, NULL, 2, '2022-06-26 10:00:19', 0, 0, 1656226819042),
	(226, '16562255878', 2, 'Би-2 upd1', '2022-06-14 18:00:00', '2022-06-14 18:00:00', 1, 1, 1, 1, 1, 2, '2022-06-26 10:04:26', 'Тест заметки', 1, 1, NULL, NULL, 2, '2022-06-26 10:04:26', 0, 0, 1656227066181),
	(227, '16562255878', 2, 'Би-2 upd2 no phase', '2022-06-14 18:00:00', '2022-06-14 18:00:00', 1, 1, 1, 1, 1, 2, '2022-06-26 10:06:03', 'Тест заметки', 1, 1, NULL, NULL, 2, '2022-06-26 10:06:03', 0, 0, 1656227163173),
	(228, '16562255878', 2, 'Би-2 upd3 with phase', '2022-06-14 18:00:00', '2022-06-14 18:00:00', 1, 1, 1, 1, 1, 2, '2022-06-26 10:06:42', 'Тест заметки', 1, 1, NULL, NULL, 2, '2022-06-26 10:06:42', 0, 0, 1656227202216),
	(229, '16562255878', 2, 'Би-2 upd4 without phase', '2022-06-14 18:00:00', '2022-06-14 18:00:00', 1, 1, 1, 1, 1, 2, '2022-06-26 11:13:32', 'Тест заметки', 1, 1, NULL, NULL, 2, '2022-06-26 11:13:32', 0, 0, 1656231212477),
	(230, '16562255878', 2, 'Би-2 upd5 with phase', '2022-06-14 18:00:00', '2022-06-14 18:00:00', 1, 1, 1, 1, 1, 2, '2022-06-26 12:13:03', 'Тест заметки', 1, 1, NULL, NULL, 2, '2022-06-26 12:13:03', 0, 0, 1656234783173),
	(231, '16562379177', 2, 'Би-2 new no phase', '2022-06-14 21:00:00', '2022-06-14 21:00:00', 1, 1, 1, 1, 1, 2, '2022-06-26 13:05:18', 'Тест заметки', 1, 1, NULL, NULL, 2, '2022-06-26 13:05:18', 0, 0, 1656237917754);
/*!40000 ALTER TABLE `t_events` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

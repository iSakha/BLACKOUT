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

-- Dumping data for table b_out_new.t_clients: ~4 rows (approximately)
/*!40000 ALTER TABLE `t_clients` DISABLE KEYS */;
INSERT IGNORE INTO `t_clients` (`id`, `client`, `clientDescription`, `comments`) VALUES
	(1, NULL, NULL, NULL),
	(2, 'Манышев', 'Манышев- заказчик', 'Это Манышев'),
	(3, 'Мингорисполком', 'no description', 'no comments'),
	(4, 'Пожарное депо №3', 'адрес', 'yes');
/*!40000 ALTER TABLE `t_clients` ENABLE KEYS */;

-- Dumping data for table b_out_new.t_events: ~15 rows (approximately)
/*!40000 ALTER TABLE `t_events` DISABLE KEYS */;
INSERT IGNORE INTO `t_events` (`id`, `idEvent`, `idWarehouse`, `title`, `start`, `end`, `idManager_1`, `idManager_2`, `idEventCity`, `idEventPlace`, `idClient`, `idCreatedBy`, `createdAt`, `notes`, `idStatus`, `idPhase`, `phaseTimeStart`, `phaseTimeEnd`, `idUpdatedBy`, `updatedAt`, `filledUp`, `is_deleted`, `unixTime`) VALUES
	(1, '11111111111', 1, 'fake', '2022-06-10 10:32:53', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, 0),
	(2, '11111111112', 3, 'fake', '2022-06-10 10:32:49', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, 0),
	(3, '11111111113', 4, 'fake', '2022-06-10 10:32:45', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, 0),
	(4, '11111111114', 5, 'fake', '2022-06-10 10:32:42', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, 0),
	(156, '16556490584', 2, 'Би-2', '2022-06-14 21:00:00', '2022-06-14 21:00:00', 3, 4, 2, 2, 3, 2, '2022-06-19 17:30:59', 'Тест заметки', 2, 1, NULL, NULL, 2, '2022-06-19 17:30:59', 0, 0, 1655649058420),
	(158, '16556492582', 2, 'Би-2 with no phases', '2022-06-14 21:00:00', '2022-06-14 21:00:00', 3, 4, 2, 2, 3, 2, '2022-06-19 17:34:18', 'Тест заметки', 2, 1, NULL, NULL, 2, '2022-06-19 17:34:18', 0, 0, 1655649258230),
	(159, '16556495679', 2, 'Би-2 with no phases no clients', '2022-06-19 18:29:56', '2022-06-14 21:00:00', 3, 4, 2, 2, 1, 2, '2022-06-19 17:39:28', 'Тест заметки', 2, 1, NULL, NULL, 2, '2022-06-19 17:39:28', 0, 0, 1655649567950),
	(160, '16556496999', 2, 'Би-2 with phases but no managers', '2022-06-19 18:28:41', '2022-06-14 21:00:00', 1, 1, 2, 2, 3, 2, '2022-06-19 17:41:40', 'Тест заметки', 2, 1, NULL, NULL, 2, '2022-06-19 17:41:40', 0, 0, 1655649699914),
	(161, '16556600031', 2, 'Би-2 with phases but no managers', '2022-06-14 21:00:00', '2022-06-14 21:00:00', 1, 1, 2, 2, 3, 2, '2022-06-19 20:33:24', 'Тест заметки', 2, 1, NULL, NULL, 2, '2022-06-19 20:33:24', 0, 0, 1655660003174),
	(162, '16556671623', 2, 'test create', '2022-06-14 21:00:00', '2022-06-14 21:00:00', 1, 1, 2, 2, 3, 2, '2022-06-19 22:32:43', 'Тест заметки', 2, 1, NULL, NULL, 2, '2022-06-19 22:32:43', 0, 0, 1655667162333),
	(163, '16556671623', 2, 'test update', '2022-06-14 21:00:00', '2022-06-14 21:00:00', 3, 4, 2, 2, 3, 2, '2022-06-19 22:38:53', 'Тест заметки', 2, 1, NULL, NULL, 2, '2022-06-19 22:38:53', 0, 0, 1655667532979),
	(164, '16556675917', 2, 'test update', '2022-06-14 21:00:00', '2022-06-14 21:00:00', 3, 4, 2, 2, 3, 2, '2022-06-19 22:39:52', 'Тест заметки', 2, 1, NULL, NULL, 2, '2022-06-19 22:39:52', 0, 0, 1655667591759),
	(165, '16556687353', 2, 'test update', '2022-06-14 21:00:00', '2022-06-14 21:00:00', 3, 4, 2, 2, 3, 2, '2022-06-19 22:58:56', 'Тест заметки', 2, 1, NULL, NULL, 2, '2022-06-19 22:58:56', 0, 0, 1655668735340),
	(166, '16556688428', 3, 'test calculation', '2022-06-14 21:00:00', '2022-06-14 21:00:00', 3, 4, 2, 2, 3, 2, '2022-06-19 23:00:43', 'Тест заметки', 2, 1, NULL, NULL, 2, '2022-06-19 23:00:43', 0, 0, 1655668842839),
	(167, '16557146376', 3, 'test from postman', '2022-06-14 21:00:00', '2022-06-14 21:00:00', 3, 4, 2, 2, 3, 2, '2022-06-20 11:44:03', 'Тест заметки', 2, 1, NULL, NULL, 2, '2022-06-20 11:44:03', 0, 0, 1655714637650);
/*!40000 ALTER TABLE `t_events` ENABLE KEYS */;

-- Dumping data for table b_out_new.t_event_city: ~7 rows (approximately)
/*!40000 ALTER TABLE `t_event_city` DISABLE KEYS */;
INSERT IGNORE INTO `t_event_city` (`id`, `city`) VALUES
	(1, NULL),
	(2, 'Минск'),
	(3, 'Москва'),
	(4, 'Казань'),
	(5, 'Питер'),
	(6, 'London'),
	(7, 'Сочи');
/*!40000 ALTER TABLE `t_event_city` ENABLE KEYS */;

-- Dumping data for table b_out_new.t_event_details: ~27 rows (approximately)
/*!40000 ALTER TABLE `t_event_details` DISABLE KEYS */;
INSERT IGNORE INTO `t_event_details` (`id`, `idEvent`, `idPhase`, `startPhase`, `endPhase`) VALUES
	(1, '16556490584', 2, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(2, '16556490584', 3, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(3, '16556490584', 4, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(7, '16556496999', 2, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(8, '16556496999', 3, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(9, '16556496999', 4, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(10, '16556600031', 2, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(11, '16556600031', 3, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(12, '16556600031', 4, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(13, '16556671623', 2, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(14, '16556671623', 3, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(15, '16556671623', 4, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(16, '16556671623', 2, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(17, '16556671623', 3, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(18, '16556671623', 4, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(19, '16556675917', 2, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(20, '16556675917', 3, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(21, '16556675917', 4, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(22, '16556687353', 2, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(23, '16556687353', 3, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(24, '16556687353', 4, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(25, '16556688428', 2, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(26, '16556688428', 3, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(27, '16556688428', 4, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(28, '16557146376', 2, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(29, '16557146376', 3, '2022-06-14 21:00:00', '2022-06-14 21:00:00'),
	(30, '16557146376', 4, '2022-06-14 21:00:00', '2022-06-14 21:00:00');
/*!40000 ALTER TABLE `t_event_details` ENABLE KEYS */;

-- Dumping data for table b_out_new.t_event_place: ~11 rows (approximately)
/*!40000 ALTER TABLE `t_event_place` DISABLE KEYS */;
INSERT IGNORE INTO `t_event_place` (`id`, `idEventCity`, `place`) VALUES
	(1, NULL, NULL),
	(2, 2, 'ДК Тракторного завода'),
	(3, 2, 'Дворец Спорта'),
	(4, 2, 'Беларусьфильм'),
	(5, 3, 'Крокус Сити Холл'),
	(6, 3, 'Мосфильм'),
	(7, 3, 'Олимпийский'),
	(8, 4, 'Татнефть Арена'),
	(9, 6, 'Albert Hall'),
	(10, 7, 'КЗ Фестивальный'),
	(11, 5, 'КЗ Октябрьский');
/*!40000 ALTER TABLE `t_event_place` ENABLE KEYS */;

-- Dumping data for table b_out_new.t_phase: ~7 rows (approximately)
/*!40000 ALTER TABLE `t_phase` DISABLE KEYS */;
INSERT IGNORE INTO `t_phase` (`id`, `phase`) VALUES
	(1, NULL),
	(2, 'Погрузка'),
	(3, 'Монтаж'),
	(4, 'Репетиция'),
	(5, 'Работа'),
	(6, 'Демонтаж'),
	(7, 'Разгрузка');
/*!40000 ALTER TABLE `t_phase` ENABLE KEYS */;

-- Dumping data for table b_out_new.t_role: ~6 rows (approximately)
/*!40000 ALTER TABLE `t_role` DISABLE KEYS */;
INSERT IGNORE INTO `t_role` (`id`, `role`) VALUES
	(1, NULL),
	(2, 'role_1'),
	(3, 'role_2'),
	(4, 'role_3'),
	(5, 'role_4'),
	(6, 'role_5');
/*!40000 ALTER TABLE `t_role` ENABLE KEYS */;

-- Dumping data for table b_out_new.t_salt: ~7 rows (approximately)
/*!40000 ALTER TABLE `t_salt` DISABLE KEYS */;
INSERT IGNORE INTO `t_salt` (`id`, `salt`) VALUES
	(1, NULL),
	(2, '$2b$10$.2OOazT11DpPyDxN76sbz.'),
	(3, '$2b$10$4GzCfBzWVG7K1jZDBSR7o.'),
	(4, '$2b$10$eI5tDA55NaImM9t4nFCPDu'),
	(5, '$2b$10$5SPPf8b5cBcLzlnD1g/VqO'),
	(6, '$2b$10$6W8tmtKMTAPccZPL7v6sue'),
	(7, '$2b$10$JdOAw9/tp9DH9clHXvICk.');
/*!40000 ALTER TABLE `t_salt` ENABLE KEYS */;

-- Dumping data for table b_out_new.t_status: ~10 rows (approximately)
/*!40000 ALTER TABLE `t_status` DISABLE KEYS */;
INSERT IGNORE INTO `t_status` (`id`, `status`) VALUES
	(1, NULL),
	(2, 'Запрос'),
	(3, 'Концепция'),
	(4, 'На рассмотрении'),
	(5, 'Подтвержден'),
	(6, 'Подготовлен'),
	(7, 'На локации'),
	(8, 'Вернулся'),
	(9, 'Отменен'),
	(23, 'new status');
/*!40000 ALTER TABLE `t_status` ENABLE KEYS */;

-- Dumping data for table b_out_new.t_users: ~7 rows (approximately)
/*!40000 ALTER TABLE `t_users` DISABLE KEYS */;
INSERT IGNORE INTO `t_users` (`id`, `login`, `pass`, `crypto`, `firstName`, `lastName`, `role`, `avatar`, `salt`) VALUES
	(1, NULL, NULL, NULL, NULL, NULL, 1, NULL, 1),
	(2, 'admin', 'test_admin', '$2b$10$.2OOazT11DpPyDxN76sbz.pw8.FjoM37qtlWGkXDep/XYZYLWP0pK', 'firstNameAdmin', 'lastNameAdmin', 2, NULL, 2),
	(3, 'johndoe', 'test_johndoe', '$2b$10$4GzCfBzWVG7K1jZDBSR7o.SOGAQ5VeU4ycpZMadCr/5QH9UukkVOq', 'John', 'Doe', 3, NULL, 3),
	(4, 'guest', 'test_guest', '$2b$10$eI5tDA55NaImM9t4nFCPDuphd8Cg6sj.IPPFT/9GcmtOq6B0QdJCW', 'fNameGuest', 'lasNameGuest', 4, NULL, 4),
	(5, 'Ваня', 'test_Ваня', '$2b$10$5SPPf8b5cBcLzlnD1g/VqOWdBhEZ15NTtXdOcz3Fd6tke1CSXm.y2', 'Иван', 'Петров', 5, NULL, 5),
	(6, 'Петя', 'test_Петя', '$2b$10$6W8tmtKMTAPccZPL7v6suepFT8zAxyPvsBK.inlqExRlR2hcQXpby', 'Петр', 'Сидоров', 6, NULL, 6),
	(7, 'Вася', 'test_Вася', '$2b$10$JdOAw9/tp9DH9clHXvICk.SXJFG6aOAv1zB4M2tH2Wv9ExxYsqSVW', 'Василий', 'Пупкин', 6, NULL, 7);
/*!40000 ALTER TABLE `t_users` ENABLE KEYS */;

-- Dumping data for table b_out_new.t_warehouses: ~5 rows (approximately)
/*!40000 ALTER TABLE `t_warehouses` DISABLE KEYS */;
INSERT IGNORE INTO `t_warehouses` (`id`, `warehouse`, `color`, `bgColor`, `address`) VALUES
	(1, NULL, NULL, NULL, NULL),
	(2, 'Минск', '#ffffff', '#00AB55', 'пер. Липковский, 24'),
	(3, 'Москва', '#ffffff', '#FF4842', 'Алтуфьевское шоссе 37-строение16'),
	(4, 'Казань', '#ffffff', '#FFC107', 'Казань'),
	(5, 'Питер', '#ffffff', '#1890FF', 'Санкт-Петербург');
/*!40000 ALTER TABLE `t_warehouses` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

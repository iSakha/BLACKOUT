-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.17-MariaDB - Source distribution
-- Server OS:                    osx10.10
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping data for table b_out_new.t_clients: ~4 rows (approximately)
INSERT IGNORE INTO `t_clients` (`id`, `client`, `clientDescription`, `comments`) VALUES
	(1, NULL, NULL, NULL),
	(2, 'Манышев', 'Манышев- заказчик', 'Это Манышев'),
	(3, 'Мингорисполком', 'no description', 'no comments'),
	(4, 'Пожарное депо №3', 'адрес', 'yes');

-- Dumping data for table b_out_new.t_clients_copy: ~4 rows (approximately)
INSERT IGNORE INTO `t_clients_copy` (`id`, `client`, `clientDescription`, `comments`) VALUES
	(NULL, NULL, NULL, NULL),
	(2, 'Манышев', 'Манышев- заказчик', 'Это Манышев'),
	(3, 'Мингорисполком', 'no description', 'no comments'),
	(4, 'Пожарное депо №3', 'адрес', 'yes');

-- Dumping data for table b_out_new.t_events: ~33 rows (approximately)
INSERT IGNORE INTO `t_events` (`id`, `idEvent`, `idWarehouse`, `title`, `start`, `end`, `idManager_1`, `idManager_2`, `idEventCity`, `idEventPlace`, `idClient`, `idCreatedBy`, `createdAt`, `notes`, `idStatus`, `idPhase`, `phaseTimeStart`, `phaseTimeEnd`, `idUpdatedBy`, `updatedAt`, `filledUp`, `is_deleted`) VALUES
	(1, '11111111111', 1, 'fake', '2022-06-10 07:32:53', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1),
	(2, '11111111112', 2, 'fake', '2022-06-10 07:32:49', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1),
	(3, '11111111113', 3, 'fake', '2022-06-10 07:32:45', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1),
	(4, '11111111114', 4, 'fake', '2022-06-10 07:32:42', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1);

-- Dumping data for table b_out_new.t_events_copy: ~9 rows (approximately)
INSERT IGNORE INTO `t_events_copy` (`id`, `idEvent`, `idWarehouse`, `title`, `start`, `end`, `idManager_1`, `idManager_2`, `idEventCity`, `idEventPlace`, `idClient`, `idCreatedBy`, `createdAt`, `notes`, `idStatus`, `idPhase`, `phaseTimeStart`, `phaseTimeEnd`, `idUpdatedBy`, `updatedAt`, `is_deleted`) VALUES
	(1, '11111111111', 1, 'fake', '2022-06-07 08:15:48', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
	(2, '11111111112', 2, 'fake', '2022-06-07 08:15:50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
	(3, '11111111113', 3, 'fake', '2022-06-07 08:15:58', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
	(4, '11111111114', 4, 'fake', '2022-06-07 08:16:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
	(26, '16545900592', 1, 'First project', '2022-06-07 08:25:43', '2022-06-03 21:00:00', 2, 3, 2, 2, 2, NULL, '2022-06-07 08:20:59', 'Notes 1', 2, NULL, NULL, NULL, NULL, '2022-06-07 08:20:59', 0),
	(27, '16545902936', 1, 'Second project', '2022-06-07 08:27:43', '2022-06-03 21:00:00', 2, 3, 2, 3, 2, NULL, '2022-06-07 08:24:53', 'Notes 2', 2, NULL, NULL, NULL, NULL, '2022-06-07 08:24:53', 0),
	(28, '16545909666', 2, 'Third project', '2022-06-09 04:22:00', '2022-06-12 12:30:00', 5, 6, 3, 6, 4, NULL, '2022-06-07 08:36:06', 'Notes 3', 2, NULL, NULL, NULL, NULL, '2022-06-07 08:36:06', 0),
	(29, '16545929829', 3, 'Next project', '2022-06-06 07:22:00', '2022-06-08 12:45:00', 7, 6, 4, 8, 2, NULL, '2022-06-07 09:09:42', 'Next', 2, NULL, NULL, NULL, NULL, '2022-06-07 09:09:42', 0),
	(30, '16545932685', 4, 'Next project new', '2022-06-06 07:22:00', '2022-06-08 12:45:00', 6, 7, 5, 11, 4, NULL, '2022-06-07 09:14:28', 'Next new', 2, NULL, NULL, NULL, NULL, '2022-06-07 09:14:28', 0),
	(31, '16545932685', 3, 'New test', '2022-06-07 11:13:51', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-06-07 10:27:05', 0);

-- Dumping data for table b_out_new.t_event_city: ~7 rows (approximately)
INSERT IGNORE INTO `t_event_city` (`id`, `city`) VALUES
	(1, NULL),
	(2, 'Минск'),
	(3, 'Москва'),
	(4, 'Казань'),
	(5, 'Питер'),
	(6, 'London'),
	(7, 'Сочи');

-- Dumping data for table b_out_new.t_event_details: ~6 rows (approximately)
INSERT IGNORE INTO `t_event_details` (`id`, `idEvent`, `idPhase`, `startPhase`, `endPhase`) VALUES
	(1, '16549420844', 2, '2022-06-12 06:00:00', '2022-06-12 09:00:00'),
	(2, '16549420844', 4, '2022-06-15 09:20:00', '2022-06-15 19:30:00'),
	(3, '16549420844', 6, '2022-06-23 09:20:00', '2022-06-24 19:30:00'),
	(4, '16549452188', 3, '2022-06-08 09:20:00', '2022-06-09 19:30:00'),
	(5, '16549452188', 6, '2022-06-24 21:20:00', '2022-06-02 07:33:00'),
	(6, '16549452188', 7, '2022-06-12 04:20:00', '2022-06-12 20:33:00');

-- Dumping data for table b_out_new.t_event_place: ~11 rows (approximately)
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

-- Dumping data for table b_out_new.t_phase: ~7 rows (approximately)
INSERT IGNORE INTO `t_phase` (`id`, `phase`) VALUES
	(1, NULL),
	(2, 'Погрузка'),
	(3, 'Монтаж'),
	(4, 'Репетиция'),
	(5, 'Работа'),
	(6, 'Демонтаж'),
	(7, 'Разгрузка');

-- Dumping data for table b_out_new.t_role: ~6 rows (approximately)
INSERT IGNORE INTO `t_role` (`id`, `role`) VALUES
	(1, NULL),
	(2, 'role_1'),
	(3, 'role_2'),
	(4, 'role_3'),
	(5, 'role_4'),
	(6, 'role_5');

-- Dumping data for table b_out_new.t_salt: ~7 rows (approximately)
INSERT IGNORE INTO `t_salt` (`id`, `salt`) VALUES
	(1, NULL),
	(2, '$2b$10$.2OOazT11DpPyDxN76sbz.'),
	(3, '$2b$10$4GzCfBzWVG7K1jZDBSR7o.'),
	(4, '$2b$10$eI5tDA55NaImM9t4nFCPDu'),
	(5, '$2b$10$5SPPf8b5cBcLzlnD1g/VqO'),
	(6, '$2b$10$6W8tmtKMTAPccZPL7v6sue'),
	(7, '$2b$10$JdOAw9/tp9DH9clHXvICk.');

-- Dumping data for table b_out_new.t_status: ~9 rows (approximately)
INSERT IGNORE INTO `t_status` (`id`, `status`) VALUES
	(1, NULL),
	(2, 'Запрос'),
	(3, 'Концепция'),
	(4, 'На рассмотрении'),
	(5, 'Подтвержден'),
	(6, 'Подготовлен'),
	(7, 'На локации'),
	(8, 'Вернулся'),
	(9, 'Отменен');

-- Dumping data for table b_out_new.t_users: ~7 rows (approximately)
INSERT IGNORE INTO `t_users` (`id`, `login`, `pass`, `crypto`, `firstName`, `lastName`, `role`, `avatar`, `salt`) VALUES
	(1, NULL, NULL, NULL, NULL, NULL, 1, NULL, 1),
	(2, 'admin', 'test_admin', '$2b$10$.2OOazT11DpPyDxN76sbz.pw8.FjoM37qtlWGkXDep/XYZYLWP0pK', 'firstNameAdmin', 'lastNameAdmin', 2, NULL, 2),
	(3, 'johndoe', 'test_johndoe', '$2b$10$4GzCfBzWVG7K1jZDBSR7o.SOGAQ5VeU4ycpZMadCr/5QH9UukkVOq', 'John', 'Doe', 3, NULL, 3),
	(4, 'guest', 'test_guest', '$2b$10$eI5tDA55NaImM9t4nFCPDuphd8Cg6sj.IPPFT/9GcmtOq6B0QdJCW', 'fNameGuest', 'lasNameGuest', 4, NULL, 4),
	(5, 'Ваня', 'test_Ваня', '$2b$10$5SPPf8b5cBcLzlnD1g/VqOWdBhEZ15NTtXdOcz3Fd6tke1CSXm.y2', 'Иван', 'Петров', 5, NULL, 5),
	(6, 'Петя', 'test_Петя', '$2b$10$6W8tmtKMTAPccZPL7v6suepFT8zAxyPvsBK.inlqExRlR2hcQXpby', 'Петр', 'Сидоров', 6, NULL, 6),
	(7, 'Вася', 'test_Вася', '$2b$10$JdOAw9/tp9DH9clHXvICk.SXJFG6aOAv1zB4M2tH2Wv9ExxYsqSVW', 'Василий', 'Пупкин', 6, NULL, 7);

-- Dumping data for table b_out_new.t_warehouses: ~4 rows (approximately)
INSERT IGNORE INTO `t_warehouses` (`id`, `warehouse`, `color`, `bgColor`, `address`) VALUES
	(1, 'Минск', '#ffffff', '#00AB55', 'пер. Липковский, 24'),
	(2, 'Москва', '#ffffff', '#FF4842', 'Алтуфьевское шоссе 37-строение16'),
	(3, 'Казань', '#ffffff', '#FFC107', 'Казань'),
	(4, 'Питер', '#ffffff', '#1890FF', 'Санкт-Петербург');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

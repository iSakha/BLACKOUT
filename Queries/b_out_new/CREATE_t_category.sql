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

-- Dumping data for table b_out_new.t_category: ~26 rows (approximately)
INSERT IGNORE INTO `t_category` (`idDep`, `idCat`, `name`) VALUES
	('001', '001', 'Световые приборы полного движения'),
	('001', '002', 'Прожекторы следящего света'),
	('001', '003', 'Стробоскопы, блайндеры, пары'),
	('001', '004', 'Светодиодные приборы'),
	('001', '005', 'Осветительный и архитектурный свет'),
	('001', '006', 'Дым, туман, вентиляторы, прочее'),
	('001', '007', 'Пульты'),
	('002', '001', 'Светодиодное видео оборудование'),
	('002', '002', 'Проектора, плазмы и проекционные экраны'),
	('002', '003', 'Медиасерверы и комплектующие для них'),
	('002', '004', 'Контроллеры для светодиодных экранов'),
	('002', '005', 'Видеопроцессоры и коммутаторы'),
	('002', '006', 'Преобразователи и удлинители сигнала'),
	('002', '007', 'Конструктив и подвесное оборудование'),
	('002', '008', 'Камеры и трансляционное оборудование'),
	('003', '001', 'Силовые ящики, Димерные блоки/Power distribution, dimmers'),
	('003', '002', 'Коммутация/Commutation'),
	('003', '003', 'Силовая коммутация/power commutation'),
	('003', '004', 'Прочее/rest equipment'),
	('004', '001', 'Фермы/ truss 30x30, Фермы/ truss 40x40'),
	('004', '002', 'Фермы/truss 40x40'),
	('004', '003', 'Фермы/truss 50x60, Фермы/truss 52x52'),
	('004', '004', 'Лебедки, лебедочные контроллеры/motors, motor controllers'),
	('004', '005', 'Оборудование для подвесса/Rigging stuff'),
	('004', '006', 'разное/different stuff'),
	('004', '007', 'Цельные конструкции/Complete construction');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

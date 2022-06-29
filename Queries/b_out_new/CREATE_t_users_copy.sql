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

-- Dumping data for table b_out_new.t_users_copy: ~5 rows (approximately)
/*!40000 ALTER TABLE `t_users_copy` DISABLE KEYS */;
INSERT IGNORE INTO `t_users_copy` (`id`, `login`, `idPass`, `idCrypto`, `lastName`, `firstName`, `patronymic`, `phone1`, `phone2`, `email`, `idDepartment`, `idWarehouse`, `role`, `avatar`, `salt`) VALUES
	(1, NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 1, NULL, 1),
	(2, 'admin', 2, 2, 'lastNameAdmin', 'firstNameAdmin', NULL, NULL, NULL, NULL, 1, 1, 2, NULL, 2),
	(3, 'gaptar', 3, 3, 'Гаптар', 'Алексей', 'Вячеславович', '+7 (915) 057-27-42', '+375 (29) 247-13-38', 'ag@blackoutstudio.ru', 2, 3, 3, NULL, 3),
	(4, 'skip', 4, 4, 'Скибский', 'Сергей', 'Михайлович', '+7 (925) 550-53-70', NULL, NULL, 2, 3, 3, NULL, 4),
	(5, 'ilyapio', 5, 5, 'Пиотровский', 'Илья', 'Дмитриевич', '+375 (29) 119-80-25', NULL, 'ilyapio@gmail.com', 2, 2, 3, NULL, 5);
/*!40000 ALTER TABLE `t_users_copy` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

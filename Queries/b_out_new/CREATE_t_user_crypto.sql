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

-- Dumping data for table b_out_new.t_user_crypto: ~5 rows (approximately)
/*!40000 ALTER TABLE `t_user_crypto` DISABLE KEYS */;
INSERT IGNORE INTO `t_user_crypto` (`id`, `crypto`) VALUES
	(1, NULL),
	(2, '$2b$10$P3Nxb5x4M6EDXgGSwVnUEuJx0WdOILh/gBJX7iWCOagGuj6L6DPga'),
	(3, '$2b$10$Cxbind/MPzeczA5g/AjRFOjSfrKls80frDwxX54d5.zSzFM1lRyou'),
	(4, '$2b$10$78tx1G5SAMWiPXa5Zepk5uG8ecVMaMORRCXnAibYbrt4Kctn.MJZi'),
	(5, '$2b$10$LY1Ig7HaNBGuvDG9HbyPuO1UF2qc82p6m.4mmMrousSIFSoTYqVby');
/*!40000 ALTER TABLE `t_user_crypto` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

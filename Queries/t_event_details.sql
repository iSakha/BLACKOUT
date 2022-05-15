-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Май 15 2022 г., 12:49
-- Версия сервера: 5.7.37-cll-lve
-- Версия PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `aestheti_test_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `t_event_details`
--

CREATE TABLE `t_event_details` (
  `id` int(11) NOT NULL,
  `id_event` int(11) NOT NULL,
  `id_phase` int(11) NOT NULL,
  `start` timestamp NULL DEFAULT NULL,
  `end` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `t_event_details`
--

INSERT INTO `t_event_details` (`id`, `id_event`, `id_phase`, `start`, `end`) VALUES
(1, 113, 2, '2022-05-13 11:00:00', '2022-05-13 13:00:00'),
(2, 113, 3, '2022-05-13 15:00:00', '2022-05-14 03:00:00'),
(5, 113, 4, '2022-05-14 06:00:00', '2022-05-14 17:00:00'),
(6, 113, 5, '2022-05-15 07:00:00', '2022-05-15 18:00:00'),
(7, 113, 5, '2022-05-16 07:00:00', '2022-05-16 18:00:00'),
(8, 113, 5, '2022-05-17 07:00:00', '2022-05-17 18:00:00'),
(9, 113, 6, '2022-05-18 06:00:00', '2022-05-19 06:00:00'),
(10, 113, 7, '2022-05-19 08:00:00', '2022-05-19 11:00:00'),
(11, 115, 2, '2022-04-18 04:00:00', '2022-04-18 07:00:00'),
(12, 115, 3, '2022-04-18 11:00:00', '2022-04-18 19:00:00'),
(13, 115, 5, '2022-04-19 06:00:00', '2022-04-19 19:00:00'),
(14, 115, 6, '2022-04-19 19:00:00', '2022-04-20 03:00:00'),
(15, 115, 7, '2022-04-20 08:00:00', '2022-04-20 12:00:00'),
(16, 117, 2, '2022-05-18 11:00:00', '2022-05-18 13:00:00'),
(17, 117, 7, '2022-06-19 07:00:00', '2022-06-19 11:00:00');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `t_event_details`
--
ALTER TABLE `t_event_details`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `FK_t_event_details_t_events` (`id_event`) USING BTREE,
  ADD KEY `FK_t_event_details_t_event_phase` (`id_phase`) USING BTREE;

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `t_event_details`
--
ALTER TABLE `t_event_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `t_event_details`
--
ALTER TABLE `t_event_details`
  ADD CONSTRAINT `t_event_details_ibfk_1` FOREIGN KEY (`id_phase`) REFERENCES `t_event_phase` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `t_event_details_ibfk_2` FOREIGN KEY (`id_event`) REFERENCES `t_events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

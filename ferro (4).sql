-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-11-2024 a las 20:47:33
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ferro`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuota`
--

CREATE TABLE `cuota` (
  `ID_Cuota` int(11) NOT NULL,
  `nombreCuota` varchar(30) NOT NULL,
  `monto` int(11) NOT NULL,
  `diadeVencimiento` int(11) NOT NULL,
  `ID_TipoCuota` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cuota`
--

INSERT INTO `cuota` (`ID_Cuota`, `nombreCuota`, `monto`, `diadeVencimiento`, `ID_TipoCuota`) VALUES
(1, 'SOCIO2024', 2000, 10, 1),
(2, 'RIFA2024', 6000, 30, 2),
(3, 'VOLEY2025', 1500, 15, 3),
(9, 'FUTBOL2025', 13000, 14, 3),
(10, 'RIFA2025', 3500, 25, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuotaxpersona`
--

CREATE TABLE `cuotaxpersona` (
  `ID_CuotaXpersona` int(30) NOT NULL,
  `ID_Persona` int(11) DEFAULT NULL,
  `ID_Cuota` int(11) DEFAULT NULL,
  `restan` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cuotaxpersona`
--

INSERT INTO `cuotaxpersona` (`ID_CuotaXpersona`, `ID_Persona`, `ID_Cuota`, `restan`) VALUES
(1, 2, 2, 0),
(2, 1, 1, 8),
(3, 2, 1, 2),
(13, 43, 9, 9),
(14, 368, 10, 7),
(15, 253, 3, 7),
(16, 369, 2, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodo_pago`
--

CREATE TABLE `metodo_pago` (
  `ID_MetodoPago` int(11) NOT NULL,
  `nombreMetodoPago` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `metodo_pago`
--

INSERT INTO `metodo_pago` (`ID_MetodoPago`, `nombreMetodoPago`) VALUES
(1, 'Efectivo'),
(2, 'Mercado Pago'),
(3, 'Debito'),
(4, 'Credito'),
(5, 'Transferencia'),
(6, 'Otro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `ID_Pago` int(11) NOT NULL,
  `fecha_pago` date DEFAULT NULL,
  `ID_Persona` int(11) DEFAULT NULL,
  `ID_Cuota` int(11) DEFAULT NULL,
  `ID_Usuario` int(11) DEFAULT NULL,
  `monto` float DEFAULT NULL,
  `ID_MetodoPago` int(11) DEFAULT NULL,
  `cantidadCuotasPagadas` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pago`
--

INSERT INTO `pago` (`ID_Pago`, `fecha_pago`, `ID_Persona`, `ID_Cuota`, `ID_Usuario`, `monto`, `ID_MetodoPago`, `cantidadCuotasPagadas`) VALUES
(3, '2024-08-25', 1, 1, 3, 6000, 1, 3),
(5, '2024-08-25', 2, 2, 1, 6000, 1, 1),
(15, '2024-09-28', 2, 1, 1, 6000, 5, 3),
(21, '2024-10-28', 2, 2, 1, 36000, 1, 6),
(22, '2024-10-28', 2, 2, 1, 12000, 5, 2),
(23, '2024-10-28', 2, 1, 1, 10000, 5, 5),
(24, '2024-11-10', 1, 1, 1, 2000, 3, 1),
(25, '2024-11-10', 2, 2, 1, 6000, 3, 1),
(26, '2024-11-10', 2, 1, 1, 2000, 2, 1),
(27, '2024-11-10', 2, 1, 1, 2000, 5, 1),
(29, '2024-11-11', 43, 9, 1, 13000, 5, 1),
(30, '2024-11-11', 43, 9, NULL, 13000, 5, 1),
(31, '2024-11-11', 368, 10, NULL, 10500, 3, 3),
(32, '2024-11-11', 2, 1, NULL, 4000, 2, 2),
(33, '2024-11-11', 43, 9, NULL, 13000, 3, 1),
(34, '2024-11-11', 253, 3, NULL, 4500, 2, 3),
(35, '2024-11-11', 369, 2, NULL, 6000, 5, 1),
(36, '2024-11-11', 253, 3, NULL, 1500, 5, 1),
(37, '2024-11-11', 253, 3, NULL, 1500, 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `ID_Persona` int(11) NOT NULL,
  `nro_socio` int(11) DEFAULT NULL,
  `apellido_nombre` varchar(30) DEFAULT NULL,
  `documento` varchar(10) DEFAULT NULL,
  `direccion` varchar(30) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`ID_Persona`, `nro_socio`, `apellido_nombre`, `documento`, `direccion`, `telefono`, `email`, `fecha_inicio`, `fecha_nacimiento`) VALUES
(1, 1, 'ACEDO RODOLFO', '', 'AV. SARMIENTO 795', '', '', '2024-01-01', '2000-01-01'),
(2, 8, 'AIASSA HORACIO LUIS', '', 'SAAVEDRA 645', '', '', '2024-01-01', '2000-01-01'),
(3, 10, 'ALAZIA ANTONIO', '', 'AV. SAN MARTIN 67', '', '', '2024-01-01', '2000-01-01'),
(4, 11, 'ALAZIA ALBERTO ADRIAN', '', 'AV. SAN MARTIN 67', '', '', '2024-01-01', '2000-01-01'),
(5, 12, 'ALAZIA JUAN PEDRO', '', 'DIAG. AMEGHINO 135', '', '', '2024-01-01', '2000-01-01'),
(6, 15, 'ALIAGA JOSE ANTONIO', '', 'PATAGONIA ARGENTINA 253', '', '', '2024-01-01', '2000-01-01'),
(7, 16, 'ALVAREZ LUIS OMAR H.', '', 'M. ARGENTINA 406', '', '', '2024-01-01', '2000-01-01'),
(8, 17, 'ALVAREZ MARIO', '', 'AV. SARMIENTO 648', '', '', '2024-01-01', '2000-01-01'),
(9, 19, 'PELEGRINO ELSA NOEMI', '', '25 DE MAYO 1346', '', '', '2024-01-01', '2000-01-01'),
(10, 23, 'MONTAÑA ARMANDO', '', 'SAAVEDRA', '', '', '2024-01-01', '2000-01-01'),
(11, 24, 'ELORRIAGA HORACIO', '', 'URQUIZA 1634', '', '', '2024-01-01', '2000-01-01'),
(12, 26, 'AZCARATE EDUARDO', '', 'URQUIZA 1121', '', '', '2024-01-01', '2000-01-01'),
(13, 27, 'BARTON EDUARDO', '', '25 DE MAYO 374', '', '', '2024-01-01', '2000-01-01'),
(14, 30, 'BELLO JUAN', '', 'GRAL. LAVALLE 741', '', '', '2024-01-01', '2000-01-01'),
(15, 31, 'BELLO JUAN MANUEL', '', 'ACC. NEWBERY 60', '', '', '2024-01-01', '2000-01-01'),
(16, 32, 'BELTRAL OMAR', '', 'SECCION QUINTAS', '', '', '2024-01-01', '2000-01-01'),
(17, 33, 'BELTRAL RUBEN', '', 'M. BELGRANO 535', '', '', '2024-01-01', '2000-01-01'),
(18, 34, 'BENITO ALBERTO', '', 'M. BELGRANO 472', '', '', '2024-01-01', '2000-01-01'),
(19, 35, 'BIDEGAIN RODOLFO JORGE', '', 'DIAG. PASTEUR 158', '', '', '2024-01-01', '2000-01-01'),
(20, 36, 'BILBAO ERNESTO', '', 'AV. SAN MARTIN 501', '', '', '2024-01-01', '2000-01-01'),
(21, 39, 'BORGOGNO FELIX', '', 'PELLEGRINO 134', '', '', '2024-01-01', '2000-01-01'),
(22, 42, 'CABALLERO JORGE', '', 'AV. SARMIENTO 448', '', '', '2024-01-01', '2000-01-01'),
(23, 44, 'CAIVANO ANIBAL', '', 'RIVADAVIA 927', '', '', '2024-01-01', '2000-01-01'),
(24, 46, 'CARABAJAL MARCOS', '', 'J. M. ESTRADA 613', '', '', '2024-01-01', '2000-01-01'),
(25, 53, 'CESTINO HERNAN', '', 'GRAL. LEMOS 507', '', '', '2024-01-01', '2000-01-01'),
(26, 57, 'CIVALE LUIS', '', 'AV SARMIENTO 596', '', '', '2024-01-01', '2000-01-01'),
(27, 58, 'COCCHI JUAN JOSE ', '', '25 DE MAYO 196', '', '', '2024-01-01', '2000-01-01'),
(28, 61, 'COLUCCI SANTIAGO', '', 'URQUIZA 1045', '', '', '2024-01-01', '2000-01-01'),
(29, 63, 'CONCHEZ ALBERTO', '', 'AV. SARMIENTO 850', '', '', '2024-01-01', '2000-01-01'),
(30, 65, 'CONCHEZ LUIS', '', 'ZONA RURAL', '', '', '2024-01-01', '2000-01-01'),
(31, 66, 'CONCHEZ MARIO', '', 'AV. SAN MARTIN 366', '', '', '2024-01-01', '2000-01-01'),
(32, 71, 'COSSIO ANGEL', '', 'AV. RAWSON 453', '', '', '2024-01-01', '2000-01-01'),
(33, 75, 'D\'AMICO JORGE', '', '25 DE MAYO 1039', '', '', '2024-01-01', '2000-01-01'),
(34, 77, 'DELLACASA ALFREDO', '', 'AV. SARMIENTO 1295', '', '', '2024-01-01', '2000-01-01'),
(35, 79, 'DELLACASA GASTON ', '', 'GRAL. ROCA 226', '', '', '2024-01-01', '2000-01-01'),
(36, 81, 'DELLACASA OMAR ', '', 'CARLOS PELEGRINI 262', '', '', '2024-01-01', '2000-01-01'),
(37, 82, 'DELLACASA PABLO', '', '25 DE MAYO 1263', '', '', '2024-01-01', '2000-01-01'),
(38, 83, 'DELLACASA PEDRO', '', '25 DE MAYO 1263', '', '', '2024-01-01', '2000-01-01'),
(39, 84, 'DELLACASA RAFAEL', '', '25 DE MAYO 1263', '', '', '2024-01-01', '2000-01-01'),
(40, 85, 'DELLACASA ROMAN', '', 'GRAL. PICO', '', '', '2024-01-01', '2000-01-01'),
(41, 87, 'DIAZ HORACIO', '', 'M. ARGENTINA 433', '', '', '2024-01-01', '2000-01-01'),
(42, 89, 'DIESER FELIX', '', 'AV. SARMIENTO ', '', '', '2024-01-01', '2000-01-01'),
(43, 90, 'DIESER MIGUEL ', '', 'AV. URUGUAY 912', '', '', '2024-01-01', '2000-01-01'),
(44, 91, 'DOMIGUEZ JORGE', '', 'BELGRANO 201', '', '', '2024-01-01', '2000-01-01'),
(45, 97, 'ELIAS RUBEN', '', 'AV. SAN MARTIN 502', '', '', '2024-01-01', '2000-01-01'),
(46, 98, 'ELIZALDE GUSTAVO', '', 'QUINTA N29', '', '', '2024-01-01', '2000-01-01'),
(47, 100, 'ENZ FEDERICO', '', 'J. M. ESTRADA', '', '', '2024-01-01', '2000-01-01'),
(48, 101, 'ENZ REINALDO', '', 'AV. SAN MARTIN 107', '', '', '2024-01-01', '2000-01-01'),
(49, 102, 'ERQUICIA JORGE ', '', 'RIVADAVIA 1135', '', '', '2024-01-01', '2000-01-01'),
(50, 103, 'ERQUICIA NESTOR', '', 'CARLO PELEGRINI 122', '', '', '2024-01-01', '2000-01-01'),
(51, 110, 'FERNANDES RUBEN I.', '', 'AV. URUGUAY 1055', '', '', '2024-01-01', '2000-01-01'),
(52, 111, 'FERRERO NESTOR ', '', 'DIAG. AUBIN', '', '', '2024-01-01', '2000-01-01'),
(53, 112, 'FERRERO ROBERTO', '', 'M. BELGRANO 428', '', '', '2024-01-01', '2000-01-01'),
(54, 114, 'FIQUEPRON RAUL', '', 'QUINTA  N83', '', '', '2024-01-01', '2000-01-01'),
(55, 116, 'FRANCO NALDO', '', 'DIAG. R. E. DE SAN MARTIN 165', '', '', '2024-01-01', '2000-01-01'),
(56, 118, 'GALLIA ALFREDO', '', 'AV. SARMIENTO 207', '', '', '2024-01-01', '2000-01-01'),
(57, 119, 'GALLO MARCELO', '', 'JUAN JOSE PASO 325', '', '', '2024-01-01', '2000-01-01'),
(58, 120, 'GARCIA HORACIO ', '', 'CARLOS PELLEGRINI 953', '', '', '2024-01-01', '2000-01-01'),
(59, 122, 'GHISIO OMAR', '', 'M. BELGRANO 691', '', '', '2024-01-01', '2000-01-01'),
(60, 127, 'HERRERO ADOLFO', '', 'AV. ESPAÑA 327', '', '', '2024-01-01', '2000-01-01'),
(61, 129, 'HEVIA CARLOS', '', '9 DE JULIO 404', '', '', '2024-01-01', '2000-01-01'),
(62, 131, 'HORODESKI HUGO A', '', 'PJE. LA PAMPA 553', '', '', '2024-01-01', '2000-01-01'),
(63, 132, 'IBAYBARRIAGA EDUARDO', '', 'CARLOS PELLEGRINI 742', '', '', '2024-01-01', '2000-01-01'),
(64, 133, 'INGARAMO ALBERTO', '', 'AV. AVELLANEDA ', '', '', '2024-01-01', '2000-01-01'),
(65, 134, 'ISIDRO MIGUEL ANGEL', '', '9 DE JULIO 666', '', '', '2024-01-01', '2000-01-01'),
(66, 146, 'LASCALEA JUAN E.', '', 'J. M. ESTRADA 557', '', '', '2024-01-01', '2000-01-01'),
(67, 151, 'LUIS HORACIO', '', 'LAPRIDA 267', '', '', '2024-01-01', '2000-01-01'),
(68, 156, 'MARTIN ALEJANDRO', '', 'SECCION QUINTAS', '', '', '2024-01-01', '2000-01-01'),
(69, 157, 'MARTIN ROBERTO JAVIAR ', '', '9 DE JULIO 1448', '', '', '2024-01-01', '2000-01-01'),
(70, 159, 'MARTINEZ ANTONIO', '', '', '', '', '2024-01-01', '2000-01-01'),
(71, 160, 'MARTY HEGUY GUILLERMO', '', 'STO. CABRAL ', '', '', '2024-01-01', '2000-01-01'),
(72, 180, 'PEPA EDUARDO', '', 'AV. SARMIENTO 536', '', '', '2024-01-01', '2000-01-01'),
(73, 181, 'PEPA JORGE', '', 'QUINTA N64', '', '', '2024-01-01', '2000-01-01'),
(74, 183, 'PEPA OSCAR A.', '', '25 DE MAYO 1273', '', '', '2024-01-01', '2000-01-01'),
(75, 187, 'PETISCO FRANCISCO', '', 'ZONA RURAL', '', '', '2024-01-01', '2000-01-01'),
(76, 191, 'PONT JUAN', '', 'PATAG. ARGENTINA 467', '', '', '2024-01-01', '2000-01-01'),
(77, 192, 'QUIROGA RAUL', '', 'URQUIZA 591', '', '', '2024-01-01', '2000-01-01'),
(78, 193, 'RAIMUNDI RICARDO', '', 'URQUIZA 1083', '', '', '2024-01-01', '2000-01-01'),
(79, 194, 'RAMIREZ JORGE MANUEL', '', 'JOSE HERNANDEZ 6', '', '', '2024-01-01', '2000-01-01'),
(80, 196, 'RIBOTTA NELSON', '', '25 DE MAYO 1328', '', '', '2024-01-01', '2000-01-01'),
(81, 197, 'RIO GERMAN FELIX L.', '', 'AV. SAN MARTIN 123', '', '', '2024-01-01', '2000-01-01'),
(82, 202, 'RODRIGUEZ RAUL', '', 'AV. ESPAÑA 234', '', '', '2024-01-01', '2000-01-01'),
(83, 207, 'ROVEGLIA JOSE LUIS', '', 'AV. ESPAÑA 266', '', '', '2024-01-01', '2000-01-01'),
(84, 210, 'SAFFENI PEDRO ANIBAL', '', 'SECCION QUINTAS', '', '', '2024-01-01', '2000-01-01'),
(85, 217, 'SCHRODER GERMAN', '', 'AV. ESPAÑA 573', '', '', '2024-01-01', '2000-01-01'),
(86, 223, 'STEIB ALEJANDRO', '', '', '', '', '2024-01-01', '2000-01-01'),
(87, 225, 'STELLA CARLOS A.', '', '9 DE JULIO 337', '', '', '2024-01-01', '2000-01-01'),
(88, 227, 'SUAREZ JORGE', '', 'MALVINAS ARGENTINAS 572', '', '', '2024-01-01', '2000-01-01'),
(89, 233, 'URTIAGA DANIEL A.', '', '', '', '', '2024-01-01', '2000-01-01'),
(90, 234, 'USTARROZ ALEJANDRO', '', '25 DE MAYO ', '', '', '2024-01-01', '2000-01-01'),
(91, 236, 'VASSALLO EDUARDO', '', '9 DE JULIO 1356', '', '', '2024-01-01', '2000-01-01'),
(92, 239, 'VASSALLO MARIANO C.', '', 'M. MORENO 688', '', '', '2024-01-01', '2000-01-01'),
(93, 241, 'VASSALLO RUBEN ', '', 'CARLOS PELLEGRINI', '', '', '2024-01-01', '2000-01-01'),
(94, 242, 'VERNA OSCAR', '', '9 DE JULIO 1377', '', '', '2024-01-01', '2000-01-01'),
(95, 244, 'VICENTE VALENTIN', '', 'JOSE M. ESTRADA 596', '', '', '2024-01-01', '2000-01-01'),
(96, 246, 'VILLORIA CELSO', '', 'JUAN JOSE PASO 295', '', '', '2024-01-01', '2000-01-01'),
(97, 247, 'VILLORIA HECTOR', '', 'JUAN JOSE PASO 295', '', '', '2024-01-01', '2000-01-01'),
(98, 248, 'VILLORIA JOSE LUIS ', '', 'J. M. ESTRADA 765', '', '', '2024-01-01', '2000-01-01'),
(99, 249, 'AGUIRRE MARTA ', '', 'M. BELGRANO 373', '', '', '2024-01-01', '2000-01-01'),
(100, 250, 'ALAZIA ROSA ', '', 'DIAG. AMEGHINO 71', '', '', '2024-01-01', '2000-01-01'),
(101, 254, 'BARROS FABIANA NOEMI', '', '25 DE MAYO 196', '', '', '2024-01-01', '2000-01-01'),
(102, 257, 'BLANCO SUSANA ', '', 'LAPRIDA 267', '', '', '2024-01-01', '2000-01-01'),
(103, 260, 'CABUTTO ELENA', '', 'AV. SAN MARTIN 67', '', '', '2024-01-01', '2000-01-01'),
(104, 261, 'CAIVANO ANDREA ', '', 'AV. SAN MARTIN 587', '', '', '2024-01-01', '2000-01-01'),
(105, 262, 'CAIVANO BIBIANA', '', 'URQUIZA 1045', '', '', '2024-01-01', '2000-01-01'),
(106, 263, 'CAIVANO NORMA', '', '25 DE MAYO 1273', '', '', '2024-01-01', '2000-01-01'),
(107, 264, 'CAIVANO SUSANA ', '', 'SECCION QUINTAS', '', '', '2024-01-01', '2000-01-01'),
(108, 267, 'CARIDE LILIAN', '', 'URQUIZA 1083', '', '', '2024-01-01', '2000-01-01'),
(109, 269, 'CASTRESANA DORA', '', 'CARLOS PELLEGRINI 122', '', '', '2024-01-01', '2000-01-01'),
(110, 270, 'CASTRO VIRGINIA E.', '', 'J. M. ESTRADA 613', '', '', '2024-01-01', '2000-01-01'),
(111, 272, 'CERUTTI MARIA CECILIA ', '', '25 DE MAYO 1263', '', '', '2024-01-01', '2000-01-01'),
(112, 278, 'COCCHI MARIA LUISA', '', 'AV. RAWSON 491', '', '', '2024-01-01', '2000-01-01'),
(113, 279, 'CONCHEZ MARIA JOSEFINA ', '', '25 DE MAYO 1328', '', '', '2024-01-01', '2000-01-01'),
(114, 281, 'DALMASSO ADRIANA', '', 'M. BELGRANO 331', '', '', '2024-01-01', '2000-01-01'),
(115, 288, 'DELLACASA MARIA DE LA PAZ', '', '25 DE MAYO 1263', '', '', '2024-01-01', '2000-01-01'),
(116, 289, 'DELLACASA NINA ANDREA ', '', 'SECCION QUINTAS', '', '', '2024-01-01', '2000-01-01'),
(117, 294, 'GARCIA SILVIA ', '', 'SECCION QUINTAS', '', '', '2024-01-01', '2000-01-01'),
(118, 297, 'GUIÑAZU ESTHER ', '', 'DIAG. PASTEUR 158', '', '', '2024-01-01', '2000-01-01'),
(119, 300, 'LAFUENTE ADRIANA L. ', '', '9 DE JULIO 462', '', '', '2024-01-01', '2000-01-01'),
(120, 304, 'HERRERO GUSTAVO ', '', 'AV. SAN MARTIN 160', '', '', '2024-01-01', '2000-01-01'),
(121, 308, 'MANGAS MIRTA ', '', 'QUINTA Nº83', '', '', '2024-01-01', '2000-01-01'),
(122, 309, 'MAYORDOMO MARIA ROSA ', '', '9 DE JULIO 1377', '', '', '2024-01-01', '2000-01-01'),
(123, 310, 'MENDIONDO MARIA E.', '', 'BELGRANO 318', '', '', '2024-01-01', '2000-01-01'),
(124, 311, 'MENDIONDO ANDREA ', '', 'SECCION QUINTAS', '', '', '2024-01-01', '2000-01-01'),
(125, 313, 'MOBIGLIA MIRTA', '', 'AV. SAN MARTIN 107', '', '', '2024-01-01', '2000-01-01'),
(126, 314, 'MUÑOZ ANA MARIA ', '', 'AV. SARMIENTO 1294', '', '', '2024-01-01', '2000-01-01'),
(127, 315, 'NAVAZZOTTI ALICIA ', '', '25 DE MAYO 1333', '', '', '2024-01-01', '2000-01-01'),
(128, 316, 'NIETO MATILDE ', '', 'LAVALLE 741', '', '', '2024-01-01', '2000-01-01'),
(129, 318, 'PEPA ANA LAURA', '', '25 DE MAYO 1273', '', '', '2024-01-01', '2000-01-01'),
(130, 319, 'PEPA MARIANA ', '', '25 DE MAYO 1273', '', '', '2024-01-01', '2000-01-01'),
(131, 324, 'PETISCO MARTA H.', '', 'PJE. NEUQUEN 336', '', '', '2024-01-01', '2000-01-01'),
(132, 329, 'RIBOTTA CONCHEZ M. FLORENCIA', '', '25 DE MAYO 1328', '', '', '2024-01-01', '2000-01-01'),
(133, 333, 'SAN ROMAN CELESTE ', '', 'M. BELGRANO 373', '', '', '2024-01-01', '2000-01-01'),
(134, 334, 'SAVINI CELINA', '', 'JUAN JOSE PASO 295', '', '', '2024-01-01', '2000-01-01'),
(135, 337, 'STELLA IDA', '', 'CARLOS PELLEGRINI 353', '', '', '2024-01-01', '2000-01-01'),
(136, 338, 'TABLADO AGOSTINA ', '', 'M. BELGRANO 338', '', '', '2024-01-01', '2000-01-01'),
(137, 339, 'TONELLI MARIA GIMENA ', '', 'M. BELGARNO ', '', '', '2024-01-01', '2000-01-01'),
(138, 342, 'VERNA ALICIA ', '', 'AV. ESPAÑA 266', '', '', '2024-01-01', '2000-01-01'),
(139, 355, 'MARTIN ADRIAN ', '', 'M. BELGRANO ', '', '', '2024-01-01', '2000-01-01'),
(140, 358, 'ACHAVAL MIGUEL ANGEL', '', 'AV. SARMIENTO 755', '', '', '2024-01-01', '2000-01-01'),
(141, 362, 'MARTIN HECTOR MARIO', '', 'SAAVEDRA 699', '', '', '2024-01-01', '2000-01-01'),
(142, 369, 'ANDRADA NIDIA ', '', 'AV. SARMIENTO 268', '', '', '2024-01-01', '2000-01-01'),
(143, 376, 'ALVAREZ JOSE LUIS ', '', 'MALVINAS ARGENTINAS 406', '', '', '2024-01-01', '2000-01-01'),
(144, 381, 'ACEDO RUBEN D.', '', 'DIAG. AMEGHINO 121', '', '', '2024-01-01', '2000-01-01'),
(145, 390, 'ROVEGLIA CARLOS ALBERTO', '', 'M. BELGRANO 541', '', '', '2024-01-01', '2000-01-01'),
(146, 395, 'ROVEGLIA JUAN PABLO ', '', 'AV. ESPAÑA 266', '', '', '2024-01-01', '2000-01-01'),
(147, 404, 'FALKENSTEIN CARLOS A.', '', 'RIVADAVIA 645', '', '', '2024-01-01', '2000-01-01'),
(148, 409, 'FALKENSTEIN DANIEL', '', 'AV. SARRMIENTO 1506', '', '', '2024-01-01', '2000-01-01'),
(149, 421, 'NIETO MAURO GILLERMO', '', '', '', '', '2024-01-01', '2000-01-01'),
(150, 423, 'PICCO FELIX', '', 'M. BELGRANO 741', '', '', '2024-01-01', '2000-01-01'),
(151, 436, 'LOPEZ GODOY JUAN MATIN', '', 'PELLEGRINI 312', '', '', '2024-01-01', '2000-01-01'),
(152, 437, 'FALKENSTEIN RUBEN D.', '', 'PELLEGRINI 734', '', '', '2024-01-01', '2000-01-01'),
(153, 440, 'MAURIÑO FEDERICO', '', 'ZONA RURAL', '', '', '2024-01-01', '2000-01-01'),
(154, 444, 'DELLACASA IGNACIO', '', 'GRAL. ROCA 226', '', '', '2024-01-01', '2000-01-01'),
(155, 445, 'CASELLA SERGIO D.', '', 'SECCION QUINTAS', '', '', '2024-01-01', '2000-01-01'),
(156, 446, 'DEL VALLE ROSA ', '', 'ZONA RURAL', '', '', '2024-01-01', '2000-01-01'),
(157, 447, 'SANCHEZ FABIAN', '', 'ACC. FORTIN ALSINA', '', '', '2024-01-01', '2000-01-01'),
(158, 448, 'PONCE JORGE JULIO', '', 'J. M. ESTRADA', '', '', '2024-01-01', '2000-01-01'),
(159, 449, 'COMOGLIO ROBERTO P. ', '', 'DIAG. PASTEUR ', '', '', '2024-01-01', '2000-01-01'),
(160, 460, 'HEVIA DANIEL OSCAR ', '', 'URQUIZA 791', '', '', '2024-01-01', '2000-01-01'),
(161, 462, 'ABONS LETICIA ZULEMA', '', 'RIVADAVIA 645', '', '', '2024-01-01', '2000-01-01'),
(162, 474, 'ALVAREZ SILVANA', '', 'PJE. HERRERA 1059', '', '', '2024-01-01', '2000-01-01'),
(163, 492, 'GOMEZ HUGO ROBERTO', '', '9 DE JULIO 1491 ', '', '', '2024-01-01', '2000-01-01'),
(164, 496, 'PINEDO FLAMIRIO VICENTE', '', 'DIAG. PASTEUR ', '', '', '2024-01-01', '2000-01-01'),
(165, 505, 'ALVAREZ VERONICA ', '', 'M. ARGENTINAS 406', '', '', '2024-01-01', '2000-01-01'),
(166, 507, 'ALVAREZ SEBASTIAN ', '', 'AV. RAWSON ', '', '', '2024-01-01', '2000-01-01'),
(167, 512, 'CONTERAS MONICA ESTER', '', 'PJE. CHUBUT 507', '', '', '2024-01-01', '2000-01-01'),
(168, 513, 'TRECCO RICARDO MIGUEL', '', 'PJE. CHUBUT 507', '', '', '2024-01-01', '2000-01-01'),
(169, 514, 'PERASSI CARLOS ALBERTO ', '', 'SECCION QUINTAS', '', '', '2024-01-01', '2000-01-01'),
(170, 530, 'MARSIGLIO MARCELO VICENTE ', '', 'AV. ESPAÑA Y AV. SARMIENTO', '', '', '2024-01-01', '2000-01-01'),
(171, 533, 'QUIROGA ADELA', '', 'LAPRIDA 693', '', '', '2024-01-01', '2000-01-01'),
(172, 534, 'UGHETTI JUAN PABLO ', '', 'LAPRIDA 693', '', '', '2024-01-01', '2000-01-01'),
(173, 537, 'SOTELO RUBEN', '', 'AV. RAWSON ', '', '', '2024-01-01', '2000-01-01'),
(174, 538, 'CESTINO CRISTIAN', '', 'AV. SARMIENTO ', '', '', '2024-01-01', '2000-01-01'),
(175, 541, 'ZIGLER SILVIA ', '', '', '', '', '2024-01-01', '2000-01-01'),
(176, 545, 'CAIVANO LILIANA ISABEL', '', 'JUAN M. ESTRADA 336', '', '', '2024-01-01', '2000-01-01'),
(177, 546, 'DOMINGUEZ CLAUDIA ', '', '25 DE MAYO 163', '', '', '2024-01-01', '2000-01-01'),
(178, 551, 'GALLO CARLOS ALBERTO', '', 'AV. AVELLANEDA 1255', '', '', '2024-01-01', '2000-01-01'),
(179, 554, 'VAZQUEZ HUGO ALFREDO', '', 'PJE. HERRERA 1059', '', '', '2024-01-01', '2000-01-01'),
(180, 561, 'ARROLA FABIAN OSCAR', '', 'M. BELGRANO 447', '', '', '2024-01-01', '2000-01-01'),
(181, 562, 'NIETO ERNESTO ALEJANDRO', '', 'LAVALLE 658', '', '', '2024-01-01', '2000-01-01'),
(182, 566, 'SUAREZ ESTEBAN DARIO', '', 'GRAL. ROCA 481', '', '', '2024-01-01', '2000-01-01'),
(183, 573, 'OLGUIN CARLOS OMAR ', '', 'AV. SARMIENTO 1373', '', '', '2024-01-01', '2000-01-01'),
(184, 575, 'BOGLIOLO ROBERTO A.', '', 'DIAG. AMEHINO 71', '', '', '2024-01-01', '2000-01-01'),
(185, 580, 'VILLORIA ELSA BEATRIZ', '', '9 DE JULIO ', '', '', '2024-01-01', '2000-01-01'),
(186, 586, 'BENGOCHEA RODOLFO', '', 'LAVALLE', '', '', '2024-01-01', '2000-01-01'),
(187, 609, 'ROSIERE ANA LUISA ', '', 'AV. SAN MARTIN 160', '', '', '2024-01-01', '2000-01-01'),
(188, 611, 'HORODESKI ARIEL ', '', 'AV. ESPAÑA 683', '', '', '2024-01-01', '2000-01-01'),
(189, 614, 'SUBIAS GRACIELA ROSA', '', 'SECCION QUINTAS', '', '', '2024-01-01', '2000-01-01'),
(190, 618, 'CABALLERO HORACIO', '', '25 DE MAYO 146', '', '', '2024-01-01', '2000-01-01'),
(191, 621, 'DELLACASA JAZMIN', '', 'ROCA 226', '', '', '2024-01-01', '2000-01-01'),
(192, 622, 'DELLACASA SOFIA', '', 'SAAVEDRA 673', '', '', '2024-01-01', '2000-01-01'),
(193, 625, 'FIORE OMAR DANIEL', '', 'AV. SARMIENTO 1339', '', '', '2024-01-01', '2000-01-01'),
(194, 638, 'SUBIAS ALFONSO DOMINGO', '', 'SAAVEDRA 673', '', '', '2024-01-01', '2000-01-01'),
(195, 641, 'CACERES JUAN HUMBERTO', '', 'SAAVEDRA', '', '', '2024-01-01', '2000-01-01'),
(196, 649, 'GIORDANO MARCELO', '', 'URQUIZA 641', '', '', '2024-01-01', '2000-01-01'),
(197, 650, 'GIORDANO CARLOS MARIA', '', 'AV. ESPAÑA', '', '', '2024-01-01', '2000-01-01'),
(198, 656, 'SAFFENI FRANCO', '', 'SECCION QUINTAS', '', '', '2024-01-01', '2000-01-01'),
(199, 658, 'CUADRADO MARIA LUISA', '', 'AV. AVELLANEDA 234', '', '', '2024-01-01', '2000-01-01'),
(200, 661, 'CARRANZA MATIAS JESUS', '', 'AV ESPAÑA 564', '', '', '2024-01-01', '2000-01-01'),
(201, 662, 'HERNANDEZ ANIBAL ', '', '25 DE MAYO 417', '', '', '2024-01-01', '2000-01-01'),
(202, 664, 'ENZ ARMIN FEDERICO', '', 'VILLA SAUCE', '', '', '2024-01-01', '2000-01-01'),
(203, 665, 'ENZ AUGUSTO FEDERICO', '', 'VILLA SAUCE', '', '', '2024-01-01', '2000-01-01'),
(204, 668, 'VASSALLO SEBASTIAN ANDRES', '', 'TTE. BOLZAN 113', '', '', '2024-01-01', '2000-01-01'),
(205, 671, 'ROJO CEFERINO', '', 'SECCION QUINTAS', '', '', '2024-01-01', '2000-01-01'),
(206, 686, 'HEGUY EDUARDO', '', 'SECCION QUINTAS', '', '', '2024-01-01', '2000-01-01'),
(207, 693, 'FERNANDEZ ANTONIO', '', 'AV. SAN MARTIN 360', '', '', '2024-01-01', '2000-01-01'),
(208, 695, 'VICENTE GARCIA VALENTINA', '', 'URQUIZA 106', '', '', '2024-01-01', '2000-01-01'),
(209, 697, 'GARCIA ANABELLA C.', '', 'URQUIZA 106', '', '', '2024-01-01', '2000-01-01'),
(210, 698, 'ALAZIA PEDRO FERNANDO', '', 'DIAG. AMEGHINO 135', '', '', '2024-01-01', '2000-01-01'),
(211, 699, 'FALKENSTEIN FABIAN ANIBAL', '', 'J. J. PASO 151', '', '', '2024-01-01', '2000-01-01'),
(212, 703, 'PALACIO JUAN CRUZ', '', 'M. MORENO', '', '', '2024-01-01', '2000-01-01'),
(213, 704, 'ERQUICIA LUCIA', '', 'CARLOS PELLEGRINI 122', '', '', '2024-01-01', '2000-01-01'),
(214, 710, 'ZUÑIGA OSCAR', '', 'MITRE', '', '', '2024-01-01', '2000-01-01'),
(215, 714, 'SEISDEODOS ALEJANDRO', '', 'URQUIZA 1090', '', '', '2024-01-01', '2000-01-01'),
(216, 715, 'MONICALIERI OSCAR MARTIN', '', '', '', '', '2024-01-01', '2000-01-01'),
(217, 717, 'PALACIO JUAN PEDRO', '', 'M. MORENO', '', '', '2024-01-01', '2000-01-01'),
(218, 718, 'CARRANZA SILVANA MARIA', '', 'RIVADAVIA', '', '', '2024-01-01', '2000-01-01'),
(219, 719, 'MORONTA FRANCISCO', '', 'DIAG. R. E. DE SAN MARTIN', '', '', '2024-01-01', '2000-01-01'),
(220, 720, 'CONCHEZ TOMAS ', '', 'ZONA RURAL', '', '', '2024-01-01', '2000-01-01'),
(221, 721, 'PETISCO HECTOR ANIBAL', '', 'DIAG. AMIGHINO', '', '', '2024-01-01', '2000-01-01'),
(222, 722, 'GARCIA MARISA ', '', 'URQUIZA 791', '', '', '2024-01-01', '2000-01-01'),
(223, 724, 'DEMARIA ANIBAL ', '', 'MITRE 634', '', '', '2024-01-01', '2000-01-01'),
(224, 725, 'VASSALLO ALEJANDRO', '', 'C. PELLEGRINI Y M. BELGRANO', '', '', '2024-01-01', '2000-01-01'),
(225, 726, 'PELLEGRINO JOSE MARIA', '', 'AV. RAWSON ', '', '', '2024-01-01', '2000-01-01'),
(226, 732, 'REBICHINI EVANGELINA ', '', '', '', '', '2024-01-01', '2000-01-01'),
(227, 735, 'MAURIÑO FEDERICO JOSE', '', '', '', '', '2024-01-01', '2000-01-01'),
(228, 736, 'ALAZIA DIEGO ARIEL ', '', 'AV. SAN MARTIN 67', '', '', '2024-01-01', '2000-01-01'),
(229, 737, 'ALAZIA CAYETANO ', '', 'DIAG. AMEGHINO 135', '', '', '2024-01-01', '2000-01-01'),
(230, 738, 'ERQUICIA JOSE MARTIN ', '', 'C. PELLEGRINI  122', '', '', '2024-01-01', '2000-01-01'),
(231, 744, 'VAZQUEZ SILVIA ESTELA ', '', 'AV. SARMIENTO 648', '', '', '2024-01-01', '2000-01-01'),
(232, 746, 'SUAREZ ANDREA ', '', 'SECCION QUINTAS', '', '', '2024-01-01', '2000-01-01'),
(233, 748, 'SOSA LEILA ', '', 'LAVALLE 383', '', '', '2024-01-01', '2000-01-01'),
(234, 749, 'SOSA LEONARDO C. ', '', 'LAVALLE 383', '', '', '2024-01-01', '2000-01-01'),
(235, 752, 'STEIB SOFIA', '', '', '', '', '2024-01-01', '2000-01-01'),
(236, 754, 'MIGLIORE NESTOR RAUL ', '', 'LAVALLE 1352', '', '', '2024-01-01', '2000-01-01'),
(237, 755, 'MACHADO EVANGELINA ', '', 'FRAY C. RODRIGUEZ ', '', '', '2024-01-01', '2000-01-01'),
(238, 756, 'PALACIO ALEJANDRA ', '', 'PELLEGRINI 122', '', '', '2024-01-01', '2000-01-01'),
(239, 758, 'ALVAREZ VAZQUEZ FEDERICO', '', 'AV. SARMIENTO', '', '', '2024-01-01', '2000-01-01'),
(240, 760, 'CASAÑAS ANIBAL ', '', 'AV. SAN MARIN 616', '', '', '2024-01-01', '2000-01-01'),
(241, 763, 'ANDRADA ROBERTO ', '', 'YAPEYU 447', '', '', '2024-01-01', '2000-01-01'),
(242, 769, 'COCCHI MARCOS ', '', 'ESTRADA 607', '', '', '2024-01-01', '2000-01-01'),
(243, 771, 'CARABAJAL JUAN CRUZ ', '', 'J. M. ESTRADA 613', '', '', '2024-01-01', '2000-01-01'),
(244, 772, 'OLIVERA REBICHINI TOMAS ', '', '', '', '', '2024-01-01', '2000-01-01'),
(245, 773, 'UGHETTI CRISTIAN DAMIAN ', '', 'LAPRIDA 693', '', '', '2024-01-01', '2000-01-01'),
(246, 774, 'PEOLA JAVIER ', '', '25 DE MAYO 798', '', '', '2024-01-01', '2000-01-01'),
(247, 775, 'HEVIA IVANA SOLEDAD ', '', 'URQUIZA 791', '', '', '2024-01-01', '2000-01-01'),
(248, 776, 'HEVIA SILVANA SOLEDAD ', '', 'URQUIZA 791', '', '', '2024-01-01', '2000-01-01'),
(249, 778, 'BARTON JUAN CRUZ ', '', 'ROCA 349', '', '', '2024-01-01', '2000-01-01'),
(250, 782, 'HEVIA IGNACIO ', '', '9 DE JULIO 404', '', '', '2024-01-01', '2000-01-01'),
(251, 783, 'HEVIA GONZALO ', '', '9 DE JULIO 404', '', '', '2024-01-01', '2000-01-01'),
(252, 784, 'PASCAL ELENA VALERIA ', '', 'TTE. BOLZAN 94', '', '', '2024-01-01', '2000-01-01'),
(253, 787, 'PEREZ JOSE MARIA ', '', 'AV. ESPAÑA 625', '', '', '2024-01-01', '2000-01-01'),
(254, 790, 'SARANDON SEBASTIAN ELIAS ', '', 'PJE. POMES Nº77', '', '', '2024-01-01', '2000-01-01'),
(255, 794, 'BELOQUI JUSTO', '', '25 DE MAYO 1273', '', '', '2024-01-01', '2000-01-01'),
(256, 795, 'BELLO LUISINA ', '', 'LAVALLE 741', '', '', '2024-01-01', '2000-01-01'),
(257, 796, 'GONZALO MARIA JOSE ', '', 'AV. SAN MARTIN 300', '', '', '2024-01-01', '2000-01-01'),
(258, 798, 'COUDER MARCELO ', '', 'C. PELLEGRINI ', '', '', '2024-01-01', '2000-01-01'),
(259, 799, 'GONZALEZ CRISTIAN O. ', '', 'PJE. LEMOS 438', '', '', '2024-01-01', '2000-01-01'),
(260, 804, 'NAVOA LUIS CESAR ', '', 'DIAG. PASTEUR 165', '', '', '2024-01-01', '2000-01-01'),
(261, 805, 'CORIA LUCIANO G. ', '', 'JUAN J. PASSO 687', '', '', '2024-01-01', '2000-01-01'),
(262, 808, 'LEMOS PAMELA LUJAN ', '', '', '', '', '2024-01-01', '2000-01-01'),
(263, 809, 'VERA CARLOS MAXIMILIANO ', '', '', '', '', '2024-01-01', '2000-01-01'),
(264, 812, 'TOSELLI MARIA ', '', 'RIVADAVIA 1045', '', '', '2024-01-01', '2000-01-01'),
(265, 813, 'GUILLEMET MARTIN ', '', '9 DE JULIO 823', '', '', '2024-01-01', '2000-01-01'),
(266, 817, 'GANDINO ANDRES ', '', 'AV. AVELLANEDA 526', '', '', '2024-01-01', '2000-01-01'),
(267, 821, 'IGLESIAS LEONARDO ', '', 'AV. URUGUAY Y PELLEGRINI ', '', '', '2024-01-01', '2000-01-01'),
(268, 822, 'MARTINEZ GARCIA M.', '', 'A, VAZQUEZ 264', '', '', '2024-01-01', '2000-01-01'),
(269, 823, 'VERONICA ROJAS', '', '25 DE MAYO 417', '', '', '2024-01-01', '2000-01-01'),
(270, 824, 'STEIB PAMELA NATALIA ', '', 'ACC. NEWBERY 60', '', '', '2024-01-01', '2000-01-01'),
(271, 825, 'NIETO JUAN PABLO ', '', 'PELLEGRINI 686', '', '', '2024-01-01', '2000-01-01'),
(272, 827, 'MOLINA AILIN ', '', 'RIVADAVIA 1210', '', '', '2024-01-01', '2000-01-01'),
(273, 828, 'GUTIERREZ JORGE OSCAR ', '', 'J. J. PASSO 364', '', '', '2024-01-01', '2000-01-01'),
(274, 829, 'MENSI VIVIANA LORENA ', '', 'AV. AVELLANEDA 626', '', '', '2024-01-01', '2000-01-01'),
(275, 830, 'UGHETTI MARIA EMILIA ', '', 'LAPRIDA 693', '', '', '2024-01-01', '2000-01-01'),
(276, 831, 'FERNANDEZ MARCOS ', '', '9 DE JULIO 212', '', '', '2024-01-01', '2000-01-01'),
(277, 835, 'LUNA EZEQUIEL ', '', 'LAPRIDA 805', '', '', '2024-01-01', '2000-01-01'),
(278, 837, 'UGHETTI JUAN ESTEBAN ', '', 'LAPRIDA 693', '', '', '2024-01-01', '2000-01-01'),
(279, 839, 'MALLARINO MERISA ', '', 'ISLA SOLEDAD 275', '', '', '2024-01-01', '2000-01-01'),
(280, 840, 'MALLARINO ALEJANDRA ', '', 'AV. PERON 722', '', '', '2024-01-01', '2000-01-01'),
(281, 842, 'CAMPOS NESTOR ALBERTO ', '', '', '', '', '2024-01-01', '2000-01-01'),
(282, 847, 'BELOQUI FELIX ', '', '', '', '', '2024-01-01', '2000-01-01'),
(283, 848, 'MARTIN DAIANA ', '', 'ROCA 667', '', '', '2024-01-01', '2000-01-01'),
(284, 849, 'VICENTE SANTIAGO TOMAS ', '', 'J. M. ESTRADA 667', '', '', '2024-01-01', '2000-01-01'),
(285, 850, 'BOMBEN LUIS ', '', 'ACC. FORTIN ALSINA', '', '', '2024-01-01', '2000-01-01'),
(286, 851, 'PEPA PEDRO ', '', '', '', '', '2024-01-01', '2000-01-01'),
(287, 852, 'UGHETTI JOAQUIN ', '', '', '', '', '2024-01-01', '2000-01-01'),
(288, 858, 'MUJICA JONATAN ALEXIS ', '', '9 DE JULIO 721', '', '', '2024-01-01', '2000-01-01'),
(289, 859, 'BERASTEGUI NATALIA ANDREA  ', '', '9 DE JULIO 721', '', '', '2024-01-01', '2000-01-01'),
(290, 860, 'HORODESKI NOELIA ', '', '25 DE MAYO 351', '', '', '2024-01-01', '2000-01-01'),
(291, 861, 'MOLINA SUSANA BEATRIZ', '', 'J. HERNANDEZ 244', '', '', '2024-01-01', '2000-01-01'),
(292, 862, 'PEPE MIGUEL ANGUEL', '', 'J. HERNANDEZ 244', '', '', '2024-01-01', '2000-01-01'),
(293, 863, 'CONCHEZ LUIS MARIA', '', '', '', '', '2024-01-01', '2000-01-01'),
(294, 864, 'GARCIA MARIA FERNANDA', '', 'ZONA RURAL', '', '', '2024-01-01', '2000-01-01'),
(295, 866, 'GAVOTTI JUAN RODRIGO', '', '', '', '', '2024-01-01', '2000-01-01'),
(296, 868, 'BRAGULAT SOUTO JORGE TOMAS', '', '', '', '', '2024-01-01', '2000-01-01'),
(297, 869, 'BRAGILAT RIBOTTA MARIA CLARA', '', '', '', '', '2024-01-01', '2000-01-01'),
(298, 870, 'MARTINEZ BLANCA ESTHER', '', 'SAAVEDRA 254', '', '', '2024-01-01', '2000-01-01'),
(299, 872, 'FAILLA IGNACIO EZEQUIEL', '', 'PAT. ARGENTINA 365', '', '', '2024-01-01', '2000-01-01'),
(300, 873, 'JAIME RICARDO DARIO', '', 'URQUIZA 644', '', '', '2024-01-01', '2000-01-01'),
(301, 875, 'FERNANDEZ PONT ALFREDO', '', 'AV. SARMIENTO 171', '', '', '2024-01-01', '2000-01-01'),
(302, 876, 'CARDOZO MARIA PAULA', '', 'AV. RAWSON 757', '', '', '2024-01-01', '2000-01-01'),
(303, 877, 'MARTINEZ JORGE', '', 'AV. RAWSON 757', '', '', '2024-01-01', '2000-01-01'),
(304, 878, 'MARIANO OSCAR A.', '', 'CACIQUE MARIANO ROZAS ', '', '', '2024-01-01', '2000-01-01'),
(305, 880, 'NECOCHEA FRANCO', '', 'PJE. RIO NEGRO 253', '', '', '2024-01-01', '2000-01-01'),
(306, 881, 'SEPULVEDA ROSA', '', 'PJE. FRAY L. BELTRAN 785', '', '', '2024-01-01', '2000-01-01'),
(307, 884, 'RAMIREZ JONATHAN', '', '9 DE JULIO 1566', '', '', '2024-01-01', '2000-01-01'),
(308, 885, 'QUINTEROS CARLOS ', '', 'TTE. GUADAGNINI 306', '', '', '2024-01-01', '2000-01-01'),
(309, 886, 'SOSA FERNANDO', '', 'GRAL. PICO', '', '', '2024-01-01', '2000-01-01'),
(310, 887, 'GALLARDO ALDO', '', '', '', '', '2024-01-01', '2000-01-01'),
(311, 888, 'CORNEJO RAUL', '', 'AV. ESPAÑA 646', '', '', '2024-01-01', '2000-01-01'),
(312, 890, 'RIOS MARIA CRISTINA', '', 'PAT. ARGENTINA 365', '', '', '2024-01-01', '2000-01-01'),
(313, 891, 'GRACIA ELENO', '', 'AV. PERON 234', '', '', '2024-01-01', '2000-01-01'),
(314, 892, 'CARRIZO NANCY NOEMI', '', 'AV. PERON 234', '', '', '2024-01-01', '2000-01-01'),
(315, 893, 'PALACIO SANTIAGO', '', 'M. ARGENTINAS 653', '', '', '2024-01-01', '2000-01-01'),
(316, 894, 'BORDONE MARIA BELEN', '', '', '', '', '2024-01-01', '2000-01-01'),
(317, 895, 'COTELO RUBEN', '', 'AV. ESPAÑA 215', '', '', '2024-01-01', '2000-01-01'),
(318, 896, 'SOSA JUAN DAVID ', '', 'TTE. BOLZAN 187', '', '', '2024-01-01', '2000-01-01'),
(319, 901, 'MAYORDOMO ETEL ROSA', '', 'TTE. BOLZAN 127', '', '', '2024-01-01', '2000-01-01'),
(320, 902, 'PUEYO OMAR', '', 'TTE. BOLZAN 127', '', '', '2024-01-01', '2000-01-01'),
(321, 903, 'PUEYO TOMAS', '', 'AV. SARMIENTO 1880', '', '', '2024-01-01', '2000-01-01'),
(322, 905, 'UGHETTI EDGARDO', '', 'URQUIZA 1377', '', '', '2024-01-01', '2000-01-01'),
(323, 908, 'LASKENSTEIN JULIAN', '', 'PAT. ARGENTINA 365', '', '', '2024-01-01', '2000-01-01'),
(324, 909, 'ROSSI DINA', '', '', '', '', '2024-01-01', '2000-01-01'),
(325, 910, 'PERALTA ELBIO', '', 'TTE. GUADAGNINI', '', '', '2024-01-01', '2000-01-01'),
(326, 911, 'PINEDO MIRTA ', '', '', '', '', '2024-01-01', '2000-01-01'),
(327, 912, 'DURAN MANUELA', '', '', '', '', '2024-01-01', '2000-01-01'),
(328, 914, 'VAZQUEZ ELSA', '', '', '', '', '2024-01-01', '2000-01-01'),
(329, 915, 'ACOSTA MARCELINO', '', '', '', '', '2024-01-01', '2000-01-01'),
(330, 916, 'TASSONE IRMA', '', '', '', '', '2024-01-01', '2000-01-01'),
(331, 917, 'CHIRINO ELSA', '', '', '', '', '2024-01-01', '2000-01-01'),
(332, 918, 'GAVOTTI VICENTE', '', '', '', '', '2024-01-01', '2000-01-01'),
(333, 919, 'MACAGNO NICOLAS', '', '', '', '', '2024-01-01', '2000-01-01'),
(334, 920, 'VICENTE JUAN', '', '', '', '', '2024-01-01', '2000-01-01'),
(335, 922, 'VEGA ARDILES YAINEN', '', 'ROCA 37', '', '', '2024-01-01', '2000-01-01'),
(336, 923, 'SAYAGO SEBASTIAN', '', '', '', '', '2024-01-01', '2000-01-01'),
(337, 924, 'CORIA MARIO', '', '', '', '', '2024-01-01', '2000-01-01'),
(338, 925, 'ALBORNOZ VIRGINIA', '', '', '', '', '2024-01-01', '2000-01-01'),
(339, 926, 'CALDERA LAUREANO', '', '', '', '', '2024-01-01', '2000-01-01'),
(340, 927, 'FARIAS MIGUEL', '', '', '', '', '2024-01-01', '2000-01-01'),
(341, 928, 'CARRIZO YOLANDA', '', '', '', '', '2024-01-01', '2000-01-01'),
(342, 929, 'ILLESTA MONICA', '', '', '', '', '2024-01-01', '2000-01-01'),
(343, 930, 'CALDERA DURANTE MARIO RAMIRO', '', '', '', '', '2024-01-01', '2000-01-01'),
(344, 931, 'BENITEZ EVANGELINA', '', 'J. M. ESTRADA 765', '', '', '2024-01-01', '2000-01-01'),
(345, 932, 'PEDEHONTA CARLOS', '', 'PJE. IRIBARNE', '', '', '2024-01-01', '2000-01-01'),
(346, 933, 'TRECCO RICARDO MIGUEL', '', '', '', '', '2024-01-01', '2000-01-01'),
(347, 934, 'OLIVERA REBICHINI CATALINA', '', '', '', '', '2024-01-01', '2000-01-01'),
(348, 935, 'FERNANDEZ MARIA SILVINA', '', '', '', '', '2024-01-01', '2000-01-01'),
(349, 936, 'IUSTINA NICOLAS', '', '', '', '', '2024-01-01', '2000-01-01'),
(350, 937, 'STEIB KEVIN A.', '', '', '', '', '2024-01-01', '2000-01-01'),
(351, 938, 'MUÑOZ DAVID', '', '', '', '', '2024-01-01', '2000-01-01'),
(352, 939, 'ALBORNOZ SUSANA', '', 'M. BELGRANO 669', '', '', '2024-01-01', '2000-01-01'),
(353, 942, 'SANCHEZ FRANCO', '', '', '', '', '2024-01-01', '2000-01-01'),
(354, 943, 'GUITIERREZ JORGE', '', '', '', '', '2024-01-01', '2000-01-01'),
(355, 945, 'GALLO IRMA ADELINA', '', 'M. ARGENTINAS 406', '', '', '2024-01-01', '2000-01-01'),
(356, 946, 'ROJAS MIGUEL ANGEL', '', 'RIVADAVIA 1526 ', '', '', '2024-01-01', '2000-01-01'),
(357, 947, 'ALVAREZ JOSE EFRAIN', '', 'AV. PERON 556', '', '', '2024-01-01', '2000-01-01'),
(358, 948, 'QUINTEROS JUSTO', '', '', '', '', '2024-01-01', '2000-01-01'),
(359, 949, 'BELTRAN LUIS', '', '', '', '', '2024-01-01', '2000-01-01'),
(360, 950, 'FUENTE ELSA  MABEL', '', '', '', '', '2024-01-01', '2000-01-01'),
(361, 951, 'CHIRINO ALDO', '', '', '', '', '2024-01-01', '2000-01-01'),
(368, 2005, 'Dorrego Manuel', '22333666', '9 y 16', '2565887744', 'manuel@ejemplo.com', '2000-01-01', '2000-01-01'),
(369, 2006, 'Rosas Manuel', '33255255', 'direccion', '02323568989', 'ejemplo@ejemplo.com', '2000-01-01', '2000-01-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `ID_Rol` int(11) NOT NULL,
  `nombreRol` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`ID_Rol`, `nombreRol`) VALUES
(1, 'Administrador'),
(2, 'Invitado'),
(3, 'Cobrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_cuota`
--

CREATE TABLE `tipo_cuota` (
  `ID_TipoCuota` int(11) NOT NULL,
  `nombreTipoCuota` varchar(20) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_cuota`
--

INSERT INTO `tipo_cuota` (`ID_TipoCuota`, `nombreTipoCuota`, `cantidad`) VALUES
(1, 'socio', 12),
(2, 'rifa', 10),
(3, 'deportiva', 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `ID_Usuario` int(11) NOT NULL,
  `nombreUsuario` varchar(30) NOT NULL,
  `contraseña` varchar(20) NOT NULL,
  `ID_Rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`ID_Usuario`, `nombreUsuario`, `contraseña`, `ID_Rol`) VALUES
(1, 'juan', 'admin123', 1),
(2, 'maria', 'admin123', 2),
(3, 'pedro', 'admin123', 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cuota`
--
ALTER TABLE `cuota`
  ADD PRIMARY KEY (`ID_Cuota`),
  ADD KEY `fk_idTipoCuota` (`ID_TipoCuota`);

--
-- Indices de la tabla `cuotaxpersona`
--
ALTER TABLE `cuotaxpersona`
  ADD PRIMARY KEY (`ID_CuotaXpersona`),
  ADD KEY `fk_idpersona` (`ID_Persona`),
  ADD KEY `fk_idcuota` (`ID_Cuota`);

--
-- Indices de la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  ADD PRIMARY KEY (`ID_MetodoPago`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`ID_Pago`),
  ADD KEY `ID_Cuota` (`ID_Cuota`),
  ADD KEY `ID_Usuario` (`ID_Usuario`),
  ADD KEY `ID_MetodoPago` (`ID_MetodoPago`),
  ADD KEY `FK_PERSONA` (`ID_Persona`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`ID_Persona`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`ID_Rol`);

--
-- Indices de la tabla `tipo_cuota`
--
ALTER TABLE `tipo_cuota`
  ADD PRIMARY KEY (`ID_TipoCuota`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID_Usuario`),
  ADD KEY `id_rol` (`ID_Rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cuota`
--
ALTER TABLE `cuota`
  MODIFY `ID_Cuota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `cuotaxpersona`
--
ALTER TABLE `cuotaxpersona`
  MODIFY `ID_CuotaXpersona` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  MODIFY `ID_MetodoPago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `ID_Pago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `ID_Persona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=370;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `ID_Rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipo_cuota`
--
ALTER TABLE `tipo_cuota`
  MODIFY `ID_TipoCuota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID_Usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cuota`
--
ALTER TABLE `cuota`
  ADD CONSTRAINT `FK_TIPO_CUOTA` FOREIGN KEY (`ID_TipoCuota`) REFERENCES `tipo_cuota` (`ID_TipoCuota`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_idTipoCuota` FOREIGN KEY (`ID_TipoCuota`) REFERENCES `tipo_cuota` (`ID_TipoCuota`) ON DELETE CASCADE;

--
-- Filtros para la tabla `cuotaxpersona`
--
ALTER TABLE `cuotaxpersona`
  ADD CONSTRAINT `fk_idcuota` FOREIGN KEY (`ID_Cuota`) REFERENCES `cuota` (`ID_Cuota`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_idpersona` FOREIGN KEY (`ID_Persona`) REFERENCES `personas` (`ID_Persona`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `FK_CUOTA` FOREIGN KEY (`ID_Cuota`) REFERENCES `cuota` (`ID_Cuota`),
  ADD CONSTRAINT `FK_METODOPAGO` FOREIGN KEY (`ID_MetodoPago`) REFERENCES `metodo_pago` (`ID_MetodoPago`),
  ADD CONSTRAINT `FK_PERSONA` FOREIGN KEY (`ID_Persona`) REFERENCES `personas` (`ID_Persona`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_USUARIO` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`),
  ADD CONSTRAINT `ID_Cuota` FOREIGN KEY (`ID_Cuota`) REFERENCES `cuota` (`ID_Cuota`) ON DELETE CASCADE,
  ADD CONSTRAINT `ID_MetodoPago` FOREIGN KEY (`ID_MetodoPago`) REFERENCES `metodo_pago` (`ID_MetodoPago`) ON DELETE CASCADE,
  ADD CONSTRAINT `ID_Persona` FOREIGN KEY (`ID_Persona`) REFERENCES `personas` (`ID_Persona`) ON DELETE CASCADE,
  ADD CONSTRAINT `ID_Usuario` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_ID_Persona` FOREIGN KEY (`ID_Persona`) REFERENCES `personas` (`ID_Persona`) ON DELETE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `FK_ID_ROL` FOREIGN KEY (`ID_Rol`) REFERENCES `rol` (`ID_Rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- --------------------------------------------------------
-- Host:                         192.168.3.26
-- Versión del servidor:         10.3.15-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para daw2_gamifikg6
CREATE DATABASE IF NOT EXISTS `daw2_gamifikg6` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `daw2_gamifikg6`;

-- Volcando estructura para tabla daw2_gamifikg6.alumnos
CREATE TABLE IF NOT EXISTS `alumnos` (
  `usuario` varchar(50) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `email` varchar(40) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `idUsuario` int(100) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla daw2_gamifikg6.alumnos: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` (`usuario`, `contrasena`, `email`, `nombre`, `apellido`, `idUsuario`) VALUES
	('user', '$2y$10$hhSoUFf7wNfG9Gp.lBOPlOJPQjsVT8GC4Bo6iacWx2yWBh4R3BBN.', 'user@user.com', 'usuario', 'user', 37),
	('usuario', '$2y$10$yKY/vQ6.tE9WnDXPB6nly.uFYLZCLcIqoOvI88NcRXOECRKCmoVSC', 'usuario@user.om', 'user', 'user', 38),
	('alex', '$2y$10$3.7.joYbCsBo9Mpo6KPpMepfimHPxUpWHZwf7oNkrtl90dwa3MGWW', 'alex@gmail.com', 'alex', 'garcia', 39),
	('sergib24', '$2y$10$dHwrcJkxTIvuSiCIKylwweA6KxhVl/9gM9uQTTYe1vwhL8y1Ml4.e', 'sergi@gmail.com', 'sergi', 'bertra', 40);
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;

-- Volcando estructura para tabla daw2_gamifikg6.equiposranking
CREATE TABLE IF NOT EXISTS `equiposranking` (
  `idUsuario` int(11) NOT NULL,
  `idRanking` int(11) NOT NULL,
  `idPuntuacion` int(11) NOT NULL AUTO_INCREMENT,
  `nombreEquipo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idPuntuacion`),
  KEY `rankings_copy` (`idRanking`),
  KEY `usuariosranking_FK_copy` (`idUsuario`),
  CONSTRAINT `rankings_copy` FOREIGN KEY (`idRanking`) REFERENCES `rankings` (`id_ranking`),
  CONSTRAINT `usuariosranking_FK_copy` FOREIGN KEY (`idUsuario`) REFERENCES `alumnos` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla daw2_gamifikg6.equiposranking: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `equiposranking` DISABLE KEYS */;
INSERT INTO `equiposranking` (`idUsuario`, `idRanking`, `idPuntuacion`, `nombreEquipo`) VALUES
	(37, 860593, 1, 'Juanetes'),
	(40, 860593, 4, 'Los Pablo ðŸ˜ŽðŸ‘Œ');
/*!40000 ALTER TABLE `equiposranking` ENABLE KEYS */;

-- Volcando estructura para tabla daw2_gamifikg6.profesores
CREATE TABLE IF NOT EXISTS `profesores` (
  `usuario` varchar(50) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `centro` varchar(30) NOT NULL,
  `idUsuario` int(100) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla daw2_gamifikg6.profesores: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `profesores` DISABLE KEYS */;
INSERT INTO `profesores` (`usuario`, `contrasena`, `email`, `nombre`, `apellido`, `centro`, `idUsuario`) VALUES
	('alex', '$2y$10$Hw0UJed6DgQPiifQICL1duRCgaZj3nl8QuEb1syIDXq78st3PNf4y', 'alex@gmail.com', 'Alejandro', 'Alex', 'Ilerna', 19),
	('admin', '$2y$10$lhununim0iNiDbJywQZzS.jFbCastmibtbUqju747rtk1XmfSwXQu', 'admin@admin.com', 'admin', 'admin', 'Caparrella', 20),
	('hitler', '$2y$10$rvQ042wzuiPa3AIgbkr2duMRkQb6rfl9.1yjBTr0HOzRDoG8SpNKm', 'hitler@gmail.com', 'hitler', 'hitler', 'Caparrella', 21);
/*!40000 ALTER TABLE `profesores` ENABLE KEYS */;

-- Volcando estructura para tabla daw2_gamifikg6.rankings
CREATE TABLE IF NOT EXISTS `rankings` (
  `id_ranking` int(11) NOT NULL,
  `nombre_ranking` varchar(100) NOT NULL,
  `administrador` int(11) NOT NULL,
  `equipos` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_ranking`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla daw2_gamifikg6.rankings: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `rankings` DISABLE KEYS */;
INSERT INTO `rankings` (`id_ranking`, `nombre_ranking`, `administrador`, `equipos`) VALUES
	(860593, 'prueba ranking', 20, 0);
/*!40000 ALTER TABLE `rankings` ENABLE KEYS */;

-- Volcando estructura para tabla daw2_gamifikg6.usuariosranking
CREATE TABLE IF NOT EXISTS `usuariosranking` (
  `idUsuario` int(11) NOT NULL,
  `idRanking` int(11) NOT NULL,
  `puntuacion` int(11) DEFAULT NULL,
  `idPuntuacion` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idPuntuacion`),
  KEY `rankings` (`idRanking`),
  KEY `usuariosranking_FK` (`idUsuario`),
  CONSTRAINT `rankings` FOREIGN KEY (`idRanking`) REFERENCES `rankings` (`id_ranking`),
  CONSTRAINT `usuariosranking_FK` FOREIGN KEY (`idUsuario`) REFERENCES `alumnos` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- Volcando datos para la tabla daw2_gamifikg6.usuariosranking: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `usuariosranking` DISABLE KEYS */;
INSERT INTO `usuariosranking` (`idUsuario`, `idRanking`, `puntuacion`, `idPuntuacion`) VALUES
	(37, 860593, 100, 11),
	(40, 860593, 992, 15);
/*!40000 ALTER TABLE `usuariosranking` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

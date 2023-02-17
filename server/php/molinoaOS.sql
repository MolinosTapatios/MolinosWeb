-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: molinos
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actividad`
--

DROP TABLE IF EXISTS `actividad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actividad` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividad`
--

LOCK TABLES `actividad` WRITE;
/*!40000 ALTER TABLE `actividad` DISABLE KEYS */;
/*!40000 ALTER TABLE `actividad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carritos`
--

DROP TABLE IF EXISTS `carritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carritos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total` varchar(45) NOT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `carritos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritos`
--

LOCK TABLES `carritos` WRITE;
/*!40000 ALTER TABLE `carritos` DISABLE KEYS */;
/*!40000 ALTER TABLE `carritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carritos_has_productos`
--

DROP TABLE IF EXISTS `carritos_has_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carritos_has_productos` (
  `Carritos_id` int NOT NULL,
  `Productos_id` int NOT NULL,
  PRIMARY KEY (`Carritos_id`,`Productos_id`),
  KEY `Productos_id` (`Productos_id`),
  CONSTRAINT `carritos_has_productos_ibfk_1` FOREIGN KEY (`Carritos_id`) REFERENCES `carritos` (`id`),
  CONSTRAINT `carritos_has_productos_ibfk_2` FOREIGN KEY (`Productos_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritos_has_productos`
--

LOCK TABLES `carritos_has_productos` WRITE;
/*!40000 ALTER TABLE `carritos_has_productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `carritos_has_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `caracteristicas` varchar(255) NOT NULL,
  `precio` double NOT NULL,
  `stock` int NOT NULL,
  `status` bit(1) NOT NULL,
  `Tipo_Producto_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Tipo_Producto_id` (`Tipo_Producto_id`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`Tipo_Producto_id`) REFERENCES `tipo_productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'R-14','Molino eléctrico de uso doméstico utilizado para molienda de nixtamal, elote tierno, granos, chile, cacao, café, queso, etc., con una capacidad de 5 a 15 kg/hr aprox según el producto.','Discos de 3″\nTransmisión de engrane y sinfín\nMotor de 1/3 hp monofásico a 110 volts\nCon aceite para transmisión SN/250',3000,4,_binary '',1),(2,'Poleas Cubierto','Molino eléctrico de uso doméstico con protección en la transmisión de bandas y poleas, utilizado para molienda de nixtamal, elote tierno, granos, chile, cacao, café, queso, etc., con una capacidad de 5 a 15 kg/hr aprox según el producto.','Discos de 3″\nTransmisión de poleas\nMotor de 1/3 hp monofásico a 110 volts\nBandas A15\nReja de fierro vaciado',3000,12,_binary '',1),(3,'Poleas Descubierto','Molino eléctrico de uso doméstico utilizado para molienda de nixtamal, elote tierno, granos, chile, cacao, café, queso, etc., con una capacidad de 5 a 15 kg/hr aprox según el producto.','Discos de 3″\nTransmisión de poleas y banda\nMotor de 1/3 hp monofásico a 110 volts',3000,3,_binary '',1),(4,'Sara 4','Molino eléctrico de uso semi doméstico utilizado para molienda de nixtamal, elote tierno, granos, chile, cacao, café, queso, etc., con una capacidad de 10 a 20 kg/hr aprox. según el producto.','Discos de 4″\nTransmisión de banda y polea\nFabricado en acero\nMotor de 1/2 hp monofásico a 110 volts',4000,4,_binary '',1),(5,'Elote tierno','Molino eléctrico para pequeñas industrias, utilizado para molienda de nixtamal, elote tierno, granos, chile, cacao, café, queso, etc., con una capacidad de 10 a 30 kg/hr aprox. según sea el producto.','Discos de 6″\nTransmisión de banda y polea\nFabricado en acero\nMotor de 1 hp monofásico a 110 volts\nCentro de carga con pastilla',6000,3,_binary '',1);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_productos`
--

DROP TABLE IF EXISTS `tipo_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_productos` (
  `id` int NOT NULL,
  `nombre_tipo` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_productos`
--

LOCK TABLES `tipo_productos` WRITE;
/*!40000 ALTER TABLE `tipo_productos` DISABLE KEYS */;
INSERT INTO `tipo_productos` VALUES (1,'Molinos'),(2,'Tortilladora'),(3,'Mezcladora');
/*!40000 ALTER TABLE `tipo_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipousuarios`
--

DROP TABLE IF EXISTS `tipousuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipousuarios` (
  `id` int NOT NULL,
  `nombre_tipo` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipousuarios`
--

LOCK TABLES `tipousuarios` WRITE;
/*!40000 ALTER TABLE `tipousuarios` DISABLE KEYS */;
INSERT INTO `tipousuarios` VALUES (1,'Administrador'),(2,'Usuario');
/*!40000 ALTER TABLE `tipousuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_has_actividad`
--

DROP TABLE IF EXISTS `usuario_has_actividad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_has_actividad` (
  `usuario_id` int NOT NULL,
  `Actividad_id` int NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`usuario_id`,`Actividad_id`),
  KEY `Actividad_id` (`Actividad_id`),
  CONSTRAINT `usuario_has_actividad_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `usuario_has_actividad_ibfk_2` FOREIGN KEY (`Actividad_id`) REFERENCES `actividad` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_has_actividad`
--

LOCK TABLES `usuario_has_actividad` WRITE;
/*!40000 ALTER TABLE `usuario_has_actividad` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario_has_actividad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apaterno` varchar(30) DEFAULT NULL,
  `amaterno` varchar(30) DEFAULT NULL,
  `fechaNac` date NOT NULL,
  `mail` varchar(50) NOT NULL,
  `estatus` bit(1) NOT NULL,
  `tipo_usuario_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tipo_usuario_id` (`tipo_usuario_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`tipo_usuario_id`) REFERENCES `tipousuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'root','d6ca3fd0c3a3b462ff2b83436dda495e','Silvino','Aguiar',NULL,'2002-01-01','2121100431@soy.utj.edu.mx',_binary '',1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-16 18:31:51

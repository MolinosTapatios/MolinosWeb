-- -----------------------------------------------------
-- Schema molinos
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `molinos` DEFAULT CHARACTER SET utf8mb4 ;
USE `molinos` ;

-- -----------------------------------------------------
-- Table `molinos`.`tipousuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`tipousuarios` (
  `id` INT AUTO_INCREMENT,
  `nombre_tipo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
DEFAULT CHARACTER SET = utf8mb4;

insert into tipousuarios values
	(null,"Administrador"),
	(null,"Usuario");

-- -----------------------------------------------------
-- Table `molinos`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(30) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `nombre` VARCHAR(30) NOT NULL,
  `apaterno` VARCHAR(30) NULL DEFAULT NULL,
  `amaterno` VARCHAR(30) NULL DEFAULT NULL,
  `fechaNac` DATE NOT NULL,
  `mail` VARCHAR(100) NOT NULL,
  `estatus` BIT NOT NULL,
  `tipo_usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
    FOREIGN KEY (`tipo_usuario_id`)
    REFERENCES `molinos`.`tipousuarios` (`id`))
DEFAULT CHARACTER SET = utf8mb4;

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'root','d6ca3fd0c3a3b462ff2b83436dda495e','Silvino','Aguiar',NULL,'2002-01-01','2121100431@soy.utj.edu.mx',1,1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

-- -----------------------------------------------------
-- Table `molinos`.`carritos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`carritos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `total` DOUBLE NOT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
    FOREIGN KEY (`usuario_id`)
    REFERENCES `molinos`.`usuarios` (`id`))
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `molinos`.`tipo_productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`tipo_productos` (
  `id` INT(11) NOT NULL,
  `nombre_tipo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
DEFAULT CHARACTER SET = utf8mb4;

LOCK TABLES `tipo_productos` WRITE;
/*!40000 ALTER TABLE `tipo_productos` DISABLE KEYS */;
INSERT INTO `tipo_productos` VALUES (1,'Molinos'),(2,'Tortilladora'),(3,'Mezcladora');
/*!40000 ALTER TABLE `tipo_productos` ENABLE KEYS */;
UNLOCK TABLES;
-- -----------------------------------------------------
-- Table `molinos`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  `caracteristicas` VARCHAR(255) NOT NULL,
  `precio` DOUBLE NOT NULL,
  `stock` INT NOT NULL,
  `status` BIT NOT NULL,
  `Tipo_Producto_id` INT NOT NULL,
  `as` BIT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
    FOREIGN KEY (`Tipo_Producto_id`)
    REFERENCES `molinos`.`tipo_productos` (`id`))
DEFAULT CHARACTER SET = utf8mb4;

-- -------------------------------------------------------------
-- Trigger para cada ves que se elimine(actualice) un producto 
-- -------------------------------------------------------------
# Triggers
Delimiter |
create trigger eliminarImagenes before update on productos
for each row
begin
	update imagenes set `as` = 0 where productos_id = (new.id); 
end |


INSERT INTO `productos` VALUES (1,'R-14','Molino eléctrico de uso doméstico utilizado para molienda de nixtamal, elote tierno, granos, chile, cacao, café, queso, etc., con una capacidad de 5 a 15 kg/hr aprox según el producto.','Discos de 3″\nTransmisión de engrane y sinfín\nMotor de 1/3 hp monofásico a 110 volts\nCon aceite para transmisión SN/250',3000,4,_binary '',1),(2,'Poleas Cubierto','Molino eléctrico de uso doméstico con protección en la transmisión de bandas y poleas, utilizado para molienda de nixtamal, elote tierno, granos, chile, cacao, café, queso, etc., con una capacidad de 5 a 15 kg/hr aprox según el producto.','Discos de 3″\nTransmisión de poleas\nMotor de 1/3 hp monofásico a 110 volts\nBandas A15\nReja de fierro vaciado',3000,12,_binary '',1),(3,'Poleas Descubierto','Molino eléctrico de uso doméstico utilizado para molienda de nixtamal, elote tierno, granos, chile, cacao, café, queso, etc., con una capacidad de 5 a 15 kg/hr aprox según el producto.','Discos de 3″\nTransmisión de poleas y banda\nMotor de 1/3 hp monofásico a 110 volts',3000,3,_binary '',1),(4,'Sara 4','Molino eléctrico de uso semi doméstico utilizado para molienda de nixtamal, elote tierno, granos, chile, cacao, café, queso, etc., con una capacidad de 10 a 20 kg/hr aprox. según el producto.','Discos de 4″\nTransmisión de banda y polea\nFabricado en acero\nMotor de 1/2 hp monofásico a 110 volts',4000,4,_binary '',1),(5,'Elote tierno','Molino eléctrico para pequeñas industrias, utilizado para molienda de nixtamal, elote tierno, granos, chile, cacao, café, queso, etc., con una capacidad de 10 a 30 kg/hr aprox. según sea el producto.','Discos de 6″\nTransmisión de banda y polea\nFabricado en acero\nMotor de 1 hp monofásico a 110 volts\nCentro de carga con pastilla',6000,3,_binary '',1);

-- -----------------------------------------------------
-- Table `molinos`.`carritos_has_productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`carritos_has_productos` (
  `Carritos_id` INT NOT NULL,
  `Productos_id` INT NOT NULL,
  PRIMARY KEY (`Carritos_id`, `Productos_id`),
    FOREIGN KEY (`Carritos_id`)
    REFERENCES `molinos`.`carritos` (`id`),
    FOREIGN KEY (`Productos_id`)
    REFERENCES `molinos`.`productos` (`id`))
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `molinos`.`imagenes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`imagenes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `productos_id` INT NOT NULL,
  `path` VARCHAR(255) NOT NULL,
  `as` BIT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`,`productos_id`),
    FOREIGN KEY (`productos_id`)
    REFERENCES `molinos`.`productos` (`id`))
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `molinos`.`actividad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`actividad` (
  `id` INT NOT NULL,
  `fecha` DATETIME NOT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `molinos`.`usuarios_has_actividad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`usuarios_has_actividad` (
  `usuarios_id` INT NOT NULL,
  `actividad_id` INT NOT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`usuarios_id`, `actividad_id`),
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `molinos`.`usuarios` (`id`),
    FOREIGN KEY (`actividad_id`)
    REFERENCES `molinos`.`actividad` (`id`))
DEFAULT CHARACTER SET = utf8mb4;
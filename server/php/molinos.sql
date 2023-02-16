-- -----------------------------------------------------
-- Schema molinos
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `molinos` DEFAULT CHARACTER SET utf8mb4 ;
USE `molinos` ;

-- -----------------------------------------------------
-- Table `molinos`.`actividad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`actividad` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `fecha` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `molinos`.`tipousuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`tipousuarios` (
  `id` INT(11) NOT NULL,
  `nombre_tipo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `molinos`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`usuarios` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(30) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `nombre` VARCHAR(30) NOT NULL,
  `apaterno` VARCHAR(30) NULL DEFAULT NULL,
  `amaterno` VARCHAR(30) NULL DEFAULT NULL,
  `fechaNac` DATE NOT NULL,
  `mail` VARCHAR(50) NOT NULL,
  `estatus` BIT(1) NOT NULL,
  `tipo_usuario_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
    FOREIGN KEY (`tipo_usuario_id`)
    REFERENCES `molinos`.`tipousuarios` (`id`));


-- -----------------------------------------------------
-- Table `molinos`.`carritos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`carritos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `total` VARCHAR(45) NOT NULL,
  `usuario_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
    FOREIGN KEY (`usuario_id`)
    REFERENCES `molinos`.`usuarios` (`id`));


-- -----------------------------------------------------
-- Table `molinos`.`tipo_productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`tipo_productos` (
  `id` INT(11) NOT NULL,
  `nombre_tipo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `molinos`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`productos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  `precio` DOUBLE NOT NULL,
  `stock` INT(11) NOT NULL,
  `status` BIT(1) NOT NULL,
  `Tipo_Producto_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
    FOREIGN KEY (`Tipo_Producto_id`)
    REFERENCES `molinos`.`tipo_productos` (`id`));


-- -----------------------------------------------------
-- Table `molinos`.`carritos_has_productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`carritos_has_productos` (
  `Carritos_id` INT(11) NOT NULL,
  `Productos_id` INT(11) NOT NULL,
  PRIMARY KEY (`Carritos_id`, `Productos_id`),
    FOREIGN KEY (`Carritos_id`)
    REFERENCES `molinos`.`carritos` (`id`),
    FOREIGN KEY (`Productos_id`)
    REFERENCES `molinos`.`productos` (`id`));


-- -----------------------------------------------------
-- Table `molinos`.`usuario_has_actividad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`usuario_has_actividad` (
  `usuario_id` INT(11) NOT NULL,
  `Actividad_id` INT(11) NOT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`usuario_id`, `Actividad_id`),
    FOREIGN KEY (`usuario_id`)
    REFERENCES `molinos`.`usuarios` (`id`),
    FOREIGN KEY (`Actividad_id`)
    REFERENCES `molinos`.`actividad` (`id`));
    
insert into tipousuarios values
	(1,"Administrador"),
	(2,"Usuario");

insert into usuarios values
	(1,"root","d6ca3fd0c3a3b462ff2b83436dda495e","Silvino","Aguiar",null,"2002-01-01","2121100431@soy.utj.edu.mx",1,1);
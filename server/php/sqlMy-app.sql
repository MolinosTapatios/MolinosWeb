-- -----------------------------------------------------
-- Schema my_app
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `my_app` DEFAULT CHARACTER SET utf8mb4 ;
USE `my_app` ;

-- -----------------------------------------------------
-- Table `my_app`.`TipoUsuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_app`.`TipoUsuarios` (
  `id` INT NOT NULL,
  `nombre_tipo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

-- -----------------------------------------------------
-- Table `my_app`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_app`.`usuarios` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user` VARCHAR(30) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `nombre` VARCHAR(30) NOT NULL,
  `apaterno` VARCHAR(30) NOT NULL,
  `amaterno` VARCHAR(30) NOT NULL,
  `fechaNac` DATE NOT NULL,
  `mail` VARCHAR(50) NOT NULL,
  `estatus` BINARY(1) NOT NULL,
  `TipoUsuarios_id` INT NOT NULL,
  PRIMARY KEY (`id`),
    FOREIGN KEY (`TipoUsuarios_id`)
    REFERENCES `my_app`.`TipoUsuarios` (`id`));


-- -----------------------------------------------------
-- Table `my_app`.`Carritos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_app`.`Carritos` (
  `id` INT NOT NULL,
  `total` VARCHAR(45) NOT NULL,
  `usuario_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
    FOREIGN KEY (`usuario_id`)
    REFERENCES `my_app`.`usuarios` (`id`));


-- -----------------------------------------------------
-- Table `my_app`.`Tipo_Productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_app`.`Tipo_Productos` (
  `id` INT NOT NULL,
  `nombre_tipo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `my_app`.`Productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_app`.`Productos` (
  `id` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  `precio` DOUBLE NOT NULL,
  `Tipo_Producto_id` INT NOT NULL,
  PRIMARY KEY (`id`),
    FOREIGN KEY (`Tipo_Producto_id`)
    REFERENCES `my_app`.`Tipo_Productos` (`id`));


-- -----------------------------------------------------
-- Table `my_app`.`Actividad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_app`.`Actividad` (
  `id` INT NOT NULL,
  `fecha` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `my_app`.`usuario_has_Actividad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_app`.`usuario_has_Actividad` (
  `usuario_id` INT(11) NOT NULL,
  `Actividad_id` INT NOT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`usuario_id`, `Actividad_id`),
    FOREIGN KEY (`usuario_id`)
    REFERENCES `my_app`.`usuarios` (`id`),
    FOREIGN KEY (`Actividad_id`)
    REFERENCES `my_app`.`Actividad` (`id`));


-- -----------------------------------------------------
-- Table `my_app`.`Carritos_has_Productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_app`.`Carritos_has_Productos` (
  `Carritos_id` INT NOT NULL,
  `Productos_id` INT NOT NULL,
  PRIMARY KEY (`Carritos_id`, `Productos_id`),
    FOREIGN KEY (`Carritos_id`)
    REFERENCES `my_app`.`Carritos` (`id`),
    FOREIGN KEY (`Productos_id`)
    REFERENCES `my_app`.`Productos` (`id`));

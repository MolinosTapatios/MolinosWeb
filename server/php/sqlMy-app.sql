-- -----------------------------------------------------
-- Schema molinos
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `molinos` DEFAULT CHARACTER SET utf8mb4 ;
USE `molino` ;

-- -----------------------------------------------------
-- Table `molinos`.`TipoUsuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`TipoUsuarios` (
  `id` INT NOT NULL,
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
  `apaterno` VARCHAR(30),
  `amaterno` VARCHAR(30),
  `fechaNac` DATE NOT NULL,
  `mail` VARCHAR(50) NOT NULL,
  `estatus` BINARY(1) NOT NULL,
  `tipo_usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`tipo_usuario_id`) REFERENCES `molinos`.`tipousuarios` (`id`));


-- -----------------------------------------------------
-- Table `molinos`.`Carritos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`Carritos` (
  `id` INT NOT NULL,
  `total` VARCHAR(45) NOT NULL,
  `usuario_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`usuario_id`) REFERENCES `molinos`.`usuarios` (`id`));


-- -----------------------------------------------------
-- Table `molinos`.`Tipo_Productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`Tipo_Productos` (
  `id` INT NOT NULL,
  `nombre_tipo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `molinos`.`Productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`Productos` (
  `id` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  `precio` DOUBLE NOT NULL,
  `Tipo_Producto_id` INT NOT NULL,
  PRIMARY KEY (`id`),
    FOREIGN KEY (`Tipo_Producto_id`)
    REFERENCES `molinos`.`Tipo_Productos` (`id`));


-- -----------------------------------------------------
-- Table `molinos`.`Actividad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`Actividad` (
  `id` INT NOT NULL,
  `fecha` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `molinos`.`usuario_has_Actividad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`usuario_has_Actividad` (
  `usuario_id` INT(11) NOT NULL,
  `Actividad_id` INT NOT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`usuario_id`, `Actividad_id`),
    FOREIGN KEY (`usuario_id`)
    REFERENCES `molinos`.`usuarios` (`id`),
    FOREIGN KEY (`Actividad_id`)
    REFERENCES `molinos`.`Actividad` (`id`));


-- -----------------------------------------------------
-- Table `molinos`.`Carritos_has_Productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `molinos`.`Carritos_has_Productos` (
  `Carritos_id` INT NOT NULL,
  `Productos_id` INT NOT NULL,
  PRIMARY KEY (`Carritos_id`, `Productos_id`),
    FOREIGN KEY (`Carritos_id`)
    REFERENCES `molinos`.`Carritos` (`id`),
    FOREIGN KEY (`Productos_id`)
    REFERENCES `molinos`.`Productos` (`id`));

insert into tipousuarios values
(1,"Administrador"),
(2,"Usuario");

insert into usuarios values
(1,"root","d6ca3fd0c3a3b462ff2b83436dda495e","Silvino","Aguiar",null,"2002-01-01","2121100431@soy.utj.edu.mx",1,1);
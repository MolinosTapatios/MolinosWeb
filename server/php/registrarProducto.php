<?php
include("config.php");
session_start();

$conex = conexionPDO();
$nombre = $input["nombre"];
$precio = $input["precio"];
$stock = $input["stock"];
$decripcion = $input["descripcion"];
$tipo = $input["tipo"];
$status = $input["status"];


try {
    $sql = $conex->prepare("INSERT INTO  productos values (null,?,?,?,?,?,?)");
    $json =["flag" => $sql->execute([$nombre,$decripcion,$precio,$stock,$status,$tipo])];
    $json += ["msg" => "Registro Exitoso"];
    echo json_encode($json);
} catch (PDOException $th) {
    $json = ["flag" => false];
    $json += ["msg" => $th];
    echo json_encode($json);
}

?>
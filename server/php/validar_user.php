<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header("Content-type: application/json; charset=utf-8");
$input = json_decode(file_get_contents("php://input"), true);
session_start();
require "./conexion.php";


$conex = conexionMSQLI();
$usuario = $input["user"];
$password = $input["password"];

$sql = "SELECT * from usuarios where username = \"$usuario\"";
$result = mysqli_query($conex, $sql);
$json = Array();

if (mysqli_num_rows($result)) {
    if ($row = mysqli_fetch_array($result)) {
        if(md5($password) == $row["password"]){
            $_SESSION["id"] = $row["id"];
            $_SESSION["user_active"] = true;
            $_SESSION["user"] = $row["username"];
            $_SESSION["password"] = $row["password"];
            $json["flag"] = true;
            $json["msg"] = "Verificacion Exitosa ".md5($password);
            // echo json_encode("1");
        }else{
            $json["flag"] = false;
            $json["msg"] = "Contraseña incorrecta";
            // echo json_encode("Contraseña incorrecta");
        }
    }
} else {
    $json["flag"] = false;
    $json["msg"] = "Usuario no encontrado";
    // echo json_encode("Usuario no encontrado");
}
echo json_encode($json);
?>
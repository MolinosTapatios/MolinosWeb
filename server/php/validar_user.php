<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
session_start();

require "./conexion.php";

$conex = conexionMSQLI();
$usuario = $_POST['user'];
// $password = $_POST["password"];
$sql = "SELECT * from usuario where username = \"$usuario\"";
$result = mysqli_query($conex, $sql);
// echo $sql." ";
if (mysqli_num_rows($result)) {
    while ($row = mysqli_fetch_array($result)) {
        $_SESSION["id"] = $row["id"];
        $_SESSION["user_active"] = true;
        $_SESSION["user"] = $row["username"];
        $_SESSION["password"] = $row["password"];
        echo json_encode("1");
    }
} else {
    echo json_encode("0");
}
echo json_encode($sql);
?>
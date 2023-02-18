<?php
include("./config.php");

$conn = conexionMSQLI();
$id = $input["id"];
$nombre = $input["nombre"];
$precio = $input["precio"];
$stock = $input["stock"];
$decripcion = $input["descripcion"];
$caracteristicas = $input["caracteristicas"];
$tipo = $input["tipo"];
$status = $input["status"];

try {
    $sql = "UPDATE productos set nombre = '$nombre', precio = $precio,   where id = $id";
    $resp = $conn->query($sql);

    if(mysqli_errno($conn)){
        $json["msg"] = mysqli_errno($conn) . ": " . mysqli_error($conn);
    }else{
        $json["msg"] = "Registro actualizado correctamente";
    }
} catch (\Throwable $th) {
    //throw $th;
    $json["msg"] = "Error ".$th;
}
echo json_encode($json);
?>
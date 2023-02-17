<?php
include("./config.php");

$conn = conexionMSQLI();
$id = $input["id"];

try {
    //code...   
    $sql = "DELETE from productos where id = $id";
    $conn->query($sql);
    
    if(mysqli_errno($conn)){
        $json['msg'] = mysqli_errno($conn)." : ".mysqli_error($conn);
    }else{
        $json['msg'] = "Registro eliminado correctamente";
    }
} catch (\Throwable $th) {
    //throw $th;
    $json['msg'] = "Error al eliminar ".$th;
}

echo json_encode($json);
?>
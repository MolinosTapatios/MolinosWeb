<?php
include("config.php");

if (isset($_FILES["imagen"])) {
    $file = $_FILES["imagen"];
    $nombre = $file["name"];
    $tipo = $file["type"];
    $ruta_provisional = $file["tmp_name"];
    $size = $file["size"];
    $dimensiones = getimagesize($ruta_provisional);
    $whitd = $dimensiones[0];
    $heigt = $dimensiones[1];
    $carpeta = "img/";
    echo $tipo;
    if ($tipo != 'image/jpeg') {
        echo "Error el archivo no es imagen";
    } else if ($size > 3 * 1024 * 1024) {
        echo "El tamaño maximo permitido es de 3MB";
    } else {
        $src = $carpeta . $nombre;
        move_uploaded_file($ruta_provisional, $src);
        echo "Imagen guardada con exito";
    }
}

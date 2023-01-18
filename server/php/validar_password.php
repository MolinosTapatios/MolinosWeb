<?php
session_start();
require "conexion.php";

$passwor = $_POST["password"];

if($_SESSION["password"]==md5($passwor)){
echo 1;
}else{
    echo 2;
}

?>
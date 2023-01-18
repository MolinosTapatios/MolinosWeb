<?php
session_start();

if(!$_SESSION["user_active"]==true){
    header("Location: ../index.php");
}

?>
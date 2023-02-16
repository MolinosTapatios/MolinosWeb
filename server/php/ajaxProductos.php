<?php
include("./config.php");

$conn = conexionMSQLI();
$sql = "SELECT * from productos";
$resultado = $conn->query($sql);

while($fila = $resultado->fetch_array()){
    $producto[] = array_map('utf8_encode', $fila);
}

// if (mysqli_num_rows($result)) {
//     while ($row = mysqli_fetch_array($result)) {
//         $output .= '<tr class="filas">
//                             <td>' . $row['id'] . '</td>
//                             <td>' . $row['fecha'] . '</td>
//                             <td>' . $row['hora'] . '</td>
//                             <td>' . $row['tipo_respaldo'] . '</td>
//                             <td>' . $row['servidor'] . '</td>
//                             <td>' . $row['usuario'] . '</td>
//                             <td>' . $row['observacion'] . '</td>
//                     </tr>';
//     }
//     echo $output;
// }

echo json_encode($producto);
$resultado->close();
?>
<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");



$json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

$params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE


require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB
$conexion = conexion(); // CREA LA CONEXION




$query = "SELECT r.nombre_ranking , r.id_ranking FROM rankings r , usuariosranking u";
$result = mysqli_query($conexion, $query);

if (mysqli_num_rows($result) > 0) {
  // output data of each row
  while($row = mysqli_fetch_assoc($result)) {
    // echo "nombre: " . $row["nombre_ranking"]. " - Name: " . $row["id_ranking"] ;
  }
}

header('Content-Type: application/json');
echo json_encode($row);

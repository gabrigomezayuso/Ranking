<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");



$json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

$params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE


require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB
$conexion = conexion(); // CREA LA CONEXION


$query = mysqli_query($conexion, "SELECT r.nombre_ranking , r.id_ranking FROM rankings r , usuariosranking u WHERE u.idUsuario = $params->idUser");

header('Content-Type: application/json');
echo json_encode($query->num_rows);

<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");



$json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

$params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE


require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB
$conexion = conexion(); // CREA LA CONEXION
$ranking="";
$resultadoNoRepetir2="";
//Funcion aleatoria

$resultadoNoRepetir = mysqli_query($conexion, "SELECT idUsuario, idRanking  FROM usuariosranking WHERE idRanking='$params->idRanking' AND idUsuario='$params->idUser' ");
$resultadoNoRepetir2 = mysqli_query($conexion, "SELECT * FROM rankings WHERE id_ranking='$params->idRanking'");


if ($resultadoNoRepetir->num_rows >=1) {
  echo json_encode('ERROR');
} else if ($resultadoNoRepetir2->num_rows ===0) {
  echo json_encode('ERROR');
}else {
    // REALIZA LA QUERY A LA DB
    $resultado = mysqli_query($conexion, "INSERT INTO `usuariosranking`(`idUsuario`, `idRanking`, `puntuacion`)
    VALUES ('$params->nombre','$resultadoNoRepetir',0)");


    header('Content-Type: application/json');
    echo json_encode($ranking);
  }




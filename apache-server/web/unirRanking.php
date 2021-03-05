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


    // REALIZA LA QUERY A LA DB
    $resultado = mysqli_query($conexion, "INSERT INTO `usuariosranking`(`idUsuario`, `idRanking`, `puntuacion`)
    VALUES ('$params->idUser','$params->id',0)");
    header('Content-Type: application/json');
    echo json_encode($ranking);
  // }




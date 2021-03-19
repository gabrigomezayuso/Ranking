<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  $json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

  $params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE

  require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  $conexion = conexion(); // CREA LA CONEXION

  $mysqli = new mysqli('192.168.3.26', 'DAW2_GamifikG6', 'aGamifikG61', 'daw2_gamifikg6');


    $x=0;



$query = $mysqli -> query ("DELETE FROM equiposranking
where idRanking =$params->id_ranking");

$query = $mysqli -> query ("DELETE FROM usuariosranking
where idRanking = $params->id_ranking");

$query = $mysqli -> query ("DELETE FROM rankings
WHERE id_ranking=$params->id_ranking");



header('Content-Type: application/json');
echo json_encode($id_ranking);

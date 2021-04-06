<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  $json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

  $params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE

  require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  $conexion = conexion(); // CREA LA CONEXION

  $mysqli = new mysqli('192.168.3.26', 'DAW2_GamifikG6', 'aGamifikG61', 'daw2_gamifikg6');

   $resultadoNoRepetir = mysqli_query($conexion, "INSERT INTO entrega (idranking, nentrega)  values ($params->idRanking,$params->nombreEntrega)");

    header('Content-Type: application/json');

    echo json_encode($params->idRanking); // MUESTRA EL JSON GENERADO

?>

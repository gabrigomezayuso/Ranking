<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  $json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

  $params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE

  require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  $conexion = conexion(); // CREA LA CONEXION

  $mysqli = new mysqli('192.168.3.26', 'DAW2_GamifikG6', 'aGamifikG61', 'daw2_gamifikg6');


$query = $mysqli -> query ("UPDATE daw2_gamifikg6.alumnos SET  nombre_equipo = '$params->nombre_equipo' ,puntuacion = '$params->puntuacion' WHERE idUsuario= $params->id");
    // UPDATE alumnos  WHERE idUsuario = ";



header('Content-Type: application/json');
echo json_encode($array);

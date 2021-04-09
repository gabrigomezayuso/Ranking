<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  $json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

  $params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE

  require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  $conexion = conexion(); // CREA LA CONEXION

  $mysqli = new mysqli('oracle.ilerna.com', 'DAW2_GamifikG6', 'aGamifikG61', 'daw2_gamifikg6');

  $length = count($params);
  for ($i = 0; $i < $length; $i++) {
    $equipo=$params[$i];
    $query = $mysqli -> query ("UPDATE daw2_gamifikg6.usuariosranking SET  puntuacion = '$equipo->puntuacion' WHERE idUsuario= '$equipo->idUsuario'");
    $query = $mysqli -> query ("UPDATE daw2_gamifikg6.equiposranking SET  nombreEquipo = '$equipo->nombreEquipo' WHERE idUsuario= '$equipo->idUsuario'");
  }

  // $query = $mysqli -> query ("UPDATE daw2_gamifikg6.usuariosranking SET  puntuacion = 500 WHERE idUsuario= 37");
    // UPDATE alumnos  WHERE idUsuario = ";



header('Content-Type: application/json');
echo json_encode($params);

<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  $json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

  $params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE

  require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  $conexion = conexion(); // CREA LA CONEXION

  $mysqli = new mysqli('oracle.ilerna.com', 'DAW2_GamifikG6', 'aGamifikG61', 'daw2_gamifikg6');


    $x=0;

$query = $mysqli -> query ("SELECT equipo
                            FROM rankings
                            where id_ranking = $params->idUser");
// $valores = mysqli_fetch_array($query);

// foreach (mysqli_fetch_array($query) as &$valor) {
//   echo $valor;
// }

header('Content-Type: application/json');
echo json_encode($array);

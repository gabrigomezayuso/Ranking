<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

$params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE

require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

$conexion = conexion(); // CREA LA CONEXION

  $mysqli = new mysqli('oracle.ilerna.com', 'DAW2_GamifikG6', 'aGamifikG61', 'daw2_gamifikg6');



$x = 0;

$array[]=null;


// $query = $mysqli->query("SELECT idusuario ,sum(puntuacion)
// FROM daw2_gamifikg6.puntuacionentrega
// group by idusuario ");




$query = $mysqli->query("SELECT id_ranking, nombre_ranking
FROM daw2_gamifikg6.rankings
WHERE id_ranking = '$params->nombre_ranking'");


while ($valores = mysqli_fetch_array($query)) {
  $array[$x] = $valores;
  $x++;
}


header('Content-Type: application/json');
echo json_encode($array);

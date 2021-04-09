<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  $json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

  $params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE

  require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  $conexion = conexion(); // CREA LA CONEXION

  $mysqli = new mysqli('oracle.ilerna.com', 'DAW2_GamifikG6', 'aGamifikG61', 'daw2_gamifikg6');


    $x=0;

$query = $mysqli -> query ("SELECT r.nombre_ranking,r.id_ranking
                            FROM rankings r
                            INNER JOIN  usuariosranking u
                            ON u.idRanking = r.id_ranking
                            where u.idUsuario = $params->idUser");
// $valores = mysqli_fetch_array($query);

// foreach (mysqli_fetch_array($query) as &$valor) {
//   echo $valor;
// }

while ($valores = mysqli_fetch_array($query)) {
  $array[$x][0]=$valores[0];
  $array[$x][1]=$valores[1];
  $x++;
}

header('Content-Type: application/json');
echo json_encode($array);

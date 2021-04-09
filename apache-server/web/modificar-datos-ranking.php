<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

$params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE

require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

$conexion = conexion(); // CREA LA CONEXION

  $mysqli = new mysqli('oracle.ilerna.com', 'DAW2_GamifikG6', 'aGamifikG61', 'daw2_gamifikg6');

$x=0;
  $length = count($params);
  for ($i = 0; $i < $length; $i++) {
    $equipo=$params[$i];
    $query = $mysqli -> query ("UPDATE puntuacionentrega p2, entrega e2 SET  puntuacion='$equipo->puntuacion' WHERE idUsuario= '$equipo->idUsuario' and e2.nentrega = '$equipo->nentrega'");
    // $query = $mysqli -> query ("UPDATE daw2_gamifikg6.equiposranking SET  nombreEquipo = '$equipo->nombreEquipo' WHERE idUsuario= '$equipo->idUsuario' and idRanking = '$equipo->idranking'");
  }

  // $query = $mysqli -> query ("UPDATE daw2_gamifikg6.usuariosranking SET  puntuacion = 500 WHERE idUsuario= 37");
    // UPDATE alumnos  WHERE idUsuario = ";

    $query = $mysqli -> query ("UPDATE OR INSERT puntuacionentrega p2, entrega e2 SET  puntuacion=5000 WHERE idUsuario= 45 and e2.nentrega = 'coldwar'");

    if(!$query){
      $query = $mysqli -> query ("
      INSERT INTO puntuacionentrega ( idusuario, idranking, puntuacion) VALUES( 45, 2, 200);
      INSERT puntuacionentrega p2, entrega e2 SET  puntuacion=5000 WHERE idUsuario= 45 and e2.nentrega = 'coldwar'");

    }
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

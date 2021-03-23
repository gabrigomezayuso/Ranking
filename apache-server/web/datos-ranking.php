<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

$params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE

require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

$conexion = conexion(); // CREA LA CONEXION

$mysqli = new mysqli('192.168.3.26', 'DAW2_GamifikG6', 'aGamifikG61', 'daw2_gamifikg6');


$x = 0;
$y = 1;



$query = $mysqli->query("select  DISTINCT r.nombre_ranking, a.nombre ,a.idUsuario,a.usuario,a.apellido, u2.puntuacion, e2.nombreEquipo, r.id_ranking
from rankings r
inner join usuariosranking u2 on u2.idRanking = r.id_ranking
inner join equiposranking e2  on e2.idUsuario = u2.idUsuario
inner join entrega e3  on e3.idranking = r.id_ranking
left join puntuacionentrega p2  on p2.idusuario = u2.idUsuario
inner join alumnos a on a.idUsuario = u2.idUsuario
where e2.idRanking = r.id_ranking and e2.idRanking = 429583
order by u2.puntuacion desc");



while ($valores = mysqli_fetch_array($query)) {
  $array[0][$x] = $valores;
  $x++;
}

$query1 = $mysqli->query("select  distinct a.apellido , u2.idUsuario , r.id_ranking, e3.nentrega , p2.puntuacion
from rankings r
inner join usuariosranking u2 on u2.idRanking = r.id_ranking
inner join equiposranking e2  on e2.idUsuario = u2.idUsuario
inner join entrega e3  on e3.idranking = r.id_ranking
left join puntuacionentrega p2  on p2.idusuario = u2.idUsuario
inner join alumnos a on a.idUsuario = u2.idUsuario
where e2.idRanking = r.id_ranking and e2.idRanking = 429583
order by a.apellido asc");



while ($valores = mysqli_fetch_array($query1)) {
  $y++;
  $array[1][$x][$y] = $valores;
  if ($y % 2 != 0) {
    $x++;
  }
}




// for ($set = array (); $row = $result->fetch_assoc(); $set[] = $row);


// if (mysqli_num_rows($result) > 0) {
//   // output data of each row

//   while($row = mysqli_fetch_assoc($result)) {
//     header('Content-Type: application/json');
//     echo json_encode ($row["nombre_ranking"]) ;
//   }
header('Content-Type: application/json');
echo json_encode($array);

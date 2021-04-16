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




$query = $mysqli->query("select  DISTINCT r.nombre_ranking, a.nombre ,a.idUsuario,a.usuario,a.apellido, sumatotal.puntuacion , e2.nombreEquipo, r.id_ranking
from rankings r
inner join usuariosranking u2 on u2.idRanking = r.id_ranking
inner join equiposranking e2  on e2.idUsuario = u2.idUsuario
inner join entrega e3  on e3.idranking = r.id_ranking
inner join alumnos a on a.idUsuario = u2.idUsuario
left join (SELECT idusuario ,sum(puntuacion) as puntuacion
FROM daw2_gamifikg6.puntuacionentrega
where idRanking = '$params->nombre_ranking'
group by idusuario)as sumatotal on u2.idUsuario = sumatotal.idUsuario
where e2.idRanking = r.id_ranking and e2.idRanking = '$params->nombre_ranking'
order by sumatotal.puntuacion desc");



while ($valores = mysqli_fetch_array($query)) {
  $array[$x] = $valores;
  $x++;
}


header('Content-Type: application/json');
echo json_encode($array);

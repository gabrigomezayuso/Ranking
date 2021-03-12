<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  $json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

  $params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE

  require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  $conexion = conexion(); // CREA LA CONEXION

  $mysqli = new mysqli('192.168.3.26', 'DAW2_GamifikG6', 'aGamifikG61', 'daw2_gamifikg6');


    $x=0;



$query = $mysqli -> query ("select r.nombre_ranking, a.nombre ,a.usuario,a.apellido, u2.puntuacion, e2.nombreEquipo
from rankings r
inner join usuariosranking u2 on u2.idRanking = r.id_ranking
inner join equiposranking e2  on e2.idRanking = r.id_ranking
inner join alumnos a on a.idUsuario = u2.idUsuario
where r.id_ranking ='$params->nombre_ranking'
order by u2.puntuacion desc ");



while ($valores = mysqli_fetch_array($query)) {
  $array[$x]=$valores;
  $x++;
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

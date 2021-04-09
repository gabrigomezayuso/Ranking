<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");



  $json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

  $params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE



  require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  $conexion = conexion(); // CREA LA CONEXION

  $x=0;


  $resultadoNoRepetir = mysqli_query($conexion, "  select  distinct a.apellido , u2.idUsuario , r.id_ranking, e3.nentrega , p2.puntuacion
  from rankings r
  inner join usuariosranking u2 on u2.idRanking = r.id_ranking
  inner join equiposranking e2  on e2.idUsuario = u2.idUsuario
  inner join entrega e3  on e3.idranking = r.id_ranking
  left join puntuacionentrega p2  on p2.idusuario = u2.idUsuario
  inner join alumnos a on a.idUsuario = u2.idUsuario
  where e2.idRanking = r.id_ranking and e2.idRanking = $params
  order by a.apellido asc");

  //$resultadoNoRepetir = mysqli_query($conexion, "SELECT * FROM entregas WHERE idRanking='$params'");


  while ($registros = mysqli_fetch_array($resultadoNoRepetir)) {
    $array[$x]=$registros;
    $x++;
  }



    header('Content-Type: application/json');

    echo json_encode($array); // MUESTRA EL JSON GENERADO

?>

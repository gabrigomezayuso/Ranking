<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");



$json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

$params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE


require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB
$conexion = conexion(); // CREA LA CONEXION
$ranking="";
$resultadoNoRepetir2="";
//Funcion aleatoria

$resultadoNoRepetir = mysqli_query($conexion, "SELECT u.idUsuario, r2.id_ranking FROM usuariosranking u left join rankings r2 on r2.id_ranking = u.idRanking where u.idUsuario = $params->idUser and r2.codigo = $params->id");
$resultadoNoRepetir3 = mysqli_query($conexion, "SELECT DISTINCT id_ranking  FROM rankings WHERE codigo='$params->id'");
$resultadoNoRepetir2 = mysqli_query($conexion, "SELECT * FROM rankings WHERE codigo='$params->id'");

$query = $mysqli -> query ("SELECT id_ranking  FROM rankings WHERE codigo='$params->id'");
          while ($valores = mysqli_fetch_array($query)) {
           $idRanking = $valores['id_ranking'];
          }

if ($resultadoNoRepetir2->num_rows <1) {
  header('Content-Type: application/json');
  echo json_encode('ERROR. Este ranking no existe');
}else if ($resultadoNoRepetir->num_rows >=1) {
  header('Content-Type: application/json');
  echo json_encode('ERROR. Ya estas en este Ranking');
}else {

    // REALIZA LA QUERY A LA DB
    $resultado = mysqli_query($conexion, "INSERT INTO `usuariosranking`(`idUsuario`, `idRanking`, `puntuacion`)
    VALUES ('$params->idUser',$idRanking,0)");
     $resultado3 = mysqli_query($conexion, "INSERT INTO `equiposranking`(`idUsuario`, `idRanking`, `nombreEquipo`)
     VALUES ('$params->idUser',$idRanking,'Equipo')");



    header('Content-Type: application/json');
    echo json_encode('Te has unido perfectamente');
}




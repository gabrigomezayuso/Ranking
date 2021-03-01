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
function generateRandomString($length = 6)
{
  $characters = '0123456789';
  $charactersLength = strlen($characters);
  $randomString = '';
  for ($i = 0; $i < $length; $i++) {
    $randomString .= $characters[rand(0, $charactersLength - 1)];
  }
  return $randomString;
}

$resultadoNoRepetir = mysqli_query($conexion, "SELECT * FROM rankings WHERE nombre_ranking='$params->nombre'");


if ($resultadoNoRepetir->num_rows >= 1) {
  echo json_encode('ERROR');
} else {

  while($ranking==$resultadoNoRepetir2){

  $ranking = generateRandomString(6);
  $resultadoNoRepetir2 = mysqli_query($conexion, "SELECT id_ranking FROM rankings WHERE id_ranking='$ranking'");

  }

    // REALIZA LA QUERY A LA DB
    $resultado = mysqli_query($conexion, "INSERT INTO `rankings`(`id_ranking`, `nombre_ranking`, `administrador`)
    VALUES ('$ranking','$params->nombre','$params->idProfesor')");

  }


header('Content-Type: application/json');
echo json_encode($ranking);

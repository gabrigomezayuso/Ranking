<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");



$json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

$params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE


require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB
$conexion = conexion(); // CREA LA CONEXION
$ranking = "";
//Funcion aleatoria


function generateRandomString($length)
{
  $characters = '123456789';
  $charactersLength = strlen($characters);
  $randomString = '';
  for ($i = 0; $i < $length; $i++) {
    $randomString .= $characters[rand(0, $charactersLength - 1)];
  }
  return $randomString;
}

$ranking = generateRandomString(6);
$x=0;


  $mysqli = new mysqli('oracle.ilerna.com', 'DAW2_GamifikG6', 'aGamifikG61', 'daw2_gamifikg6');



  // REALIZA LA QUERY A LA DB
$resultado = mysqli_query($conexion, "UPDATE daw2_gamifikg6.rankings SET codigo=$ranking WHERE id_ranking=$params->nombre");
header('Content-Type: application/json');
echo json_encode($ranking);








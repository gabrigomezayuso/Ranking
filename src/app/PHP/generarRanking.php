<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");



$json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

$params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE


require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

$conexion = conexion(); // CREA LA CONEXION

$passwordc = password_hash($params->contrasena, PASSWORD_DEFAULT);

//Funcion aleatoria
function generateRandomString($length=6) {
  $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  $charactersLength = strlen($characters);
  $randomString = '';
  for ($i = 0; $i < $length; $i++) {
      $randomString .= $characters[rand(0, $charactersLength - 1)];
  }
  return $randomString;
}

$ranking= generateRandomString(6);

echo $ranking;


$resultadoNoRepetir = mysqli_query($conexion, "SELECT id_ranking FROM rankings WHERE id_ranking='$ranking'");



if($resultadoNoRepetir->num_rows >= 1) {

  while($ranking === $resultadoNoRepetir){
    $ranking= generateRandomString(6);
  }

}else{
// REALIZA LA QUERY A LA DB
$resultado = mysqli_query($conexion, "INSERT INTO `rankings`(`id_ranking`, `nombreRanking`, `administrador`)
VALUES ('$ranking','$params->nombre','$params->idProfesor')");
}

$instruccion = "SELECT contrasena FROM alumnos WHERE usuario = '$params->usuario'";
$resultado = mysqli_query($conexion, $instruccion);




?>

<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

$params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE

require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

$conexion = conexion(); // CREA LA CONEXION

$mysqli = new mysqli('oracle.ilerna.com', 'DAW2_GamifikG6', 'aGamifikG61', 'daw2_gamifikg6');
$datos[]=null;
$x = 0;
$length = count($params);
for ($i = 0; $i < $length; $i++) {
  $equipo = $params[$i];

  $instruccion = " SELECT identrega, idusuario, idranking, idpuntuacion, puntuacion FROM puntuacionentrega WHERE idusuario= '$equipo->idUsuario' and identrega = '$equipo->identrega'";
  $resultado = mysqli_query($conexion, $instruccion);
  while ($registros = mysqli_fetch_array($resultado))
  {
    $datos[] = $registros;
  }
  if (empty($datos[$i])){
    $query= $mysqli->query("INSERT INTO puntuacionentrega (identrega, idusuario, idranking, puntuacion) VALUES($equipo->identrega, $equipo->idUsuario, $equipo->idranking, $equipo->puntuacion)");
  }else{
    $instruccion = "UPDATE puntuacionentrega p2 SET  puntuacion='$equipo->puntuacion' WHERE idUsuario= '$equipo->idUsuario' and identrega = '$equipo->identrega'";
    $resultado = mysqli_query($conexion, $instruccion);
  }


}


header('Content-Type: application/json');
echo json_encode($params);

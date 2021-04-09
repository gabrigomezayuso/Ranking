<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");



  $json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

  $params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE



  require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  $conexion = conexion(); // CREA LA CONEXION

  $x=0;


  $resultadoNoRepetir = mysqli_query($conexion, "SELECT DISTINCT nentrega FROM entrega WHERE idRanking='$params'");


  while ($registros = mysqli_fetch_array($resultadoNoRepetir)) {
    $array[$x]=$registros;
    $x++;
  }



    header('Content-Type: application/json');

    echo json_encode($array); // MUESTRA EL JSON GENERADO

?>

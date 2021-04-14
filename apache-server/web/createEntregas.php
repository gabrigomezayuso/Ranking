<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  $datos;
  $json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

  $params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE

  require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB
  $id=$params->idRanking;
  $nombre=$params->nombreEntrega;
  $conexion = conexion(); // CREA LA CONEXION




   $resultadoNoRepetir = mysqli_query($conexion, " INSERT INTO daw2_gamifikg6.entrega ( idranking, nentrega) VALUES( '$id','$nombre');");


   $resultadoNoRepetir = mysqli_query($conexion, "SELECT DISTINCT nentrega FROM entrega WHERE idRanking='$id'");


   while ($registros = mysqli_fetch_array($resultadoNoRepetir)) {
     $array[$x]=$registros;
     $x++;
   }


//falta ficar select i retornarlo

    header('Content-Type: application/json');

    echo json_encode($array); // MUESTRA EL JSON GENERADO

?>

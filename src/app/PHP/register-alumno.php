<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");



  $json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

  $params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE


  require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  $conexion = conexion(); // CREA LA CONEXION

  $passwordc = password_hash($params->contrasena, PASSWORD_DEFAULT);

  // REALIZA LA QUERY A LA DB
  $resultado = mysqli_query($conexion, "INSERT INTO `alumnos`(`usuario`, `contrasena`, `email`, `nombre`, `apellido`)
  VALUES ('$params->usuario','$passwordc','$params->email','$params->nombre','$params->apellido')");

    class Result {}

    // GENERA LOS DATOS DE RESPUESTA
    $response = new Result();

    if($resultado) {
        $response->resultado = 'OK';
        $response->mensaje = 'REGISTER EXITOSO';
    } else {
        $response->resultado = 'FAIL';
        $response->mensaje = 'REGISTER FALLIDO';
    }

    header('Content-Type: application/json');

    echo json_encode($response); // MUESTRA EL JSON GENERADO

?>

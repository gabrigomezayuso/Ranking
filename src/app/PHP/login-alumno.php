<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  $json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

  $params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE

  require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  $conexion = conexion(); // CREA LA CONEXION

  // REALIZA LA QUERY A LA DB
  $resultado = mysqli_query($conexion, "SELECT * FROM alumnos WHERE usuario='$params->usuario' AND contrasena='$params->contrasena'");
  $query = "SELECT * FROM alumnos WHERE usuario='seryi' AND contrasena='123'";

  $stmt = $conexion->prepare($resultado);
  $stmt->execute();
  $userData = array();

while($row=$stmt->fetch(PDO::FETCH_ASSOC)){

      $userData['AllUsers'][] = $row;

}
    class Result {}

    // GENERA LOS DATOS DE RESPUESTA
    $response = new Result();

    if($resultado->num_rows > 0) {
      $response->resultado = 'OK';
      $response->nombre = $params->usuario;
      $response->mensaje = 'LOGIN EXITOSO';
    } else {
        $response->resultado = 'FAIL';
        $response->mensaje = 'LOGIN FALLIDO';
    }

    header('Content-Type: application/json');
    echo json_encode($userData);

    // echo json_encode($response); // MUESTRA EL JSON GENERADO

?>

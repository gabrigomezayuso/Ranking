<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  $datos;
  $json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

  $params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE

  require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  $conexion = conexion(); // CREA LA CONEXION

  $passwordc = password_hash($params->contrasena, PASSWORD_DEFAULT);

  $instruccion = "UPDATE daw2_gamifikg6.alumnos SET contrasena = '$passwordc', email = '$params->email', nombre = '$params->nombre', apellido = '$params->apellido' WHERE idUsuario= $params->id";
  // UPDATE alumnos  WHERE idUsuario = ";
  $resultado = mysqli_query($conexion, $instruccion);

   if (!$resultado){


  }else{
    $resultado = mysqli_query($conexion, "SELECT * FROM alumnos WHERE idUsuario='$params->id'");
    while ($registros = mysqli_fetch_array($resultado))
    {
      $datos[] = $registros;
    }
  }


  // }



    class Result {}

    // GENERA LOS DATOS DE RESPUESTA
    $response = new Result();
    $response->nombre = $params->contrasena;

    if($resultado->num_rows > 0) {
      $response->resultado = 'OK';
      $response->mensaje = 'LOGIN EXITOSO'.$params->usuario;
    } else {
        $response->resultado = 'FAIL';
        $response->mensaje = 'LOGIN FALLIDO';
        $response->nombre = $params->contrasena;
      }

    header('Content-Type: application/json');
    echo json_encode($datos);

    // echo json_encode($response); // MUESTRA EL JSON GENERADO
   <?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  $datos;
  $json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

  $params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE

  require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  $conexion = conexion(); // CREA LA CONEXION

  $passwordnew = password_hash($params->contrasena, PASSWORD_DEFAULT);

  // $instruccion = "UPDATE daw2_gamifikg6.profesores SET apellido='$params->apellido',nombre='$params->nombre', contrasena=$passwordc, usuario='$params->usuario',centro='$params->centro' WHERE idUsuario='$params->id'";


  $instruccionSelect = mysqli_query($conexion,"SELECT * FROM profesores WHERE usuario='$params->usuario' AND contrasena='$passwordc'");

  if(!$instruccionSelect->num_rows >= 1) {


}else{



  $instruccion = "UPDATE daw2_gamifikg6.profesores SET contrasena = '$passwordnew', email = '$params->email', nombre = '$params->nombre', apellido = '$params->apellido',centro='$params->centro' WHERE idUsuario= $params->id";
  // UPDATE alumnos  WHERE idUsuario = ";
  $resultado = mysqli_query($conexion, $instruccion);

   if (!$resultado){


  }else{
    $resultado = mysqli_query($conexion, "SELECT * FROM daw2_gamifikg6.profesores  WHERE idUsuario='$params->id'");
    while ($registros = mysqli_fetch_array($resultado))
    {
      $datos[] = $registros;
    }
  }
}

    header('Content-Type: application/json');
    echo json_encode($datos);

    // echo json_encode($response); // MUESTRA EL JSON GENERADO

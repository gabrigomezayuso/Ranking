<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  $json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

  $params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE

  require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  $conexion = conexion(); // CREA LA CONEXION

  // REALIZA LA QUERY A LA DB

  $instruccion = "SELECT contrasena FROM profesores WHERE usuario = '$params->usuario'";
	$resultado = mysqli_query($conexion, $instruccion);

	while ($fila = $resultado->fetch_assoc()) {
		$password2=$fila["contrasena"];
	}

   if (!password_verify ($params->contrasena, $password2)){


  }else{
    $resultado = mysqli_query($conexion, "SELECT * FROM profesores WHERE usuario='$params->usuario' AND contrasena='$password2'");
    while ($registros = mysqli_fetch_array($resultado))
    {
      $datos[] = $registros;
    }
  }

    header('Content-Type: application/json');

    echo json_encode($datos); // MUESTRA EL JSON GENERADO

?>

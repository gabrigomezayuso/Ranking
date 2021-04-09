<?php
 global $enlace; //variable de tipo global para llamarla en cualquier parte de la aplicacion donde se llame
function conexion(){
  // $enlace = mysqli_connect('localhost', 'root', 'usbw', 'ranking'); //conexion con la base de datos
  $enlace = mysqli_connect('oracle.ilerna.com', 'DAW2_GamifikG6', 'aGamifikG61', 'daw2_gamifikg6'); //conexion con la base de datos
  // $enlace = mysqli_connect('192.168.3.26', 'DAW2_GamifikG6', 'aGamifikG61', 'daw2_gamifikg6'); //conexion con la base de datos
    mysqli_set_charset($enlace,"utf8");
    //   $mysqli = new mysqli('oracle.ilerna.com', 'DAW2_GamifikG6', 'aGamifikG61', 'daw2_gamifikg6');


    if(!$enlace){
     echo "Error: No se puede conectar a MySQL." . PHP_EOL;
     echo "Error de depuracion: " . mysqli_connect_errno() . PHP_EOL;
     echo "Error de depuracion: " . mysqli_connect_error() . PHP_EOL;
     exit;
    }
   return $enlace;
}

  $mysqli = new mysqli('oracle.ilerna.com', 'DAW2_GamifikG6', 'aGamifikG61', 'daw2_gamifikg6');



?>

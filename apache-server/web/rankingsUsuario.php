<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");



$json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

$params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE


require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB
$conexion = conexion(); // CREA LA CONEXION




$query = "SELECT rankings.nombre_ranking FROM rankings INNER JOIN  usuariosranking ON usuariosranking.idRanking = rankings.id_ranking where usuariosranking.idUsuario = $params->idUser";
$result = mysqli_query($conexion, $query);


for ($set = array (); $row = $result->fetch_assoc(); $set[] = $row);


// if (mysqli_num_rows($result) > 0) {
//   // output data of each row

//   while($row = mysqli_fetch_assoc($result)) {
//     header('Content-Type: application/json');
//     echo json_encode ($row["nombre_ranking"]) ;
//   }
// }
header('Content-Type: application/json');
echo json_encode($result);

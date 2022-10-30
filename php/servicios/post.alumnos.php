<?php
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");


$nombre=$_POST['txtnombre'];
$estado=$_POST['cmbestado'];

$sql="INSERT INTO alumnos (nombre) values ('$nombre')";

$echo=Database::ejecutar_idu($sql);

if($echo){
$respuesta = json_encode( 

			array('err' => false, 
			'mensaje' =>'Insertado Correctamente',
				  'nombre' => $nombre,
				  'estado' =>$estado )
		);
	}else{
		$respuesta = json_encode( 
		array('err' => true, 
			'mensaje' =>$echo)
		);
	}

echo $respuesta;



?>
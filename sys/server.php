<?php
//call library
require_once ('lib/nusoap.php');

//using soap_server to create server object
$server = new soap_server;

$URL = "http://localhost/webrilhar/sys/server.php";
$namespace = $URL . '?wsdl';
$server->configureWSDL('Categorias', $namespace);
ini_set( 'soap.wsdl_cache_enable' , 0 );
ini_set( 'soap.wsdl_cache_ttl' , 0 );
//register a function that works on server
$server->register('getCategorias');
// function
	function getCategorias()	{
		$conn = mysql_connect('127.0.0.1','root','');
		mysql_select_db('bd_catalog_produtos', $conn);
		
		$sql = "SELECT * FROM categoria";
		$q	= mysql_query($sql);
		$pos = 0;
		while($r = mysql_fetch_array($q)){
		  $items[$pos] = $r['nm_categoria'];
			$pos = $pos + 1;
		}		
		return $items;
	}
// create HTTP listener

if( ! isset( $HTTP_RAW_POST_DATA )) {
   $HTTP_RAW_POST_DATA = file_get_contents( 'php://input' );
}
$server->service($HTTP_RAW_POST_DATA); 
exit();
?> 
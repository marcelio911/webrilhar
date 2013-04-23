<?php
require_once("lib/nusoap.php");
require('categorias.php');

$server=new nusoap_server();
$namespace = "http://localhost/webrilhar/sys/server.php";
$server->wsdl->schemaTargetNamespace = $namespace;
$server->configureWSDL('mbank','urn:mbank');

//calling the method
$server->register("balance_enq",
			array('ac_no'=>'xsd:string'),
			array('output'=>'xsd:string'),
			'urn:mbank',
			'urn:mbank#balance_enq'
			);

  
$HTTP_RAW_POST_DATA = isset($HTTP_RAW_POST_DATA) ? $HTTP_RAW_POST_DATA : '';
$server->service($HTTP_RAW_POST_DATA);
/*
$server->register( 'hello',             // method name
    array('name' => 'xsd:string'),      // input parameters
    array('return' => 'xsd:string'),    // output parameters
    'uri:helloworld',                   // namespace
    'uri:helloworld/hello',             // SOAPAction
    'rpc',                              // style
    'encoded'                           // use
);
// Define the method as a PHP function
function hello($name) {
    return 'Hello, ' . $name;
}*/
// Use the request to (try to) invoke the service 
/**/
?> 
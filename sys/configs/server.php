<?php 
require('configs.php');

require('../../lib/nusoap.php'); 

$server = new nusoap_server(); 
$server->configureWSDL('stockquote', 'urn:stockquote'); 
$server->register("getStockQuote", 
            array('symbol' => 'xsd:string'), 
            array('return' => 'xsd:string'), 
            'urn:stockquote', 
            'urn:stockquote#getStockQuote'); 

if( ! isset( $HTTP_RAW_POST_DATA )) {
   $HTTP_RAW_POST_DATA = file_get_contents( 'php://input' );
}
$server->service($HTTP_RAW_POST_DATA); 
?> 
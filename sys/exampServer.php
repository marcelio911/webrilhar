<?php
require_once("lib/nusoap.php");
//instaciando o soapserver
$server = new soap_server();
$server->configureWSDL('server.triangulo', 'urn:server.triagulo');
$server->wsdl->schemaTargetNamespace = 'urn:server.triangulo';

//criando a fun��o do webservice m�todo register
$server->register('triangulo',  		//Nome da fun��o
		array('a'=>'xsd:string',		//Par�metros da fun��o	
			  'b'=>'xsd:string',
			  'c'=>'xsd:string'),
		array('retorno'=>'xsdstring'),	 //Valores de retorno
		'urn:server.triangulo',          //Namespace
		'urn:server.triangulo#triangulo',//SOAP Action
		'rpc', 							 //style
		'encode',						 //use
		'Classifica o tri�ngulo com as medidas dos lados' //descri��o do servi�o
);

//criando o m�todo de identifica��o do Tri�ngulo
function triangulo($a, $b, $c){
	if ($a<= 0 || $b <=0 || $c<=0){
		return 'N�o � triangulo';
	}
	if (($a>=$b +$c) || ($b >=$a +$c) ||($c=$a +$b)){
		return 'N�o � triangulo';
	}
	if (($a<=abs($b-$c)) || ($b <=abs($a-$c)) ||($c=abs($a-$b))){
		return 'N�o � triangulo';
	}
	
	//� um triangulo 
	//Colocando os lados em ordem crescente
	
	$lados=array($a,$b,$c);
	sort($lados,SORT_NUMERIC);
	$a=$lados[2];$b = $lados[1];$c=$lados[0];
	
	//vari�vel de resposta
	$ans='';
	
	//N�o � equil�tero
	if($a>$c){
		
	}	
}//triangulo

$HTTP_RAW_POST_DATA = isset($HTTP_RAW_POST_DATA)?$HTTP_RAW_POST_DATA: '';
$server->service($HTTP_RAW_POST_DATA);
?> 
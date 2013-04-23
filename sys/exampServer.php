<?php
require_once("lib/nusoap.php");
//instaciando o soapserver
$server = new soap_server();
$server->configureWSDL('server.triangulo', 'urn:server.triagulo');
$server->wsdl->schemaTargetNamespace = 'urn:server.triangulo';

//criando a função do webservice método register
$server->register('triangulo',  		//Nome da função
		array('a'=>'xsd:string',		//Parâmetros da função	
			  'b'=>'xsd:string',
			  'c'=>'xsd:string'),
		array('retorno'=>'xsdstring'),	 //Valores de retorno
		'urn:server.triangulo',          //Namespace
		'urn:server.triangulo#triangulo',//SOAP Action
		'rpc', 							 //style
		'encode',						 //use
		'Classifica o triângulo com as medidas dos lados' //descrição do serviço
);

//criando o método de identificação do Triângulo
function triangulo($a, $b, $c){
	if ($a<= 0 || $b <=0 || $c<=0){
		return 'Não é triangulo';
	}
	if (($a>=$b +$c) || ($b >=$a +$c) ||($c=$a +$b)){
		return 'Não é triangulo';
	}
	if (($a<=abs($b-$c)) || ($b <=abs($a-$c)) ||($c=abs($a-$b))){
		return 'Não é triangulo';
	}
	
	//É um triangulo 
	//Colocando os lados em ordem crescente
	
	$lados=array($a,$b,$c);
	sort($lados,SORT_NUMERIC);
	$a=$lados[2];$b = $lados[1];$c=$lados[0];
	
	//variável de resposta
	$ans='';
	
	//Não é equilátero
	if($a>$c){
		
	}	
}//triangulo

$HTTP_RAW_POST_DATA = isset($HTTP_RAW_POST_DATA)?$HTTP_RAW_POST_DATA: '';
$server->service($HTTP_RAW_POST_DATA);
?> 
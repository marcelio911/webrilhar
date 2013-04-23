<?php
require_once ('lib/nusoap.php');
$wsdl="http://localhost/webrilhar/sys/exampServer.php?wsdl";
$client=new soapclient($wsdl);

$erros->$client->getError();
if($erros){
 echo "Erro no método construtor <pre>'$erros'</pre>";
}
//Recebendo o resultado da chamada para formar o triangulo	
$resultado = $client->call('triangulo', array('3','4','5'));

	if($resultado->fault){
		echo "Falha: <pre>'$resultado->fault'</pre>";
	}else{
		$erros = $client->getError();
		if ($erros){
			echo "Erro: <pre>'$erro'</pre>";
		}else{
			echo $resultado;
		}
	}
?>
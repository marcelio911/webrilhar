<?php
require_once ('lib/nusoap.php');

$wsdl = 'http://localhost/webrilhar/sys/server.php';
$parameters=array('ac_no'=>"3");
$client=new nusoap_client($wsdl);
$response=$client->call('balance_enq',$parameters);
$error=$client->getError();

if($error){
	 print_r($client->response);			 
	 print_r($client->getDebug());
	 die();
}

echo "Resposta do ambiente:";
//$response=$parameters['ac_no'];
ussd_stop($response);

?>
</body> 
</html> 
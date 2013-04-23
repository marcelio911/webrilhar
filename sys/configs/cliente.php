<html> 
<body> 

<form method="get" action="cliente.php"> 
ID categoria: <input name="symbol" type="text" value=""> 
<br> 
<br> 
<input type="submit"> 
</form> 

<?php 
$symbol = 0;
if(isset($_GET['symbol'])){
	$symbol = $_GET['symbol'];
}; 
if ($symbol){ 
   require_once('../../lib/nusoap.php'); 
   $c = new nusoap_client('http://localhost/webrilhar/sys/configs/server.wsdl',true); 
   $stockprice = $c->call('getStockQuote', 
          array('symbol' => $symbol)); 
   echo "Código categoria: $symbol (Nome da categoria == $stockprice.)"; 
} 
?> 
</body> 
</html> 
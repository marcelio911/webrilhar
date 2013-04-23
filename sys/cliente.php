<?php
require_once ('lib/nusoap.php');

$wsdl = 'http://localhost/webrilhar/sys/server.php?wsdl';
$cliente = new SoapClient($wsdl);
print "<p>Categorias: ";
var_dump($cliente->__getFunctions());
$vem = $cliente->__call('getCategorias', array());
print $vem;
print "</p>";


	$r = $vem;
	$count = count($r);
	?>
    <table border="1">
    <tr>
    	<th>Code</th>
    	<th>Nome</th>               
    </tr>
    <?php
    for($i=0;$i<=$count-1;$i++){
	?>
    <tr>
    	<td><?php echo $r[$i]['cd_categoria']?></td>
    	<td><?php echo $r[$i]['nm_categoria']?></td>
    </tr>
    <?php
	}
	?>
    </table>

</body> 
</html> 
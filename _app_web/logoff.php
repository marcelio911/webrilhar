<?php
/*
 Autor: Marcélio de Oliveira Santana
 e-mail: marcelio911@gmail.com
*/
$sessao = session_start(); 
if(isset($_SESSION['status'])){
	//echo "Status: ".$_SESSION['status'];	
}else{
	$_SESSION['status'] = 'saiu_0*aa1cefd1bc2b77c79703e225608b027e';
	//echo "Status:". $_SESSION['status'];
}
 ?>
<div id="content">
	<?php
	if ($_SESSION['status'] == 'entrou_1*3cd1554971518688d7198911778c72a0'){
		session_unset();//Aqui destruimos a sessão;
		echo "Logoff efetuado com sucesso, aguarde que você será redirecionado a página inicial.";
		$_SESSION['status'] = 'saiu_1*019cf56650ca9e96a2540866bf5caf71'; //Aqui que efetuamos o "logoff";
		$sessao = session_destroy();
		echo '<script>history.go(-1);</script>';
	}else{
		echo '<script>history.go(-1);</script>';
	}
	
	
	
	?>
</div>

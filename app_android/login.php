<?php
require('cabecalho.php'); 
function __autoload($class_name){
	require_once 'class/sec/Logon.php';
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$login = $_POST["log"];
		/* 
		 * atribuindo valor que foi digitado
		 * no campo com o name="login" no formul�rio cadastro.php
		 * Os outros � a mesma coisa, s� muda os campos daonde eles est�o pegando os
		 * valores, o campo sempre vai ter o mesmo nome no arquivo cadastro.php  
		 * que o nome $_POST["que_estiver_aqui"]
		*/
		$pass = $_POST["pwd"];


	//aqui instanciamos um objeto da classe logon e atribuimos sua referencia a $logon
	$Logon = new Logon();
	//executamos o metodo validarLogin() para verificar se o usuario e a senha batem
	//se ambos confirmarem � obtido true sen�o false;
	if ($Logon->validarLogin($login, $pass)){
		//Atribuimos o valor 1 para a variavel de sess�o status( usada para verificar se o usuario
		//est� ou n�o logado no sistema;
		$_SESSION['status'] = 'entrou_1*3cd1554971518688d7198911778c72a0';
		//Atribuimos o login do usuario a uma variavel de sess�o login
		$_SESSION['login'] = $login;	
		
		//echo "Login efetuado com sucesso, aguarde que voc� ser� redirecionado a p�gina inicial: ".$_SESSION['cddousuario']."</div>";
		echo '<script>history.go(-2);</script>';
	}else{
		echo "<div id='conteudo'>Falha na valida��o das informa��es:";
		echo '<div id="mensagem">Ops! Parece que seu login/senha est�o errados ou podem ter sidos digitados incorretamente.</div>';
		echo '<br>';
		echo '<br>';
		echo '<br>';
		echo '<br>';
		echo '<a href="javascript:void(0)" onclick="history.go(-1)">Por favor, tente Novamente!</a></div>';
	}

		//Destruimos o conteudo (A instancia do objeto);
		$Logon->__destruct();
		unset($Logon);
		//Apagamos a referencia;
		$Logon = null;
		//fecha a conex�o aberta com o MySql
			
}//Method POST validacao	
	?>
	
<?php
		if($_SESSION['status'] == 'saiu_0*aa1cefd1bc2b77c79703e225608b027e'){	
	?>
	<div id="conteudo">
		<div id="logon">			
			<form action="login.php" id="login" method="post">
				<input type="hidden" name="redirect_to" value="/">
				<label for="log">Login</label>
				<input type="text" name="log" id="log" class="text">
				<br>
				<label for="pwd">Senha</label>
				<input type="password" name="pwd" id="pwd" class="text">
				<br>
				<input type="submit" value="Entrar" style="margin-right:4px" class="btn btn-primary btn-large button">
			</form>
		</div>
	</div>
	<?php }//termina de validar o usu�rio logado ?>
		

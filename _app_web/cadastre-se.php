<?php
 
//inclui o cabeçalho da página
	include_once('cabecalho.php');	
				
?>

<div id="containerprincipal">
<!-- barra lateral -->
	<?php
		function __autoload($class_name){
			require_once 'class/entidades/Cadastros.inc.php';
		}
		$cad_nome = "";
		$cad_endereco = "";
		$cad_telefone = "";
		$cad_datadenascimento = "";			
		$cad_email = "";
		$cad_dia = "";
		$cad_mes = "";
		if ($_SERVER["REQUEST_METHOD"] == "POST") {
			//inclui a barra_vertical de menu esquerdo
			$cad_nome = $_POST["nome"];
			$cad_endereco = $_POST["endereco"];
			$cad_telefone = $_POST["telefone"];
			$cad_datadenascimento = $_POST["datanascimento"];			
			$cad_email = $_POST["email"];
			$cad_dia = $_POST["dia"];
			$cad_mes = $_POST["mes"];
			
			//aqui instanciamos um objeto da classe Leitura e atribuimos sua referencia a $leitura
			$escrita = new Cadastros();
			//executamos o metodo validarLogin() para verificar se o usuario e a senha batem
			//se ambos confirmarem é obtido true senão false;
			
		}
		
    ?>
	
	
    
    <div id="conteudo">
		<legend>Cadastre-se e aproveite nossas ofertas!</legend>
		<span><a href="#">Por que é importante ter um cadastro do seu usuário no nosso site?</a></span>
		
		<?php
			if ($_SERVER["REQUEST_METHOD"] == "POST") {
				if ($escrita->cadastrarCliente($cad_nome, $cad_endereco,$cad_telefone,$cad_datadenascimento,$cad_email, $cad_dia, $cad_mes)){
					
					 $novocliente = mysql_query("SELECT cd_cliente FROM cliente ORDER BY cd_cliente DESC LIMIT 1");
					 	while ($coluna = mysql_fetch_array($novocliente)) {
							$c0d_cliente = $coluna['cd_cliente'];
						}
						//envia e-mail para o usuário cadastrado
						$to = $cad_email;
						$subject = "";
						$message = "";
						$from = "";
						$headers = "De: " . $from;
						if(mail($to,$subject,$message,$headers)){
							echo '<div id="mensagem">Verifique seu endereço de e-mail e confirme seu cadastro.</div>';
						}else{
							echo '<div id="mensagem">E-mail não pode ser enviado.</div>';
						}				 
					//echo "<script>history.go(-2);</script>";
					//header('location: http://www.brilharfolheados.art.br/index.php');
					echo "<div id='mensagem'>Cadastro realizado com sucesso! </div>";
				}else{
					echo "<div id='mensagem'>Ops! Seu cadastro não pode realizado, verifique se você não já se cadastrou anteriormente</div>";
					
					//header('location: http://www.brilharfolheados.art.br/index.php');
				}
			}
			include('forms/clientes.php');
		?>
    
	</div>


	        

              
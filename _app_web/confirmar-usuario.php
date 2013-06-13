<?php
 
//inclui o cabeçalho da página
	include_once('cabecalho.php');
		$id_cliente = mysql_escape_string($_GET['use']);
	
?>

<div id="containerprincipal">
<!-- barra lateral -->
	<?php
		function __autoload($class_name){
			require_once 'class/sec/Confirmacao.inc.php';
		}
		if ($_SERVER["REQUEST_METHOD"] == "POST") {
			//inclui a barra_vertical de menu esquerdo
			$cad_usuario = $_POST["log"];
			$cad_pass = $_POST["pwd"];
			$codigo_cliente = $_POST["usecd"];
			//aqui instanciamos um objeto da classe Leitura e atribuimos sua referencia a $leitura
			$confirma = new Confirma();
			//executamos o metodo validarLogin() para verificar se o usuario e a senha batem
			//se ambos confirmarem é obtido true senão false;
			
		}
		
    ?>
    <div id="conteudo">
		
		<?php 
		  
			if ($_SERVER["REQUEST_METHOD"] == "POST") {	
				$sql_ =  "SELECT Cliente_cd_cliente FROM login WHERE Cliente_cd_cliente=".$codigo_cliente."";
				$query1 = mysql_query($sql_);
				while ($coluna = mysql_fetch_array($query1)){  
				 $cd = $coluna['Cliente_cd_cliente'];
				}if ($cd != $codigo_cliente){ 	    
					if ($confirma->cadastrarUsuario($cad_usuario, $cad_pass, $codigo_cliente)){
						echo "<div id='mensagem'>Cadastro do usuário realizado com sucesso!</div>";
					}else{
						echo "<div id='mensagem'>Não foi possível realizar o cadastro do seu usuário!</div>";
					}
				}else
					echo "<div id='mensagem'>Usuário já está cadastro!</div>";
			}
			//include('systemais/cadastros/clientes.php');
		?>
		<div class="formulario" style="">			
			<?php 
			  if ($_SERVER["REQUEST_METHOD"] != "POST") {
				$sql =  "SELECT nm_cliente FROM cliente WHERE cd_cliente=".$id_cliente."";
				$query = mysql_query($sql);
				$nome = "";
				$row = mysql_fetch_array($query, MYSQL_NUM);
				while ($coluna = mysql_fetch_array($query)){  
				 $nome = $coluna['nm_cliente'];
				}	
				if ($row != NULL){
					echo '<div id="mensagem"><h4>Obrigado! Por confirmar seu e-mail: '.$nome.'</h4></div>';
					echo '<form action="confirmar-usuarios.php" id="login" method="post">';
				}else{
					echo '<div id="mensagem"><h4>Por favor, faça seu cadastro novamente ou entre em contato com nosso atendimento:</h4></div>';
					echo '<form action="confirmar-usuarios.php" id="login" method="post" style="display:none">';
				}
			 
			?>
			
			 <legend>Cadastre seu usuário/senha</legend>			 
				<label for="log">Login</label>
				<input type="text" name="log" id="log" class="text">
				<br>
				<label for="pwd">Senha</label>
				<input type="password" name="pwd" id="pwd" class="text">
				<label for="pwd">Confirme a senha</label>
				<input type="password" name="pwd2" id="pwd" class="text">
				<input type="hidden" name="usecd" value="<?php echo $id_cliente ?>">
				<br>
				<input type="submit" value="Cadastrar" class="m-btn blue">
			</form>
		 <?php } ?>
        </div>
	</div>


		

                    
<?php                  
  //destaques de ultimos produtos da página inicial
		include_once('destaques.php');

	//inclui o rodapé da página
	include_once('rodape.php');
	
	
?>                  

                    

              
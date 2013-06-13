<div id="conteudo">
<!-- barra lateral -->
	<?php
		function __autoload($class_name){
			require_once '../class/entidades/Contatos.inc.php';
		}
		$cad_nome = "";
		$cad_mensagem = "";
		$cad_telefone = "";
		$cad_email = "";
		if ($_SERVER["REQUEST_METHOD"] == "POST") {
			//inclui a barra_vertical de menu esquerdo
			$cad_nome = $_POST["nome"];
			$cad_mensagem = $_POST["corpodamensagem"];
			$cad_telefone = $_POST["telefone"];
			$cad_email = $_POST["email"];
			
			//aqui instanciamos um objeto da classe Leitura e atribuimos sua referencia a $leitura
			$send = new Contatos();
			//executamos o metodo validarLogin() para verificar se o usuario e a senha batem
			//se ambos confirmarem é obtido true senão false;			
		}		
    ?>    
    <div id="conteudointerno" style="height:900px; width:770px;  padding-top:30px; padding-left:30px" >
		<legend>Fale Conosco!</legend>
		<?php
			if ($_SERVER["REQUEST_METHOD"] == "POST") {
				if ($send->faleconosco($cad_nome,$cad_mensagem, $cad_telefone,$cad_email)){
					echo "<div id='mensagem'>E-mail enviado com sucesso!</div>";
				}else{
					echo "<div id='mensagem'>Ops! Seu e-mail não pode ser enviado</div>";
				}
			}
			include('../forms/faleconosco.php');
		?>
		<span><a href="#">Surgiu alguma dúvida? Envie um e-mail, para nosso atendimento!</a></span>
	</div>
</div>                 

              
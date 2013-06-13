<?php
//require("cabecalho.php");
//echo "<div id='conteudo'>";
//if($_SESSION['status'] == 'entrou_1*3cd1554971518688d7198911778c72a0'){

	$pass=""; 
	if (isset($_POST["getProdutoCat"])){
		$prod = mysql_escape_string($_POST["getProdutoCat"]);
		require('class/entidades/Produtos.inc.php');
		$produtos = new Produtos;
		$array = $produtos->getProdutos($prod);
		print_r(array_values($array));
	}
	if (isset($_POST["getCat"])){
		require('class/entidades/Categorias.inc.php');
		$cat = mysql_escape_string($_POST["getCat"]);	
		$categorias = new Categorias;
		$array = $categorias->getProdutos($cat);
		print_r(array_values($array));
	}
	if (isset($_POST["getFem"])){
		$fem = mysql_escape_string($_POST["getFem"]);
		require('class/entidades/Produtos.inc.php');
		$feminino = new Produtos;
		$array = $feminino->getProdutosFem();
		print_r(array_values($array));
	}
	if (isset($_POST["getMasc"])){
		$masc = mysql_escape_string($_POST["getMasc"]);
		require('class/entidades/Produtos.inc.php');
		$masculino = new Produtos;
		$array = $masculino->getProdutosMasc();
		print_r(array_values($array));
	}
	echo '<br>';
	echo '<br><span>Set o código do produto para retornar o array iniciando em 1</span><br><labe>Produto:</label><form method="post" action=""><input name="getProdutoCat"><input type="submit" value="ok"/></form><br>';
	echo '<br><span>Set o código da categoria para retornar o array iniciando em 1</span><br><labe>Categorias:</label><form method="post" action=""><input name="getCat"><input type="submit" value="ok"/></form><br>';
?>
	<br>
	<span>Set 1 retornar o array de produtos femininos</span><br>
	<span>Set 0 retornar o array de produtos masculinos</span><br>
	<label>Sexo: </label>
	<form action="" method="post">
		Femino: <input id="fem" type="radio" onclick="sexo()" name="fem"> 
		Masculino: <input id="masc" type="radio" onclick="sexo()">
	</form>
	<form action="" id="form1" method="post">
		<input type="hidden" name="getFem" id="getFem"/>
	</form>
	<form action="" id="form2" method="post">
		<input type="hidden" name="getMasc" id="getMasc"/>
	</form><br>
<?php
//}
echo "<script>
		function sexo(){
			if(document.getElementById('masc').checked == true){
				document.getElementById('getMasc').value = 0;
				document.getElementById('fem').checked = false;
				fem = 'off';
				$('#form2').submit();
			}
			if(document.getElementById('fem').checked == true){
				document.getElementById('getFem').value = 1;
				document.getElementById('masc').checked = false;
				masc = 'off';
				$('#form1').submit();
			}
		}
	  </script>";
//echo "</div>";
//echo "</div>";
?>
<?php include('rodape.php');?>
<?php
require("cabecalho.php");
echo "<div id='conteudo'>";
if($_SESSION['status'] == 1){	
	$pass=""; 
	if (isset($_GET['prod'])){
		$prod = mysql_escape_string($_GET['prod']);
		require('class/entidades/Produtos.inc.php');
		$produtos = new Produtos;
		$array = $produtos->getProdutos($prod);
		print_r(array_values($array));
	}
	if (isset($_GET['cat'])){
		require('class/entidades/Categorias.inc.php');
		$cat = mysql_escape_string($_GET['cat']);	
		$categorias = new Categorias;
		$array = $categorias->getProdutos($cat);
		print_r(array_values($array));
	}
	if (isset($_GET['infem'])){
		$fem = mysql_escape_string($_GET['infem']);
		require('class/entidades/Femininos.inc.php');
		$feminino = new Femininos;
		$array = $feminino->getProdutosFem($fem);
		print_r(array_values($array));
	}
	if (isset($_GET['inmasc'])){
		$masc = mysql_escape_string($_GET['inmasc']);
		require('class/entidades/Masculinos.inc.php');
		$masculino = new Masculinos;
		$array = $masculino->getProdutosMasc($masc);
		print_r(array_values($array));
	}
	echo '<br>';
	echo '<br><span>Set o código do produto para retornar o array iniciando em 1</span><br><labe>Produto:</label><form action=""><input name="prod"><input type="submit" value="ok"/></form><br>';
	echo '<br><span>Set o código da categoria para retornar o array iniciando em 1</span><br><labe>Categorias:</label><form action=""><input name="cat"><input type="submit" value="ok"/></form><br>';
?>
	<br>
	<span>Set 1 retornar o array de produtos femininos</span><br>
	<span>Set 0 retornar o array de produtos masculinos</span><br>
	<label>Sexo: </label>
	<form action="">
		Femino: <input id="fem" type="radio" onclick="sexo()" name="fem"> 
		Masculino: <input id="masc" type="radio" onclick="sexo()">
	</form>
	<form action="" id="form1">
		<input type="hidden" name="infem" id="infem"/>
	</form>
	<form action="" id="form2">
		<input type="hidden" name="inmasc" id="inmasc"/>
	</form><br>
<?php
}
echo "<script>
		function sexo(){
			if(document.getElementById('masc').checked == true){
				document.getElementById('inmasc').value = 0;
				document.getElementById('fem').checked = false;
				fem = 'off';
				$('#form2').submit();
			}
			if(document.getElementById('fem').checked == true){
				document.getElementById('infem').value = 1;
				document.getElementById('masc').checked = false;
				masc = 'off';
				$('#form1').submit();
			}
		}
	  </script>";
echo "</div>";
echo "</div>";
?>
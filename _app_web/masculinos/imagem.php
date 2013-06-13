<?php
require_once ("../class/entidades/Produtos.inc.php");
$produtos = new Produtos();

	$sql = $produtos->queryiMasculinos();   
	while ($row = mysqli_fetch_row($sql)) {      
	   $id_imagem    = $row[0];                         
	   $bytes = $row[1];                         
	   $tipo  = $row[2];
	   $thumb = $row[3];
	   $nome = $row[4];
	   $descricao = $row[5];
	   $id_produto = $row[6];
	     echo	'<div class="listaEstoque">
					<a href="../produtos/produtoselec.php?cod='.$id_produto.'">
						<img class="imgEstoque" src="gera-thumb.php?id='.$id_imagem.'"/> 
						<ul class="info">
							<li class="imgTitulo">'.$nome.'</li>
							<li class="imgDescricao">'.$descricao.'</li>
						</ul>
					</a>
					<form style="text-align: center;" action="../produtos/produtoselec.php?cod='.$id_produto.'" method="post"> 
						<input align="center" type="submit" class="btn comprar" value="Visualizar"></input>
					</form>
				</div>';
	}

?>
<?php
require_once ("../class/entidades/Produtos.inc.php");
$produtos = new Produtos();
	$sql = $produtos->queryiImagens();   
	while ($row = mysqli_fetch_row($sql)) {      
	   $id_imagem    = $row[0];                         
	   $bytes = $row[1];                         
	   $tipo  = $row[2];
	   $thumb = $row[3];
	   $nome = $row[4];
	   $descricao = $row[5];
	   $id_produto = $row[6];
	      echo	'<div>
					<a href="../produtos/produtoselec.php?cod='.$id_produto.'">
						<img align="left" src="gera-thumb.php?id='.$id_imagem.'" width="130px" height="130px"/>  						
						<h2>'.$nome.'</h2>
						<strong>Descrição:</strong>
						<p class="descricao">
							'.$descricao.'
						</p>
						DE: <del>R$43,00</del>&nbsp;&nbsp; <span class="preco">POR: R$ 20,00</span>
						<h1 class="lupa">lupa</h1>
					</a>
				</div>';
	}

?>
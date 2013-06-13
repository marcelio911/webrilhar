<?php
require_once ("../class/entidades/Produtos.inc.php");
$produtos = new Produtos();

if (isset($_GET['codigo'])){
$cod = mysql_real_escape_string($_GET['codigo']);
	
	$sql = $produtos->queryiProdutos($cod);
	
	while ($row = mysqli_fetch_row($sql)) {      
	   $id    = $row[0];                         
	   $bytes = $row[1];                         
	   $tipo  = $row[2];
	   $thumb = $row[3];
	   $nome = $row[4];
	   $descricao = $row[5];
	   echo	'<li>
					<a href="produtoselec.php?cod='.$id.'">
						<img src="gera-thumb.php?id='.$id.'" width="130" height="130"/> 
						<h1 class="lupa">lupa</h1>
						<h2>'.$nome.'</h2>
						<strong>Descrição:</strong>
						<span class="descricao">
							'.$descricao.'
						</span>
						<del></del>
						<span class="preco">R$ 20,00</span>
					</a>
				</li>';
	}
}
?>
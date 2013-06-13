<?php
include('../cabecalho-int.php');

if (isset($_GET['cod'])){
$cod = mysql_real_escape_string($_GET['cod']);
	require_once ("../class/entidades/Produtos.inc.php");
	$produtos = new Produtos();
	$sql = $produtos->queryiProdutos($cod);
	$sqlimagem = $produtos->queryiProdutosImagens($cod);
	$sqlthumb = $produtos->queryiProdutosImagens($cod);
	
	echo '<div id="conteudo">
		  <link media="all" href="../css/lateral.css" rel="stylesheet" type="text/css">';
	include('../index-lateral.php');	
	include('PagSeguroLibrary/PagSeguroLibrary.php');
	while($row = mysqli_fetch_row($sql)){
	$id    = $row[0];   	
	$nome = $row[1];
	$descricao = $row[2];
		echo' <div id="exibirProduto">
				<legend style="line-height: 30px;">'.$nome.'</legend>
				<div id="wrapper">
					<div class="caroufredsel_wrapper">
						<div id="carousel">';							
							while ($row = mysqli_fetch_row($sqlimagem)) {      
							   $id_imagem    = $row[0];                         
							   $bytes = $row[1];                         
							   $tipo  = $row[2];
							   $thumb = $row[3];
							   $nome_imagem = $row[4];
							   $descricao_imagem = $row[5];	   
								echo ('<img width="600px" height="400px" alt="'.$descricao_imagem.'" src="gera-imagem.php?id='.$id_imagem.'"/>');
							}//fim do laço imagem
						
				echo '</div><!--carousel-->
					</div><!--carrousel_wrapper-->
					<div class="caroufredsel_wrapper">
						<div id="thumbnails">';
						while ($row = mysqli_fetch_row($sqlthumb)) {      
							   $id_imagem    = $row[0];                         
							   $bytes = $row[1];                         
							   $tipo  = $row[2];
							   $thumb = $row[3];
							   $nome_imagem = $row[4];
							   $descricao_imagem = $row[5];	   
								echo	'<img src="gera-thumb.php?id='.$id_imagem.'"/>';
							}//fim do laço imagem
							
				echo'		</div><!--thumbnails-->
					</div><!--caroufredsel_wrapper-->
				</div><!--wrapper-->
							
										
								<div id="caracteristica">
									<legend style="line-height: 30px;">Caracteristicas gerais do produto</legend>
										<strong>Descrição:</strong>
										<p>
										<span class="descricao">
											'.$descricao_imagem.'
										</span>
										</p><p>
										<b>De:</b> <del>R$ 30,00</del>
										</p><p>
										<b>Por:</b> <span class="preco">R$ 20,00</span>
										</p>	
								</div>
								<div id="garantia">
										<legend style="line-height: 30px;">Termos de garantia das nossas peças.</legend>';
										 $query = $produtos->query("select termos_garantia from sistema");
										 $row = mysql_fetch_row($query);
										 $garantia = $row[0];
											echo $garantia;
										
							echo'</div>
							<img src="https://p.simg.uol.com.br/out/pagseguro/i/banners/parcelamento/468x60_pagseguro_2x.gif" alt="Parcelamos tudo em até 2x sem acréscimo" width="700px" height="250px" />
						</div>';
						}//fim do laço produto
	echo'</div>';
}
include('../rodape-int.php');
?>
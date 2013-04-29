<?php 
	$sessao = session_start(); 
	if(isset($_SESSION['status'])){
		//echo "Status: ".$_SESSION['status'];	
	}else{
		$_SESSION['status'] = 'saiu_0*aa1cefd1bc2b77c79703e225608b027e';
		//echo "Status:". $_SESSION['status'];
	}
?><!DOCTYPE html>
<head>
<link href="css/bootstrap.css" rel="stylesheet" type="text/css" media="all">
<link href="css/estilo.css" type="text/css" media="all" rel="stylesheet"/>
<!--[if gte IE 8]>
		<link href="css/ie8.css" rel="stylesheet" type="text/css" media="all">
		<link rel="stylesheet" href="html5/css/main.css" type="text/css" />
		<script type="text/javascript" src="html5/js/CreateHTML5Elements.js"></script>
<![endif]-->		
<!--[if IE 7]>
	<link href="css/ie7.css" rel="stylesheet" type="text/css" media="all">
	<link rel="stylesheet" href="html5/css/main.css" type="text/css" />
	<script type="text/javascript" src="html5/js/CreateHTML5Elements.js"></script>
<![endif]-->
<meta http-equiv="cache-control" content="Accept-Encoding">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="description" content="">
<meta name="viewport" content="width=device-width">
</head>
<body class="inicial">
<div id="cabecalho">
	<div class="logo"><img src="img/logo.png" width="160px" height="60px" /></div>	
		<div id="user">				
				<?php 
				//Aqui utilizamos a variavel de sessao status para testar se o usuario está logado no sistema ou não, para
				if($_SESSION['status'] == 'entrou_1*3cd1554971518688d7198911778c72a0'){					 
				echo '<span id="identificacao" name="identificacao">Bem vindo: '.$_SESSION['login'].' <a href="logoff.php" title="Sair">Sair</a></span><br>';
				}else{
					echo '<span id="identificacao" name="identificacao">Novo usuário? <a href="cadastre-se.php">Cadastre-se</a></span>';
				}?>		
		<?php 
			$meses = array (1 => "Janeiro", 2 => "Fevereiro", 3 => "Março", 4 => "Abril", 5 => "Maio", 6 => "Junho", 7 => "Julho", 8 => "Agosto", 9 => "Setembro", 10 => "Outubro", 11 => "Novembro", 12 => "Dezembro");
			$diasdasemana = array (1 => "Segunda-Feira",2 => "Terça-Feira",3 => "Quarta-Feira",4 => "Quinta-Feira",5 => "Sexta-Feira",6 => "Sábado",0 => "Domingo");
			$hoje = getdate();
			$dia = $hoje["mday"];
			$mes = $hoje["mon"];
			$nomemes = $meses[$mes];
			$ano = $hoje["year"];
			date_default_timezone_set('Brazil/East');
			$hora = date('H:i');
			$diadasemana = $hoje["wday"];
			$nomediadasemana = $diasdasemana[$diadasemana];
		?><span id="DataCompleta" name="DataCompleta" class="first"><?php echo "$nomediadasemana, $dia de $nomemes de $ano às $hora"; ?></span>
		</div><!-- #user -->		
</div><!-- #cabecalho -->
<br><br><br>
<div id="top">
	<div id="conteudo-cabecalho"><?php if($_SESSION['status'] == 'saiu_0*aa1cefd1bc2b77c79703e225608b027e'){ ?>
		<div id="bemvindo">
			<a href="login.php" onclick="">LOGIN</a> |				
					<a href="cadastre-se.php">CADASTRE-SE</a>				
		</div><?php }else{ ?>
		<div id="bemvindo">
			<ul class="menu">
				<li><a href="index.php">Início</a></li>
				<li class="linha"><a href="produtos">Produtos</a>
					<ul class="segundo">
						<li><a href="#" title="">Anéis</a></li>
						<li><a href="#" title="">Brincos</a></li>
						<li><a href="#" title="">Colares</a></li>
						<li><a href="#" title="">Correntes Masc.</a></li>
						<li><a href="#" title="">Gargantilhas</a></li>
						<li><a href="#" title="">Kits/Conjuntos</a></li>
						<li><a href="#" title="">Pulseiras</a></li>
						<li><a href="#" title="">Tornozeleiras</a></li>
					</ul>
				</li>
				<li class="linha"><a href="#">Femininos</a></li>
				<li class="linha"><a href="#">Masculinos</a></li>
				<li class="linha"><a href="contatos">Contatos</a></li>
			</ul>
		</div>
		<div id="cart">
			 <div id="txt-carrinho"><strong>Cesta de Produtos: </strong><span id="cart-total">0 Itens(s) -  <strong>R$ 0,00</strong></span></div>
				<a href="#" title="Efetuar Compra" onclick=""><div id="btn-finalizar">Efetuar Compra</div></a>
		</div>
	<?php } ?>
	</div>
</div>
<br>
<div id="all_pagina">

	

<!DOCTYPE html>
<head>
	<link href="css/estilo.css" type="text/css" media="all" rel="stylesheet"/>
	<script src="js/jquery.min.js"></script>
	<script src="js/bootstrap.min.js" type="text/javascript"></script>
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css" media="all">
	<meta http-equiv="pragma" content="no-cache, no-store">
	<meta http-equiv="cache-control" content="no-cache, no-store">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width">
	<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
 	<![endif]-->
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
<body class="">
<?php 
	$sessao = session_start(); 
	if(isset($_SESSION['status'])){
		//echo "Status: ".$_SESSION['status'];	
	}else{
		$_SESSION['status'] = 'saiu_0*aa1cefd1bc2b77c79703e225608b027e';
		//echo "Status:". $_SESSION['status'];
	}
?>
<div id="cabecalho">
	<div style="margin:0 auto; width:1000px">
		<h1 class="logo">
				<a href="index2.php">logo</a>
		</h1>		
		<div id="user">	
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
			?>	
			<span id="DataCompleta" name="DataCompleta" class="first">
				<?php echo "$nomediadasemana, $dia de $nomemes às $hora"; ?>
			</span>			
			<?php 
				//Aqui utilizamos a variavel de sessao status para testar se o usuario está logado no sistema ou não, para
				if($_SESSION['status'] == 'entrou_1*3cd1554971518688d7198911778c72a0'){	
				echo '<span id="identificacao" name="identificacao"> <br> <b>Bem vindo: </b>'.$_SESSION['login'].'<a href="logoff.php" title="Sair"><div style="float:right" class="btn-custom">Sair</div></a></span> ';
				}else{
					echo '<span id="identificacao" name="identificacao">Novo usuário? <a href="cadastre-se.php">Cadastre-se</a></span>';
				}
			?>		
			
			
		</div><!-- #user -->
	</div>
</div><!-- #cabecalho -->
<br><br>
<div id="top">
	<div id="conteudo-cabecalho"><?php if($_SESSION['status'] == 'saiu_0*aa1cefd1bc2b77c79703e225608b027e'){ ?>
		<div id="bemvindo">
			<a href="login.php" onclick="">LOGIN</a>			
		</div><?php } ?>
		<div id="bemvindo">
			<ul class="menu">
				<li><a href="index2.php">Início</a></li>
				<li class="linha"><a href="produtos">Peças</a>
					<ul class="segundo">
						<li><a href="categorias/index.php?id=3" title="">Anel</a></li>
						<li><a href="categorias/index.php?id=1" title="">Brincos</a></li>
						<li><a href="categorias/index.php?id=2" title="">Colar</a></li>
						<li><a href="categorias/index.php?id=6" title="">Corrente</a></li>
						<li><a href="categorias/index.php?id=8" title="">Gargantilha</a></li>
						<li><a href="categorias/index.php?id=7" title="">KIT - Conjunto</a></li>
						<li><a href="categorias/index.php?id=5" title="">Pulseira</a></li>
						<li><a href="categorias/index.php?id=9" title="">Religioso</a></li>
						<li><a href="categorias/index.php?id=4" title="">Tornozeleira</a></li>
					</ul>
				</li>
				<li class="linha"><a href="femininos">Femininos</a></li>
				<li class="linha"><a href="masculinos">Masculinos</a></li>
				<li class="linha"><a href="contatos">Contatos</a></li>
			</ul>
		</div>
		
		<div id="cart">
			<h1 class="logo" ><a style="margin-left: -170px; margin-top: -22px;" href="../index2.php">logo></a></h1>
			 <div id="txt-carrinho"><strong>Cesta: </strong><span id="cart-total">0 Itens(s) -  <strong>R$ 0,00</strong></span></div>
				<a href="#" title="Efetuar Compra" onclick=""><div class="btn-custom">Efetuar Compra</div></a>
		</div>
	</div>
</div>
<br>
<div id="pagina">

	

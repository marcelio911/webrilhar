<?php include('cabecalho.php');?>
<div id="conteudo">
<legend>Versão de testes para Pagamento On-line</legend>
	<form action="https://www.moip.com.br/PagamentoMoIP.do" method="post">
		<!--input name="id_carteira" type="hidden" value="vendabrilhar@gmail.com"/><OBRIGATÓRIO-->
		<label>Valor: >Numérico: inteiro(9) <OBRIGATÓRIO></label>
		<input name="valor" type="text" value="10000"/> Ex: R$ 20099 = R$ 200,99 não usaremos , ou . para limitar o valor
		<label>Razão do pagamento: > Alfanumérico(64)<OBRIGATÓRIO> </label>
		<input name="nome" type="text" value=""/>
		<label>Descrição do pagamento: > (não obrigatório) Alfanumérico(256)</label>
		<textarea name="descricao" type="text" value=""></textarea>
		<label>ID Transação: > (não obrigatório) Alfanumérico(32)</label>
		<input name="id_transacao" type="text" value=""/>	
		<label>Frete: > numérico(1)</label>Se o pagamento deve ter um frete adicionado ao valor total a ser pago
		1 -> adiciona frete ao pagamento<br>
		<input name="frete" type="text" value=""/>
	
		<!--label>Tipo de pagamento: ></label>
		<select name="tipo_pagamento">
			<option value="CartaoDeCredito">Débito em conta</option>
			<option value="BoletoBancario">Boleto Bancário</option>
			<option value="CartaoDeDebito">Cartão de Débito</option>
			<option value="CartaoDeCredito">Cartão de crédito</option>
			<option value="CarteiraMoIP">Carteira MoIP</option>
		</select-->
		<br>
		<strong>Informações do Cliente</strong>
		
		<label>Logradouro: > Alfanumérico(45)</label>
		<input name="pagador_telefone" type="text" value=""/>
		
		<label>nº: > numérico(9)</label>
		<input name="pagador_numero" type="text" value=""/>
		
		<label>Complemento: > Alfanumérico(45)</label>
		<input name="pagador_complemento" type="text" value=""/>
		
		<label>Telefone: > numérico(10)</label>		
		<input name="pagador_telefone" type="text" value=""/>
		
		<label>E-mail: > Alfanumérico(45)</label>
		<input name="pagador_email" type="text" value=""/>
		<br>
		<input type="submit" value="Pagar" class="btn btn-primary btn-large" />
	</form>
</div>
<?php include('rodape.php');

<?php
	header('Content-Type: text/html; charset=ISO-8859-1');
?>
<div id="formulario">
	<form method="post" action="cadastre-se.php" id="conForm">
		<label>Usuário:</label>
		<input type="text" class="m-wrap" onkeypress="this.form.submit();" onkeyup="this.form.submit();" onkeydown="this.form.submit();"  placeholder="Digite nome" required="required"  name="nome"  title="Digite seu nome"/>
		<label>Senha:</label>
		<input type="text" class="m-wrap fld534" placeholder="Digite a senha" name="senha"   >							
		<label>Confirme sua senha:</label>
		<input type="text" class="m-wrap" placeholder="Confirme novamente sua senha" onkeypress="this.form.submit();" onkeyup="this.form.submit();" onkeydown="this.form.submit();"name="confirme" id="confirme" maxlength="14" class="fld241-green" />
		<span class="req">* Campos requeridos</span>
		<br/>
		<button type="submit" name="upload" class="m-btn green rnd" value="Cadastrar" >Cadastrar</button>
	</form>
</div>
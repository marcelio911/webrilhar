<div id="formulario">
	<form method="post" action="" id="conForm">
		<label>Nome</label>
		<input type="text" class="m-wrap" value="<?php echo $cad_nome ;?>" placeholder="Digite nome" required="required"  name="nome"  title="Digite seu nome"/>
		<span class="req">*</span>
		<label>Digite o e-mail:</label>
		<input type="text" class="m-wrap fld534" placeholder="Digite e-mail" required="required" value="<?php echo $cad_email ;?>" name="email" />
		<span class="req">*</span>
		<label>Telefone</label>  
		<input type="text" class="m-wrap" placeholder="Digite telefone" value="<?php echo $cad_telefone ;?>" name="telefone" id="tel" maxlength="14" onkeydown="Mascara(this,Telefone);" onkeypress="Mascara(this,Telefone);" onkeyup="Mascara(this,Telefone);" />
		<label>Mensagem:</label>
		<textarea type="text" class="m-wrap" style="width:600px; height:300px" name="corpodamensagem" id="corpodamensagem" placeholder="Digite a mensagem" value="<?php echo $cad_mensagem ;?>" required="required" maxlength="340"></textarea>
		<span class="req">*</span>
		<br/><span class="req">Campos com o(*) são obrigatórios</span>
		<br/>
		<button type="submit" name="upload" class="btn btn-primary btn-large" value="Enviar" >Enviar</button>
	</form>
</div>
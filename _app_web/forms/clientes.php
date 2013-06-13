<?php
	//header('Content-Type: text/html; charset=ISO-8859-1');
?>
<div id="formulario">
	<form method="post" action="cadastre-se.php" id="conForm">
		<label>Nome</label>
		<input type="text" class="m-wrap" value="<?php echo $cad_nome ;?>" placeholder="Digite nome" required="required"  name="nome"  title="Digite seu nome"/>
		<label>Endere&ccedil;o:</label>
		<input type="text" class="m-wrap fld534" value="<?php echo $cad_endereco ;?>" required="required" placeholder="Digite endere&ccedil;o" name="endereco"   >							
		<label>Telefone</label>  
		<input type="text" class="m-wrap" placeholder="Digite telefone" value="<?php echo $cad_telefone ;?>" name="telefone" id="tel" maxlength="14" onkeydown="Mascara(this,Telefone);" onkeypress="Mascara(this,Telefone);" onkeyup="Mascara(this,Telefone);" />
		 <label>Dia do seu aniversário</label> 
		<select name="dia" id="dia">
			<option value="01">01</option>
			<option value="02">02</option>
			<option value="03">03</option>
			<option value="04">04</option>
			<option value="05">05</option>
			<option value="06">06</option>
			<option value="07">07</option>
			<option value="08">08</option>
			<option value="09">09</option>
			<option value="10">10</option>
			<option value="11">11</option>
			<option value="12">12</option>
			<option value="13">13</option>
			<option value="14">14</option>
			<option value="15">15</option>
			<option value="16">16</option>
			<option value="17">17</option>
			<option value="18">18</option>
			<option value="19">19</option>
			<option value="20">20</option>
			<option value="21">21</option>
			<option value="22">22</option>
			<option value="23">23</option>
			<option value="24">24</option>
			<option value="25">25</option>
			<option value="26">26</option>
			<option value="27">27</option>
			<option value="28">28</option>
			<option value="29">29</option>
			<option value="30">30</option>
			<option value="31">31</option>
		</select>
		<label>Mês do seu aniversário</label> 
		<select name="mes" id="mes">
			<option value="01">Janeiro</option>
			<option value="02">Fevereiro</option>
			<option value="03">Março</option>
			<option value="04">Abril</option>
			<option value="05">Maio</option>
			<option value="06">Junho</option>
			<option value="07">Julho</option>
			<option value="08">Agosto</option>
			<option value="09">Setembro</option>
			<option value="10">Outubro</option>
			<option value="11">Novembro</option>
			<option value="12">Dezembro</option>
		</select>
		<label>Data de Nascimento:</label>
		<input type="hidden" class="m-wrap" placeholder="Selecione a data de nascimento" required="required" value="<?php echo $cad_datadenascimento ;?>" id="datanascimento" maxlength="10" onkeydown="Mascara(this,Data);" onkeypress="Mascara(this,Data);" onkeyup="Mascara(this,Data);" name="datanascimento"  />
		<label>Digite o e-mail:</label>
		<input type="text" class="m-wrap fld534" placeholder="Digite e-mail" required="required" value="<?php echo $cad_email ;?>" name="email" />
		<span class="req">* Campos requeridos</span>
		<br/>
		<button type="submit" name="upload" class="btn btn-primary btn-large" value="Cadastrar" >Cadastrar</button>
	</form>
</div>
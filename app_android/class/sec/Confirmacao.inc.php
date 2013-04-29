<?php 
/*
	Autor: Marcélio de Oliveira
*/
//Classe Logon;
require("bd_.php");
class Confirma{
	//-----------------------------------------------------------------------
	//Aqui dizemos que esse atributo é private( só pode ser visto dentro da classe );
	private $banco;

	//-----------------------------------------------------------------------
	//Metodo para instanciar o objeto banco e passar a referencia do mesmo para
	//a variavel $banco e depois executa o metodo conectar() da classe Banco;
	public function Confirma(){
		$this->banco = new Banco;
		//$this->banco->conectar();
	}

	//Fim construtor
	//-----------------------------------------------------------------------
	//Metodo para procurar pelo $login e $pass na tabela e retornar true caso ache algo
	// igual( os 2 tem quer ser iguais, tanto o $login quanto o $pass ) senão false;
	public function confirmarUsuario($cdcliente){
		$cdcliente = mysql_escape_string($cdcliente);
		
		$sql = "Update login set confirmado = 1 WHERE Cliente_cd_cliente ='$cdcliente' ";
		//echo $pass.' -hash: + MySQL_NUM'.MYSQL_NUM;
		$query = $this->banco->query($sql);
		$result = mysql_query($sql);
		//apenas outra forma de chamar o metodo;
		$row = mysql_fetch_array($query, MYSQL_NUM);

		while ($coluna = mysql_fetch_array($result)){
			$this->consulta_cd = $coluna['Cliente_cd_cliente'];
		}
		
		mysql_free_result($query);
		if ($row != NULL){
			return true;
		}else{
			return false;
		}
	}
	//Fim validarlogin();
	//Metodo Destrutor para chamar o metodo da classe banco desconectar() para 
	//interromper a conexao com o banco e desalocar os atributos instanciados  
	//na classe;
    public function __destruct(){
    	//$this->banco->desconectar();
    	unset($this->banco); // destroi conteudo
    	$this->banco = null; // destroi referencia
    }
	
    //Fim metodo destrutor;
	//-----------------------------------------------------------------------
}
//Fim classe
?>
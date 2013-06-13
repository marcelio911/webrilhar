<?php 
/*
	Autor: Marcélio de Oliveira
*/
//Classe Logon;
require("bd_.php");
class Logon{
	//-----------------------------------------------------------------------
	//Aqui dizemos que esse atributo é private( só pode ser visto dentro da classe );
	private $banco;
	private $consulta_cd;
	private $consulta_nome;
	//-----------------------------------------------------------------------
	//Metodo para instanciar o objeto banco e passar a referencia do mesmo para
	//a variavel $banco e depois executa o metodo conectar() da classe Banco;
	public function logon(){
		$this->banco = new Banco;
		//$this->banco->conectar();
	}

	//Fim construtor
	//-----------------------------------------------------------------------
	//Metodo para procurar pelo $login e $pass na tabela e retornar true caso ache algo
	// igual( os 2 tem quer ser iguais, tanto o $login quanto o $pass ) senão false;
	public function validarLogin($login, $pass){
		$login = mysql_escape_string($login);
		$pass = mysql_escape_string(md5($pass));
		$sql = "SELECT Cliente_cd_cliente FROM login WHERE user_2 ='$login' AND senha='$pass' ";
		//echo $pass.' -hash: + MySQL_NUM'.MYSQL_NUM;
		$query = $this->banco->query($sql);
		$result = mysql_query($sql);
		//apenas outra forma de chamar o metodo;
		$row = mysql_fetch_array($query, MYSQL_NUM);

		while ($coluna = mysql_fetch_array($result)){
			$this->consulta_cd = $coluna['Cliente_cd_cliente'];
		}
		
		$sql_usuario = "select nm_cliente from cliente where cd_cliente = $this->consulta_cd";
		$result_usuario = mysql_query($sql_usuario);//apenas outra forma de chamar o metodo;		
		$row_usuario = mysql_fetch_array($query, MYSQL_NUM);
		
		if ($row_usuario != NULL){
			while ($coluna = mysql_fetch_array($result_usuario)){
				$this->consulta_nome = $coluna['nm_cliente'];
			}
		}//trata o resultado da consulta
		
		$_SESSION['nomedousuario'] = $this->consulta_nome;
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
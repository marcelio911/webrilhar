<?php 
/*
Marcélio de Oliveira
marcelio911@gmail.com
*/

//Classe Banco;
class Banco{
	//-----------------------------------------------------------------------
	//Aqui inicializamos os atributos( todos são privados - visto só pela classe )
	//com os respectivos valore, no caso do atributo $identificador e $bd_selected apenas declaramos;
	private $host  = "127.0.0.1"; 
	private $user  = "root"; 
	private $pass  = "";
	private $banco = "bd_catalog_produtos";
	
	//-----------------------------------------------------------------------
	//construtor: Conecta com o banco;
	private $connection;

		function __construct(){
			$this->open_connection();
		}
		public function open_connection(){
			$this->connection = mysql_connect($this->host,$this->user,$this->pass);
			if(!$this->connection){
				die("Falha de conexão com a base de dados: ". mysql_error());
			}
			else {
				$db_select =  mysql_select_db($this->banco,$this->connection);
				if(!$db_select){
					die("Falha de conexão com a base de dados: ". mysql_error());
				}
			}
		}

		public function close_connection(){
			if(isset($this->connection)){
				mysql_close($this->connection);
				unset($this->connection);
			}
		}
		public function query($sql){
			$result = mysql_query($sql,$this->connection);
			$this->confirm_query($result);
			return $result;
		}
		public function fetch_array($result_set){
			return mysql_fetch_array($result_set);
		}
		public function num_rows($result){
			return mysql_num_rows($result);
		}
		public function affected_rows(){
			return mysql_affected_rows($this->connection);
		}
		private function confirm_query($result){
			if(!$result){
				die("Consulta requerida inválida ou falha durante processamento: ". mysql_error());
			}
		}      
}
//Fim classe


?>
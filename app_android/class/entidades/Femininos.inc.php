<?php 
/*
	Autor: Marcélio de Oliveira
*/
//Classe Categorias;
require("class/sec/bd_.php");

class Femininos{
		private $banco;
		//a variavel $banco e depois executa o metodo conectar() da classe Banco;
		public function Femininos(){
			$this->banco = new Banco;
			//$this->banco->conectar();
		}
		//Fim construtor
		
		public function getProdutosFem($id){
		    $array = array('0'=>'Nenhum resultado encontrado!');
			$id = mysql_escape_string($id);
			$sql = ("select * from produtos where sexo=$id");
			$consulta = mysql_query($sql);
			//apenas outra forma de chamar o metodo;
			$count = 1;
			while($coluna = mysql_fetch_array($consulta)){
				$array[$count] = array('cd'=>$coluna['cd_produto'], 
							   'nome' => $coluna['nm_produto'],
							   'descricao' =>$coluna['ds_produto'],
							   'sexo' =>$coluna['sexo'],
							   'valor' =>$coluna['vl_produto']);
				$count=$count+1;
			}
			return $array;
		}		
	}	
?>
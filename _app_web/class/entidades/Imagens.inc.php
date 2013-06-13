<?php 
/*
	Autor: Marcélio de Oliveira
*/
//Classe Categorias;
require("class/sec/bd_.php");

class Imagem{
		private $banco;
		//a variavel $banco e depois executa o metodo conectar() da classe Banco;
		public function Imagem(){
			$this->banco = new Banco;
			//$this->banco->conectar();
		}
		//Fim construtor
		public function getImagem($id){
			$id = mysql_escape_string($id);
			$sql=$this->banco->queryi("select imagem, tipo from produtos inner join imagens on(imagens.Produtos_cd_produto = produtos.cd_produto) where produtos.cd_produto=1");
			$row = mysqli_fetch_array($sql, MYSQLI_ASSOC);    
		    $tipo   = $row["tipo"];                        
		    $bytes  = $row["imagem"];                        
		    header("Content-type: ".$tipo."");             
		    return $bytes;                                   

		}
}
?>
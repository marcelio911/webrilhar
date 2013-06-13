<?php 
/*
	Autor: Marcélio de Oliveira
*/
//Classe Categorias;
function __autoload($class_name){
	require_once ("../class/sec/bd_.php");
}

class Produtos{
		private $banco;
		//a variavel $banco e depois executa o metodo conectar() da classe Banco;
		public function Produtos(){
			$this->banco = new Banco;
			//$this->banco->conectar();
		}
		//Fim construtor
		
		public function getProdutos($id){
		    $array = array('0'=>'Nenhum resultado encontrado!');
			$id = mysql_escape_string($id);
			$sql = ("select * from produtos inner join categoria on(categoria.cd_categoria = produtos.Categoria_cd_categoria) inner join imagens on (produtos.cd_produto = imagens.Produtos_cd_produto) where categoria.cd_categoria=$id");
			$consulta = $this->banco->query($sql);
			//apenas outra forma de chamar o metodo;
			$count = 1;
			while($coluna = mysql_fetch_array($consulta)){
				$array[$count] = array('codigo'=>$coluna['cd_produto'], 
							   'nome_produto' => $coluna['nm_produto'],
							   'descricao_produto' =>$coluna['ds_produto'],
							   'imagem_binario' =>$coluna['imagem'],
							   'formato_imagem' =>$coluna['tipo'],
							   'promocao' =>$coluna['promocao'],
							   'lancamento' =>$coluna['lancamento'],
							   'valor' =>$coluna['vl_produto']);
				$count=$count+1;
			}
			return $array;
		}
		public function query($sql){
			$result = mysql_query($sql,$this->banco->connection);
			$this->banco->confirm_query($result);
			return $result;
		}
		//Gerar imagens de acordo com o id da Imagem
		public function queryiGerar($id){
			$result = mysqli_query($this->banco->conn,"SELECT tipo,imagem,thumb FROM imagens WHERE cd_imagem = ".$id."");
			$this->banco->confirm_query($result);
			return $result;
		}
			
		public function queryiThumb($id){
			$result = mysqli_query($this->banco->conn,"SELECT tipo,thumb FROM imagens WHERE cd_imagem = ".$id."");
			$this->banco->confirm_query($result);
			return $result;
		}
		//Categoriza pelo ID do PRODUTO
		public function queryiProdutosImagens($id){
			$result = mysqli_query($this->banco->conn,"select cd_imagem, imagem, tipo, thumb, nm_produto, ds_produto from produtos inner join imagens on(imagens.Produtos_cd_produto = produtos.cd_produto) WHERE produtos.cd_produto = ".$id."");
			$this->banco->confirm_query($result);
			return $result;
		}
		public function queryiProdutos($id){
			$result = mysqli_query($this->banco->conn,"select cd_produto, nm_produto, ds_produto from produtos WHERE produtos.cd_produto = ".$id."");
			$this->banco->confirm_query($result);
			return $result;
		}
		//Categoriza pelo ID do Categoria
		public function queryiCategoria($id){
			$result = mysqli_query($this->banco->conn,"select cd_imagem, imagem, tipo, thumb, nm_produto,ds_produto, cd_produto from produtos inner join imagens on(imagens.Produtos_cd_produto = produtos.cd_produto) WHERE produtos.Categoria_cd_categoria = ".$id."");
			$this->banco->confirm_query($result);
			return $result;
		}
		//Pega todos os produtos
		public function queryiImagens(){
			$result = mysqli_query($this->banco->conn,"select cd_imagem, imagem, tipo, thumb, nm_produto, ds_produto, cd_produto from produtos inner join imagens on(imagens.Produtos_cd_produto = produtos.cd_produto)");
			$this->banco->confirm_query($result);
			return $result;
		}
		public function queryiFemininos(){
			$result = mysqli_query($this->banco->conn,"select cd_imagem, imagem, tipo, thumb, nm_produto, ds_produto, cd_produto from produtos inner join imagens on(imagens.Produtos_cd_produto = produtos.cd_produto) where produtos.sexo=0");
			$this->banco->confirm_query($result);
			return $result;
		}
		public function queryiMasculinos(){
			$result = mysqli_query($this->banco->conn,"select cd_imagem, imagem, tipo, thumb, nm_produto, ds_produto, cd_produto from produtos inner join imagens on(imagens.Produtos_cd_produto = produtos.cd_produto) where produtos.sexo=1");
			$this->banco->confirm_query($result);
			return $result;
		}
		
			
	}	
?>
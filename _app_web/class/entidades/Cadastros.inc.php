
<?php 
/*
 Autor: Marcélio de OLiveira
 e-mail: marcelio911@gmail.com
*/

//Classe Escrita;
require("class/sec/bd_.php");
class Cadastros{
	//-----------------------------------------------------------------------
	//Aqui dizemos que esse atributo é private( só pode ser visto dentro da classe );
	private $banco;
	//-----------------------------------------------------------------------
	//Metodo para instanciar o objeto banco e passar a referencia do mesmo para
	//a variavel $banco e depois executa o metodo conectar() da classe Banco;
	public function cadastros(){
		$this->banco = new Banco;// aqui instanciamos e passamos a referencia;
		//$this->banco->conectar();//aqui executamos o metodo conectar da classe Banco;
	}
	//Fim metodo construtor;

	//Metodo para inserir uma nova noticia ao banco de dados na tabela
	//Cliente
	public function cadastrarCliente($nome , $endereco ,$telefone , $datadenascimento,$email, $dia, $mes){
		$nome = mysql_escape_string($nome);
		$endereco = mysql_escape_string($endereco);
		$telefone = mysql_escape_string($telefone);
		$datadenascimento = mysql_escape_string($datadenascimento);
		$email = mysql_escape_string($email);
		$dia = mysql_escape_string($dia);
		$mes = mysql_escape_string($mes);
		
		$teste_sql = "SELECT email,cd_cliente FROM cliente WHERE email='$email'";
		$query = $this->banco->query($teste_sql);
		$row = mysql_fetch_array($query, MYSQL_NUM);
		$consulta_email = "";
		while ($coluna = mysql_fetch_array($query)){
			$consulta_email = $coluna['email'];
		}
		
		if ($row != NULL){
			return false;
		}else if ($email != $consulta_email){					
				$sql = "INSERT INTO cliente(nm_cliente,endereco,aniversario,telefone,email) VALUES('$nome' ,'$endereco','$dia".'/'."$mes', '$telefone' ,'$email')";
				//$query = $this->query($sql);
				$this->banco->query($sql);
			return true;
		}
	}
	//fim do método cadastrar Cliente
	//-----------------------------------------------------------------------
	//Metodo para inserir um novo usuario ao banco de dados na tabela
	//usuario;
	public function cadastrarUsuario($login, $pass, $codigo){
		$login = mysql_escape_string($login);
		$pass = mysql_escape_string(md5($pass));
		
					
		$teste_sql = "SELECT cd_cliente FROM cliente WHERE cd_cliente ='$codigo' ORDER BY cd_cliente DESC LIMIT 1";
		$query = mysql_query($teste_sql);
		$consulta_cd = 0;
		while ($coluna = mysql_fetch_array($query)){
			$consulta_cd = $coluna['cd_cliente'];
		}
		$row = mysql_fetch_array($query, MYSQL_NUM);
		mysql_free_result($query);
		if ($row != NULL){
			return false;
		}else{	
			$sql = "INSERT INTO login(usuario, senha, Cliente_cd_cliente) VALUES('$login','$pass','$consulta_cd')";
			//$query = $this->query($sql);
			$this->banco->query($sql);
			if (mysql_affected_rows() == 1) {
				return true;
			}
			
		}
	}	
	//Fim metodo cadastrar();
	
	public function adicionaNoCarrinho($cliente,$getProduto, $tpfrete, $fretdestino, $quantid, $numdeparcelas,$presente,$cont){
		$cliente = mysql_escape_string($cliente);
		$getProduto = mysql_escape_string($getProduto);
		$tpfrete = mysql_escape_string($tpfrete);
		$fretdestino = mysql_escape_string($fretdestino);
		$quantid = mysql_escape_string($quantid);
		$numdeparcelas = mysql_escape_string($numdeparcelas);
		$presente = mysql_escape_string($presente);
		$cont = mysql_escape_string($cont);
		
		$sql = "INSERT INTO carrinho_compras(Cliente_cd_cliente, Produtos_cd_produto) VALUES ('$cliente','$getProduto')";
		$this->banco->query($sql);
		
		if(mysql_affected_rows() == 1){
			return true;
		}else{
			return false;
		}
	}
	//Fim metodo adicionar ao carrinho();
	
	//Fim metodo adcionarnocarrinho();
	
	public function removeDoCarrinho($cddocarrinho){
		$cddocarrinho = mysql_escape_string($cddocarrinho);
		
		$sql = "DELETE FROM `carrinho_compras` WHERE cd_carrinho = '$cddocarrinho'";
		$this->banco->query($sql);
		
		if(mysql_affected_rows() == 1){
			return true;
		}else{
			return false;
		}
	}
	public function limparCarrinho($cliente){
		$cliente = mysql_escape_string($cliente);
		
		$sql = "DELETE FROM carrinho_compras WHERE Cliente_cd_cliente = '$cliente'";
		$this->banco->query($sql);
		
		if(mysql_affected_rows() == 1){
			return true;
		}else{
			return false;
		}
	}
	//Fim metodo NoCarrinho();
	//Cliente
	public function faleConosco($nome , $mensagem , $telefone ,$email){
		$nome = mysql_escape_string($nome);
		$mensagem = mysql_escape_string($mensagem);
	
		$telefone = mysql_escape_string($telefone);
		$datadenascimento = mysql_escape_string($datadenascimento);
		$email = mysql_escape_string($email);

		if ($row != NULL){
			return false;
		}else {
			
				//envia e-mail para o usuário cadastrado
				$to = "comercial@brilharfolheados.com.br";
				$subject = "Fale Conosco";
				$html = "
				<html>
				<head></head>
				<body>
				<p>Olá! Me meu nome é:: ".$nome." estou entrando em contato através do fale conosco do site BellasArtes:
				Telefone:".$telefone."</p><p>
                E-mail para entrar em contato:".$email."</p><p>
				Mensagem do cliente: ".$mensagem."</p><p>
				
				Este e-mail acabou de ser gerado favor respondê-lo o mais receber o seu e-mail.
				 
				Muito Obrigado!
				comercial@brilharfolheados.com.br</p></body></html>";
				
				$from = $email;
				
				// Always set content-type when sending HTML email
				//$headers = "MIME-Version: 1.0" . "\r\n";
				//$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
				$headers = 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/plain; charset=UTF-8' . "\r\n";
				$headers = "From" . $from;
							
				// Instancia a classe mail_mime 
				if(mail($to,$subject,$html,$headers)){
					return true;
				}else{
					return false;
				}
				
		}
	}
	//fim do método cadastrar Falenosco
	public function pedido($cd , $mensagem, $qtd, $telefone ,$email){
		$cd = mysql_escape_string($cd);
		$mensagem = mysql_escape_string($mensagem);
	    $qtd = mysql_escape_string($qtd);
		$telefone = mysql_escape_string($telefone);
		$datadenascimento = mysql_escape_string($datadenascimento);
		$email = mysql_escape_string($email);

		if ($row != NULL){
			return false;
		}else {
			
				//envia e-mail para o usuário cadastrado
				$to = "comercial@brilharfolheados.com.br";
				$subject = "Fale Conosco";
				$html = "
				<p>Olá! tenho interesse no produto com este código: ".$cd." e se possível enviar ".$qtd." itens,
				Telefone:".$telefone."</p><p>
                E-mail para entrar em contato:".$email."</p><p>
				Mensagem do cliente: ".$mensagem."</p><p>
				estou entrando em contato e quero uma resposta de quanto tempo recebo em casa este produto
								
				Está é uma mensagem gerada pelo formulário de pedido para fabricação de um novo produto, favor responder este cliente o mais rápido ao receber este e-mail.
				
				Muito Obrigado!
				".$email."
				";
				
				$from = $email;
				
				// Always set content-type when sending HTML email
				//$headers = "MIME-Version: 1.0" . "\r\n";
				//$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
				$headers = 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/plain; charset=UTF-8' . "\r\n";
				$headers = "From" . $from;
							
				// Instancia a classe mail_mime 
				if(mail($to,$subject,$html,$headers)){
					return true;
				}else{
					return false;
				}
				
		}
	}
	//fim do método cadastrar Cliente
	//-----------------------------------------------------------------------
	//Metodo Destrutor para chamar o metodo da classe banco desconectar() para 
	//interromper a conexao com o banco e desalocar os atributos instanciados  
	//na classe;
    public function __destruct(){
    	$this->banco->close_connection(); // destroi referencia
    }
	//Fim Metodo
	//-----------------------------------------------------------------------
}
//Fim classe
?>
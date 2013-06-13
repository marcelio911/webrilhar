
<?php 
/*
 Autor: Marcélio de OLiveira
 e-mail: marcelio911@gmail.com
*/

//Classe Escrita;
require("../class/sec/bd_.php");
class Contatos{
	//-----------------------------------------------------------------------
	//Aqui dizemos que esse atributo é private( só pode ser visto dentro da classe );
	private $banco;
	//-----------------------------------------------------------------------
	//Metodo para instanciar o objeto banco e passar a referencia do mesmo para
	//a variavel $banco e depois executa o metodo conectar() da classe Banco;
	public function contatos(){
		$this->banco = new Banco;// aqui instanciamos e passamos a referencia;
		//$this->banco->conectar();//aqui executamos o metodo conectar da classe Banco;
	}
	
	//Fale Conosco
	public function faleConosco($nome , $mensagem , $telefone ,$email){
		$nome = mysql_escape_string($nome);
		$mensagem = mysql_escape_string($mensagem);	
		$telefone = mysql_escape_string($telefone);
		$email = mysql_escape_string($email);

		
			
				//envia e-mail para o usuário cadastrado
				$to = "vendabrilhar@gmail.com";
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
				vendabrilhar@gmail.com</p></body></html>";
				
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
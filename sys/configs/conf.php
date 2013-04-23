<?php
require_once('dbinfo.php');
// Opens a connection to a mySQL server
$connection=mysql_connect ($url, $username, $password);
if (!$connection) {
  die("Sem conexao com o banco de dados : " . mysql_error());
}
//print('Conexão efetuada com sucesso!');
//echo'<p></p>';


// Set the active mySQL database
$db_selected = mysql_select_db($database, $connection);
if (!$db_selected) {
  die("Sem acesso a tabela ou base de dados : " . mysql_error());
}
//echo "Acesso a base de dados: '$database'";

?>

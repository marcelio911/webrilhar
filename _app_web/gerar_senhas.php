<?php
$pass=""; 
if (isset($_GET['pass'])){
	$pass = $_GET['pass'];
}
echo '<form action=""><input name="pass"><input type="submit" value="ok"/></form>';
echo md5($pass);
?>
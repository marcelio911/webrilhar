<?php
function getStockQuote($symbol) { 
   mysql_connect('127.0.0.1','root'); 
   mysql_select_db('bd_catalog_produtos'); 
   $query = "SELECT * FROM categoria WHERE cd_categoria = '$symbol' "; 
   $result = mysql_query($query); 
   $row = mysql_fetch_assoc($result); 
   return $row['nm_categoria'];
}
?>

<?php
$id = $_GET["id"]; 
require_once ("../class/entidades/Produtos.inc.php");
$produtos = new Produtos();
$sql = $produtos->queryiThumb($id);         
$row = mysqli_fetch_array($sql, MYSQLI_ASSOC);    
   $tipo   = $row["tipo"];                        
   $thumb  = $row["thumb"];                        
   header("Content-type: '$tipo'");             
   echo $thumb;                                   
?>
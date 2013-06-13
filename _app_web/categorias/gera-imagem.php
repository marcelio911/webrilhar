<?php
$id = $_GET["id"];
require_once("../class/entidades/Produtos.inc.php");
$produtos = new Produtos();
$sql = $produtos->queryiGerar($id);         
$row = mysqli_fetch_array($sql, MYSQLI_ASSOC);    
   $tipo   = $row["tipo"];                        
   $bytes  = $row["imagem"];                        
   header("Content-type: '$tipo'");           
   echo $bytes;                                   
?>
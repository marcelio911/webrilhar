<?php
$id = $_GET["id"]; 
require("../class/sec/bd_.php");
$banco = new Banco; 
$sql = $banco->queryiGerar($id);         
$row = mysqli_fetch_array($sql, MYSQLI_ASSOC);    
   $tipo   = $row["tipo"];                        
   $bytes  = $row["imagem"];                        
   header("Content-type: image/png");             
   echo $bytes;                                   
?>
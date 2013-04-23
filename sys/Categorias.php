<?php
require_once('configs/conf.php');

class Categorias {
// function
	public function balance_enq($ac_no)	{
		$sql = "SELECT * FROM categoria WHERE cd_categoria='".$ac_no."'";
		$result=mysql_query($sql);
			while($coluna = mysql_fetch_array($result)){
				$items[] = array('cd'=>$coluna['cd_categoria'],
								'nome'=>$coluna['nm_categoria']
				);
			}
		return $items;
	}
	function runQuery($sqlString)
	{
		$sql=mysql_query($sqlString) or die(mysql_error());
		$rows=mysql_fetch_assoc($sql);
		return $rows;
	}
// create HTTP listener
}

?>
<?php
include('contador.php');
   if (isset($_COOKIE['counte'])) {
      $counte = $_COOKIE['counte'] + 1;
  } else {
    $counte = 1;
    $a++;
}
setcookie('counte', "$counte", time()+3700);
$abre =@fopen("contador.php","w");
$ss ='<?php $a='.$a.'; ?>';
$escreve =fwrite($abre, $ss);

 //$a Pessoas vizitaram esse site voce ja vitou $counte vezes
?>  


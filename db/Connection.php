<?php 

if (isset($_SERVER['HTTP_REFERER'])){        
    $con = new mysqli("localhost","id5179091_root","rootroot","id5179091_articles");
    
    if(mysqli_connect_error()){
        echo mysqli_connect_error();
        exit;
    }
    
    
}else{
    echo "Stop doing that!";
}
function _e($elements){
   $cleaned = array();
        foreach ($elements as $rs) {            
                $cleaned[] = array_map("htmlspecialchars", $rs);            
        }    
  return $cleaned;  
}


?>
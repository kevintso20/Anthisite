<?php

if (isset($_SERVER['HTTP_REFERER'])){ 
    header('Content-Type: application/json');    
    include "../../db/Connection.php"; 
   
    $sql="select * from galery";
    $stmt = $con->prepare($sql);
    
    $stmt->execute();
    if($stmt->bind_result($id, $url, $description)){
         $urls = array();
         while($stmt->fetch()){
            $url = array(
                "id"              => $id,
                "url"             => $url,
                "description"     => $description
            );
          $urls[] = $url;
         }
        $cleaned = _e($urls);
        echo json_encode($cleaned , JSON_UNESCAPED_SLASHES);
    }else{
        echo "stop changing things";
    }
    $stmt->close();
    $con->close();     
}else{
        echo "Stop doing that!";
}


        
?>





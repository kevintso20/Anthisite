<?php

if (isset($_SERVER['HTTP_REFERER'])){
    include "../../db/Connection.php";

    $url = $_POST['url'];
    $description = $_POST['description'];    
    
    $sql = "insert into galery  (url,description) values (?,?)";
    $stmt = $con->prepare($sql);
    
    if($stmt->bind_param("ss",$url , $description)){
        $stmt->execute();
    }else{
        echo "stop adding things...";
    }
    $stmt->close();
    $con->close();
}else{
    echo "Stop doing that!";
}

?>

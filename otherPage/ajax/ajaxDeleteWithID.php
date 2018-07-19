<?php

if (isset($_SERVER['HTTP_REFERER'])){    
    include "../../db/Connection.php";
    
    $id = (int)$_POST['id'];    
    $sql = "DELETE from articles WHERE id=?";
    $stmt = $con->prepare($sql);
    
    if($stmt->bind_param("i", $id)){
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

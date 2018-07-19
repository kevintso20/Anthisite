<?php

if (isset($_SERVER['HTTP_REFERER'])){     
    include "../../db/Connection.php";
    
    $id = (int)$_POST['id'];    
    $sql = "DELETE from galery WHERE id=?";
    $stmt = $con->prepare($sql);
    
    if($stmt->bind_param("i", $id)){
        $stmt->execute();
    }
    $stmt->close();
    $con->close();
}else{
        echo "Stop doing that!";
}
?>

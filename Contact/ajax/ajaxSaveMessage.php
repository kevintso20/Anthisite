<?php

if (isset($_SERVER['HTTP_REFERER'])){     
    header('Content-Type: application/json');    
    include "../../db/Connection.php";

    $name    = $_POST['name'];
    $email   = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    $date    = $_POST['date'];
    
    $sql = "insert into mails  (name,email,subject,message,date) values ( ?, ?, ?, ?, ?)";
    $stmt = $con->prepare($sql);
    
    if($stmt->bind_param("sssss", $name, $email, $subject, $message, $date)){
        $stmt->execute();
    }else{
        echo "stop changing things";
    }  
    $stmt->close();
    $con->close();
}else{
    echo "Stop doing that!";
}
  





?>

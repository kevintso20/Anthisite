<?php

if (isset($_SERVER['HTTP_REFERER'])){    
    header('Content-Type: application/json');    
    include "../../db/Connection.php";
    
    $sql = "select name,email,subject,message,date from mails";
    $stmt = $con->prepare($sql);
    $stmt->execute();
    
    if($stmt->bind_result($name, $email, $subject, $message, $date)){
        $mails = array();
        while ($stmt->fetch()) {
            $mail = array(
                "name"       => $name,
                "email"      => $email,
                "subject"    => $subject,
                "message"    => $message,
                "date"       => $date
            );
            $mails[] = $mail;
        }
        $cleaned = _e($mails);
        echo json_encode($cleaned , JSON_UNESCAPED_SLASHES);
    }else{
        echo "stop adding things...";
    }
    $stmt->close();
    $con->close();
}else{
        echo "Stop doing that!";
}
?>
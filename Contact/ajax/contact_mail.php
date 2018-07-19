<?php
if (isset($_SERVER['HTTP_REFERER'])){
    
    $name    = $_POST['name'];
    $email   = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $to       = 'aparemfato@gmail.com';
    $headers  = "From:".$email."\r\n";
    $headers .= "Reply-To: aparemfato@gmail.com\r\n";
    $headers .= "Return-Path: myplace@example.com\r\n";
    $headers .= "CC: Hello@gmail.com\r\n";
    $headers .= "BCC: hidden@example.com\r\n";
    
    $mail = mail($to, $subject, $message, $headers);

    if($mail){
      echo "Thank you for contacting us!";
    }else{
      echo "Mail sending failed."; 
    }
}else{
        echo "Stop doing that!";
}
  

?>

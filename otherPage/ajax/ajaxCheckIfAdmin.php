<?php
    
if (isset($_SERVER['HTTP_REFERER'])){ 
    header('Content-Type: application/json');    
    include "../../db/Connection.php";
   
    $userName = $_POST['var1'];
    $userPassword = $_POST['var2'];

    $sql = "select * from users WHERE username =?";
    $stmt = $con->prepare($sql);

    if($stmt->bind_param("s",$userName)){
        $stmt->execute();
        $found = "not exist";
        if($stmt->bind_result($id, $user, $pass)){
            while($stmt->fetch()){
                if($user == $userName && $pass == $userPassword){
                   $found = "exist"; 
                   echo json_encode($found , JSON_UNESCAPED_SLASHES);
                }
            }
        }else{
           echo "bind result Failed!!! stop adding things....";
        }
    }else{
           echo "stop changing things.....";
    }
    $stmt->close();
    $con->close();
}else{
        echo "Stop doing that!";
}
  
?>

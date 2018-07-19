<?php

if (isset($_SERVER['HTTP_REFERER'])){ 
    header('Content-Type: application/json');
    include "../../db/Connection.php";

    $title =$_POST['title'];
    $discription =$_POST['discription'];
    $content =$_POST['content'];
    $img1 =$_POST['img1'];
    $img2 =$_POST['img2'];
    $img3 =$_POST['img3'];
    $img4 =$_POST['img4'];
    $img5 =$_POST['img5'];
    $img6 =$_POST['img6'];
    $img7 =$_POST['img7'];
    $img8 =$_POST['img8'];
    $img9 =$_POST['img9'];
    $img10 =$_POST['img10'];     
    
    $sql = "insert into articles (title,description,content,img1,img2,img3,img4,img5,img6,img7,img8,img9,img10) values (?,?,?,?,?,?,?,?,?,?,?,?,?)";                      
    $stmt = $con->prepare($sql);
    
    if($stmt->bind_param("sssssssssssss", $title, $discription, $content, $img1, $img2, $img3, $img4, $img5, $img6, $img7, $img8, $img9, $img10)){           
       $stmt->execute(); 
    }else{
        echo "stop adding things....";
    }
    $stmt->close();
    $con->close();
}else{
        echo "Stop doing that!";
}
    
?>

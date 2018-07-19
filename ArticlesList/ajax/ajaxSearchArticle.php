<?php

if (isset($_SERVER['HTTP_REFERER'])){ 
    header('Content-Type: application/json');    
    include "../../db/Connection.php";
    error_reporting(0);
   
    $searchInput = "%{$_POST['searchInput']}%";
    $sql = "select *from articles where title like ?";     
    $stmt = $con->prepare($sql);  
    //TODO na valw ean den epistrepsei tpt na kanei search kai sta description
    if($stmt->bind_param("s", $searchInput)){
        $stmt->execute();
        $stmt->store_result();
        
        if($stmt->num_rows > 0){
            getResult($stmt,$con);
        }else if($stmt->num_rows == 0){            
            seachInDescription($stmt, $searchInput, $con);           
        }
    }else{
        echo "stop adding things....";
    }
}else{
    echo "Stop doing that!";
}

function getResult($stmt, $con){
    if($stmt->bind_result($id, $title , $description , $content, $img1, $img2, $img3, $img4, $img5, $img6, $img7, $img8, $img9, $img10)){                  
        while ($stmt->fetch()) {         
          $article = array(
              "id"              => $id,
              "title"           => $title,
              "description"     => $description,
              "content"         => $content,
              "img1"            => $img1,
              "img2"            => $img2,
              "img3"            => $img3,
              "img4"            => $img4,
              "img5"            => $img5,
              "img6"            => $img6,
              "img7"            => $img7,
              "img8"            => $img8,
              "img9"            => $img9,
              "img10"           => $img10
             );
             $articles[] = $article;         
          }            
        $cleaned = _e($articles);
        echo json_encode($cleaned , JSON_UNESCAPED_SLASHES);             
    }else{
      echo "stop changing things.....";
    }
    $stmt->close();
    $con->close(); 
}

function seachInDescription($stmt , $searchInput, $con){
    $stmt->close();
    $sql = "select *from articles where description like ?"; 
    $newStmt = $con->prepare($sql); 
    
    if($newStmt->bind_param("s", $searchInput)){
        $newStmt->execute();
        getResult($newStmt , $con);     
    }else{
        echo "stop adding things....";
    }
}
?>

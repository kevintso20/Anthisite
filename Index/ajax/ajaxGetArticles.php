<?php

if (isset($_SERVER['HTTP_REFERER'])){     
    header('Content-Type: application/json');    
    include "../../db/Connection.php";
   
    $sql = "select * from articles ORDER BY RAND() LIMIT 4";
    $stmt = $con->prepare($sql);
    $stmt->execute();
    
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
             echo "bind result Failed!!! stop adding things....";
       } 
    $stmt->close();
    $con->close();
}else{
        echo "Stop doing that!";
}
?>
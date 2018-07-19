<?php

if (isset($_SERVER['HTTP_REFERER'])){     
    header('Content-Type: application/json');    
    include "../../db/Connection.php";

    $sql = "select id,title,description,content from articles";
    $stmt = $con->prepare($sql);
    $stmt->execute();
    
    if($stmt->bind_result($id, $title, $description, $content)){
        $articles = array();
        while ($stmt->fetch()) {
            $article = array(
                "id"              => $id,
                "title"           => $title,
                "description"     => $description,
                "content"         => $content
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
}else{
        echo "Stop doing that!";
}
?>

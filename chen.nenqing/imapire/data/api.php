<?php

function makeConn() {
   include "auth.php";
   try {
      $conn = new PDO(...Auth());
      $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      return $conn;
   } catch(PDOException $e) {
      die('{"error":"'.$e->getMessage().'"}');
   }
}


/* $r = PDO result */
function fetchAll($r) {
   $a = [];
   while($row = $r->fetch(\PDO::FETCH_OBJ)) $a[] = $row;
   return $a;
}

/*
$c = connection
$ps = prepared statement
$p = parameters
*/
function makeQuery($c,$ps,$p,$makeResults=true) {
   try {
      if(count($p)) {
         $stmt = $c->prepare($ps);
         $stmt->execute($p);
      } else {
         $stmt = $c->query($ps);
      }

      $r = $makeResults ? fetchAll($stmt) : [];

      return [
         // "statement"=>$ps,
         // "params"=>$p,
         "result"=>$r
      ];
   } catch(PDOException $e) {
      return ["error"=>"Query Failed: ".$e->getMessage()];
   }
}

function makeUpload($file,$folder) {
   $filename = microtime(true) . "_" . $_FILES[$file]['name'];

   if(@move_uploaded_file(
      $_FILES[$file]['tmp_name'],
      $folder.$filename
   )) return ['result'=>$filename];
   else return [
      "error"=>"File Upload Failed",
      "_FILES"=>$_FILES,
      "filename"=>$filename
   ];
}


function makeStatement($data) {
   try{
      $c = makeConn();
      $t = $data->type;
      $p = $data->params;

      switch($t) {
         case "insert_user":
            $r = makeQuery($c,"SELECT id FROM `Users` WHERE `username`=? OR `email` = ?",[$p[0],$p[1]]);
            if(count($r['result'])) return ["error"=>"Username or Email already exists"];

            $r = makeQuery($c,"INSERT INTO
               `Users`
               (`username`, `email`, `password`, `image`, `date`)
               VALUES
               (?, ?, md5(?), 'http://via.placeholder.com/400/?text=USER', NOW())
               ",$p,false);
            return ["id" => $c->lastInsertId()];   
         case "update_user":
            return makeQuery($c,"UPDATE `Users` SET `username`=?, `email`=? WHERE `id`=?",$p);
         case "update_user_password":
            return makeQuery($c,"UPDATE `Users` SET `password`=md5(?) WHERE `id`=?",$p);
         case "update_user_image":
            return makeQuery($c,"UPDATE `Users` SET `image`=? WHERE `id`=?",$p);
         case "update_inspiration_image":
            return makeQuery($c,"UPDATE `Inspirations` SET `image`=? WHERE `id`=?",$p);
         case "user_by_id":
            return makeQuery($c,"SELECT * FROM `Users` WHERE `id`=?",$p);
         case "users_all":
            return makeQuery($c,"SELECT * FROM `Users` WHERE `id`=?",$p);
         case "update_username":
            return makeQuery($c,"UPDATE `Users` SET `username`=? WHERE `id`=?",$p);
         case "inspiration_by_id":
            return makeQuery($c,"SELECT I.name, I.image, I.date, I.note, I.favorite, P.name as project FROM `Inspirations` I, `Projects` P WHERE I.project = P.id AND I.id=?",$p);
         case "location_by_inspiration_id":
            return makeQuery($c,"SELECT image, lat, lng FROM `Inspirations` WHERE `id`=?",$p);
         case "inspirations_by_user_id":
            return makeQuery($c,"SELECT I.id, I.image, I.name, I.date, I.note, I.lat, I.lng, I.favorite, P.name as project FROM `Inspirations` I, `Projects` P WHERE I.project = P.id AND I.user=?",$p);
         case "favorite_inspirations_by_user_id":
            return makeQuery($c,"SELECT I.id, I.image, I.name, I.date, I.note, I.lat, I.lng, I.favorite, P.name as project FROM `Inspirations` I, `Projects` P WHERE I.project = P.id AND I.user=? AND I.favorite='favorite'",$p);
         case "projects_by_user_id":
            return makeQuery($c,"SELECT * FROM `Projects` WHERE `user`=?",$p);
         case "insert_project":
            return makeQuery($c,"INSERT INTO `Projects` (`user`, `name`,`description`, `date`)
               VALUES
               (?, ?, ?, NOW())
               ",$p);
            $r['id'] = $c->lastInsertId();
            return $r;
         case "insert_location":
            $r = makeQuery($c,"INSERT INTO
               `Inspirations`
               (`user`, `project`, `name`, `lat`, `lng`, `note`, `image`, `date`)
               VALUES
               (?, ?, ?, ?, ?, ?, 'http://via.placeholder.com/400/?text=PHOTO', NOW())
               ",$p,false);
            $r['id'] = $c->lastInsertId();
            return $r;
         case "check_signin":
            return makeQuery($c,"SELECT id FROM `Users` WHERE `username`=? AND `password`=md5(?)",$p);
         case "recent_inspiration_locations":
            return makeQuery($c,"SELECT *
            FROM `Inspirations` WHERE user=?",$p);
         case "search_inspirations":
            $p = ["%$p[0]%",$p[1]];
            return makeQuery($c,"SELECT I.id, I.image, I.name, I.date, I.note, I.lat, I.lng, I.favorite, P.name as project 
               FROM `Inspirations` I, `Projects` P
               WHERE
                  P.id = I.project AND
                  I.name LIKE ? AND
                  I.user = ?
               ",$p);

         case "filter_inspirations":
            return makeQuery($c,"SELECT I.id, I.image, I.name, I.date, I.note, I.lat, I.lng, I.favorite, P.name as project 
               FROM `Inspirations` I, `Projects` P
               WHERE 
                  P.id = I.project AND
                  P.name = ? AND
                  I.user = ?
               ", $p);
         case "add_favorite":
            return makeQuery($c,"UPDATE `Inspirations`
               SET favorite='favorite'
               WHERE id = ?
               ", $p);
         case "remove_favorite":
            return makeQuery($c,"UPDATE `Inspirations`
               SET favorite=''
               WHERE id = ?
               ", $p);
         case "update_inspiration":
            return makeQuery($c,"UPDATE `Inspirations`
               SET name=?, note=?
               WHERE id=?
               ", $p);
         case "delete_inspiration":
            return makeQuery($c,"DELETE FROM `Inspirations`
               WHERE id=?
               ", $p);



         default: return ["error"=>"No Matched Type"];
      }
   } catch(Exception $e) {
      return ["error"=>"Bad Data"];
   }
}

if(!empty($_FILES)) {
   $r = makeUpload("image","../images/");
   die(json_encode($r));
}

$data = json_decode(file_get_contents("php://input"));

die(
   json_encode(
      makeStatement($data),
      JSON_NUMERIC_CHECK
   )
);
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
               (`username`, `email`, `password`, `img`, `date`)
               VALUES
               (?, ?, md5(?), 'http://via.placeholder.com/400/?text=USER', NOW())
               ",$p,false);
            return ["id" => $c->lastInsertId()];   
         case "users_all":
            return makeQuery($c,"SELECT * FROM `track_202190_users`",$p);
         case "inspirations_by_user_id":
            return makeQuery($c,"SELECT * FROM `Inspirations` WHERE `user`=?",$p);
         case "check_signin":
            return makeQuery($c,"SELECT id FROM `Users` WHERE `username`=? AND `password`=md5(?)",$p);
         case "recent_inspiration_locations":
         return makeQuery($c,"SELECT *
            FROM `Inspirations` a
            JOIN (
               SELECT lg.*
               FROM `Locations` lg
               WHERE lg.id = (
                  SELECT lt.id
                  FROM `Locations` lt
                  WHERE lt.inspiration_id = lg.inspiration_id
                  ORDER BY lt.date_created DESC
                  LIMIT 1
               )
            ) l
            ON a.id = l.inspiration_id
            WHERE a.user = ?
            ORDER BY l.inspiration_id, l.date_created DESC
            ",$p);



         default: return ["error"=>"No Matched Type"];
      }
   } catch(Exception $e) {
      return ["error"=>"Bad Data"];
   }
}


$data = json_decode(file_get_contents("php://input"));

die(
   json_encode(
      makeStatement($data),
      JSON_NUMERIC_CHECK
   )
);
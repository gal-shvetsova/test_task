<?php
	function getHandler($data_base){
        $stmt =$data_base->query("SELECT USERS.LAST_NAME, GROUP_CONCAT(TASKS.ID) AS TASKS
        FROM USERS 
        INNER JOIN TASKS
        ON USERS.ID = TASKS.USER_ID GROUP BY USERS.LAST_NAME");
        $arr = $stmt->fetchAll();
        echo json_encode($arr);
	}
?>

